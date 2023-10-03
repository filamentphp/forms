---
title: Advanced forms
---

## Overview

Filament forms are designed to be flexible and customizable. Many existing form builders allow users to define a form schema, but don't provide a great interface for defining inter-field interactions, or custom logic. Since all Filament forms are built on top of [Livewire](https://laravel-livewire.com), the form can adapt dynamically to user input, even after it has been initially rendered. Developers can use [parameter injection](#form-component-utility-injection) to access many utilities in real time and build dynamic forms based on user input. The [lifecycle](#field-lifecycle) of fields is open to extension using hook functions to define custom functionality for each field. This allows developers to build complex forms with ease.

## The basics of reactivity

[Livewire](https://laravel-livewire.com) is a tool that allows Blade-rendered HTML to dynamically re-render without requiring a full page reload. Filament forms are built on top of Livewire, so they are able to re-render dynamically, allowing their layout to adapt after they are initially rendered.

By default, when a user uses a field, the form will not re-render. Since rendering requires a round-trip to the server, this is a performance optimization. However, if you wish to re-render the form after a field is interacted with by the user, you can use the `reactive()` method:

```php
use Filament\Forms\Components\Select;

Select::make('status')
    ->options([
        'draft' => 'Draft',
        'reviewing' => 'Reviewing',
        'published' => 'Published',
    ])
    ->reactive()
```

In this example, when the user changes the value of the `status` field, the form will re-render. This allows you to then make changes to fields in the form based on the new value of the `status` field. Also, you can [hook in to the field's lifecycle](#field-updates) to perform custom logic when the field is updated.

### Lazily reactive fields

By default, when a field is set to `reactive()`, the form will re-render every time the field is interacted with. However, this may not be appropriate for some fields like the text input, since making network requests while the user is still typing results in suboptimal performance. You may wish to re-render the form only after the user has finished using the field, often when it becomes out of focus. You can do this using the `lazy()` method *instead* of `reactive()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('username')
    ->lazy()
```

### Debouncing reactive fields

Lazy fields require the user to blur (remove focus) from the field before the form will re-render. This allows you to make network requests only when the user has finished typing. However, you may with to find a middle ground between the two, using "debouncing". Debouncing will still send a network request before the user has finished typing, but those requests will be limited to an interval of your choosing. You can do this using the `debounce()` method:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('username')
    ->debounce(500) // Wait 500ms before re-rendering the form.
```

## Form component utility injection

The vast majority of methods used to configure [fields](fields) and [layout components](layout) accept closures as parameters instead of hardcoded values:

```php
use App\Models\User;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;

DatePicker::make('date_of_birth')
    ->displayFormat(function () {
        if (auth()->user()->country_id === 'us') {
            return 'm/d/Y'
        } else {
            return 'd/m/Y'
        }
    })

Select::make('user_id')
    ->options(function () {
        return User::all()->pluck('name', 'id');
    })

TextInput::make('middle_name')
    ->required(fn (): bool => auth()->user()->hasMiddleName())
```

This alone unlocks many customization possibilities.

The package is also able to inject many utilities to use inside these functions, as parameters. All customization methods that accept functions as arguments can inject utilities.

These injected utilities require specific parameter names to be used. Otherwise, Filament doesn't know what to inject.

### Injecting the current state of a field

If you wish to access the current state (value) of the field, define a `$state` parameter:

```php
function ($state) {
    // ...
}
```

### Injecting the current form component instance

If you wish to access the current component instance, define a `$component` parameter:

```php
use Filament\Forms\Components\Component;

function (Component $component) {
    // ...
}
```

### Injecting the current Livewire component instance

If you wish to access the current Livewire component instance, define a `$livewire` parameter:

```php
use Livewire\Component as Livewire;

function (Livewire $livewire) {
    // ...
}
```

### Injecting the current form record

If your form is associated with an Eloquent model instance, define a `$record` parameter:

```php
use Illuminate\Database\Eloquent\Model;

function (?Model $record) {
    // ...
}
```

### Injecting the state of another field

You may also retrieve the state (value) of another field from within a callback, using a `$get` parameter:

```php
use Filament\Forms\Get;

function (Get $get) {
    $email = $get('email'); // Store the value of the `email` field in the `$email` variable.
    //...
}
```

### Injecting a function to set the state of another field

In a similar way to `$get`, you may also set the value of another field from within a callback, using a `$set` parameter:

```php
use Filament\Forms\Set;

function (Set $set) {
    $set('title', 'Blog Post'); // Set the `title` field to `Blog Post`.
    //...
}
```

When this function is run, the state of the `title` field will be updated, and the form will re-render with the new title. This is useful inside the [`afterStateUpdated`](#field-updates) method.

### Injecting the current form operation

If you're writing a form for a panel resource or relation manager, and you wish to check if a form is `create`, `edit` or `view`, use the `$operation` parameter:

```php
function (string $operation) {
    // ...
}
```

> Outside of the panel, you can set a form's operation by using the `operation()` method on the form definition.

### Injecting multiple utilities

The parameters are injected dynamically using reflection, so you are able to combine multiple parameters in any order:

```php
use Filament\Forms\Get;
use Filament\Forms\Set;
use Livewire\Component as Livewire;

function (Livewire $livewire, Get $get, Set $set) {
    // ...
}
```

### Injecting dependencies from Laravel's container

You may inject anything from Laravel's container like normal, alongside utilities:

```php
use Filament\Forms\Set;
use Illuminate\Http\Request;

function (Request $request, Set $set) {
    // ...
}
```

## Field lifecycle

Each field in a form has a lifecycle, which is the process it goes through when the form is loaded, when it is interacted with by the user, and when it is submitted. You may customize what happens at each stage of this lifecycle using a function that gets run at that stage.

### Field hydration

Hydration is the process which fill fields with data. It runs when you call the form's `fill()` method. You may customize what happens after a field is hydrated using the `afterStateHydrated()` method.

In this example, the `name` field will always be hydrated with the correctly capitalized name:

```php
use Closure;
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->required()
    ->afterStateHydrated(function (TextInput $component, string $state) {
        $component->state(ucwords($state));
    })
```

As a shortcut for formatting the field's state like this when it is hydrated, you can use the `formatStateUsing()` method:

```php
use Closure;
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->formatStateUsing(fn (string $state): string => ucwords($state))
```

### Field updates

You may use the `afterStateUpdated()` method to customize what happens after a field is updated by the user. Please note that only changes from the user on the frontend will trigger this function, not manual changes to the state from `$set()` or another PHP function.

Inside this function, you can also inject the `$old` value of the field before it was updated, using the `$old` parameter:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->afterStateUpdated(function (?string $state, ?string $old) {
        // ...
    })
```

For an example of how to use this method, learn how to [automatically generate a slug from a title](#generating-a-slug-from-a-title).

### Field dehydration

Dehydration is the process which gets data from the fields in your forms, and transforms it. It runs when you call the form's `getState()` method.

You may customize how the state is transformed when it is dehydrated using the `dehydrateStateUsing()` function. In this example, the `name` field will always be dehydrated with the correctly capitalized name:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('name')
    ->required()
    ->dehydrateStateUsing(fn (string $state): string => ucwords($state))
```

#### Preventing a field from being dehydrated

You may also prevent a field from being dehydrated altogether using `dehydrated(false)`. In this example, the field will not be present in the array returned from `getState()`:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('password_confirmation')
    ->password()
    ->dehydrated(false)
```

If your form auto-saves data to the database, like in a [resource](../panels/resources) or [table action](../tables/actions), this is useful to prevent a field from being saved to the database if it is purely used for presentational purposes.

## Reactive forms cookbook

This section contains a collection of recipes for common tasks you may need to perform when building an advanced form.

### Conditionally hiding a field

To conditionally hide or show a field, you can pass a function to the `hidden()` method, and return `true` or `false` depending on whether you want the field to be hidden or not. The function can [inject utilities](#form-component-utility-injection) as parameters, so you can do things like check the value of another field:

```php
use Filament\Forms\Get;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\TextInput;

Checkbox::make('is_company')
    ->reactive()

TextInput::make('company_name')
    ->hidden(fn (Get $get): bool => ! $get('is_company'))
```

In this example, the `is_company` checkbox is [`reactive()`](#the-basics-of-reactivity). This allows the form to rerender when the value of the `is_company` field changes. You can access the value of that field from within the `hidden()` function using the [`$get()` utility](#injecting-the-current-state-of-a-field). The value of the field is inverted using `!` so that the `company_name` field is hidden when the `is_company` field is `false`.

Alternatively, you can use the `visible()` method to show a field conditionally. It does the exact inverse of `hidden()`, and could be used if you prefer the clarity of the code when written this way:

```php
use Filament\Forms\Get;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\TextInput;

Checkbox::make('is_company')
    ->reactive()
    
TextInput::make('company_name')
    ->visible(fn (Get $get): bool => $get('is_company'))
```

### Conditionally making a field required

To conditionally make a field required, you can pass a function to the `required()` method, and return `true` or `false` depending on whether you want the field to be required or not. The function can [inject utilities](#form-component-utility-injection) as parameters, so you can do things like check the value of another field:

```php
use Filament\Forms\Get;
use Filament\Forms\Components\TextInput;

TextInput::make('company_name')
    ->lazy()
    
TextInput::make('vat_number')
    ->required(fn (Get $get): bool => filled($get('company_name')))
```

In this example, the `company_name` field is [`lazy()`](#lazily-reactive-fields). This allows the form to rerender after the value of the `company_name` field changes and the user clicks away. You can access the value of that field from within the `required()` function using the [`$get()` utility](#injecting-the-current-state-of-a-field). The value of the field is checked using `filled()` so that the `vat_number` field is required when the `company_name` field is not `null` or an empty string. The result is that the `vat_number` field is only required when the `company_name` field is filled in.

Using a function is able to make any other [validation rule](validation) dynamic in a similar way.

### Generating a slug from a title

To generate a slug from a title while the user is typing, you can use the [`afterStateUpdated()` method](#field-updates) on the title field to [`$set()`](#injecting-a-function-to-set-the-state-of-another-field) the value of the slug field:

```php
use Filament\Forms\Components\TextInput;
use Filament\Forms\Set;
use Illuminate\Support\Str;

TextInput::make('title')
    ->reactive()
    ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state)))
    
TextInput::make('slug')
```

In this example, the `title` field is [`reactive()`](#the-basics-of-reactivity). This allows the form to rerender when the value of the `title` field changes. The `afterStateUpdated()` method is used to run a function after the state of the `title` field is updated. The function injects the [`$set()` utility](#injecting-a-function-to-set-the-state-of-another-field) and the new state of the `title` field. The `Str::slug()` utility method is part of Laravel and is used to generate a slug from a string. The `slug` field is then updated using the `$set()` function.

One thing to note is that the user may customize the slug manually, and we don't want to overwrite their changes if the title changes. To prevent this, we can 

### Dependant select options

To dynamically update the options of a [select field](fields/select) based on the value of another field, you can pass a function to the `options()` method of the select field. The function can [inject utilities](#form-component-utility-injection) as parameters, so you can do things like check the value of another field using the [`$get()` utility](#injecting-the-current-state-of-a-field):

```php
use Filament\Forms\Get;
use Filament\Forms\Components\Select;

Select::make('category')
    ->options([
        'web' => 'Web development',
        'mobile' => 'Mobile development',
        'design' => 'Design',
    ])
    ->reactive()

Select::make('sub_category')
    ->options(fn (Get $get): array => match ($get('category')) {
        'web' => [
            'frontend_web' => 'Frontend development',
            'backend_web' => 'Backend development',
        ],
        'mobile' => [
            'ios_mobile' => 'iOS development',
            'android_mobile' => 'Android development',
        ],
        'design' => [
            'app_design' => 'Panel design',
            'marketing_website_design' => 'Marketing website design',
        ],
        default => [],
    })
```

In this example, the `category` field is [`reactive()`](#the-basics-of-reactivity). This allows the form to rerender when the value of the `category` field changes. You can access the value of that field from within the `options()` function using the [`$get()` utility](#injecting-the-current-state-of-a-field). The value of the field is used to determine which options should be available in the `sub_category` field. The `match ()` statement in PHP is used to return an array of options based on the value of the `category` field. The result is that the `sub_category` field will only show options relevant to the selected `category` field.

You could adapt this example to use options loaded from an Eloquent model or other data source, by querying within the function:

```php
use Filament\Forms\Get;
use Filament\Forms\Components\Select;
use Illuminate\Support\Collection;

Select::make('category')
    ->options(Category::query()->pluck('name', 'id'))
    ->reactive()
    
Select::make('sub_category')
    ->options(fn (Get $get): Collection => SubCategory::query()
        ->where('category', $get('category'))
        ->pluck('name', 'id'))
```

### Dynamic fields based on a select option

You may wish to render a different set of fields based on the value of a field, like a select. To do this, you can pass a function to the `schema()` method of any [layout component](layout), which checks the value of the field and returns a different schema based on that value. Also, you will need a way to initialise the new fields in the dynamic schema when they are first loaded.

```php
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Get;

Select::make('type')
    ->options([
        'employee' => 'Employee',
        'freelancer' => 'Freelancer',
    ])
    ->reactive()
    ->afterStateUpdated(fn (Select $component) => $component
        ->getContainer()
        ->getComponent('dynamicTypeFields')
        ->getChildComponentContainer()
        ->fill())
    
Grid::make(2)
    ->schema(function (Get $get): array {
        $type = $get('type');
        
        if ($type === 'employee') {
            return [
                TextInput::make('employee_number')
                    ->required(),
                FileUpload::make('badge')
                    ->image()
                    ->required(),
            ];
        }
        
        if ($type === 'freelancer') {
            return [
                TextInput::make('hourly_rate')
                    ->numeric()
                    ->required()
                    ->prefix('$'),
                FileUpload::make('contract')
                    ->required(),
            ];
        }
        
        return [];
    })
    ->key('dynamicTypeFields')
```

In this example, the `type` field is [`reactive()`](#the-basics-of-reactivity). This allows the form to rerender when the value of the `type` field changes. The `afterStateUpdated()` method is used to run a function after the state of the `type` field is updated. In this case, we [inject the current select field instance](#injecting-the-current-form-component-instance), which we can then use to get the form "container" instance that holds both the select and the grid components. With this container, we can target the grid component using a unique key (`dynamicTypeFields`) that we have assigned to it. With that grid component instance, we can call `fill()`, just as we do on a normal form to initialise it. The `schema()` method of the grid component is then used to return a different schema based on the value of the `type` field. This is done by using the [`$get()` utility](#injecting-the-current-state-of-a-field), and returning a different schema array dynamically.

### Auto-hashing password field

You have a password field:

```php
use Filament\Forms\Components\TextInput;

TextInput::make('password')
    ->password()
```

And you can use a [dehydration function](#field-dehydration) to hash the password when the form is submitted:

```php
use Filament\Forms\Components\TextInput;
use Illuminate\Support\Facades\Hash;

TextInput::make('password')
    ->password()
    ->dehydrateStateUsing(fn (string $state): string => Hash::make($state))
```

But if your form is used to change an existing password, you don't want to overwrite the existing password if the field is empty. You can [prevent the field from being dehydrated](#preventing-a-field-from-being-dehydrated) if the field is null or an empty string (using the `filled()` helper):

```php
use Filament\Forms\Components\TextInput;
use Illuminate\Support\Facades\Hash;

TextInput::make('password')
    ->password()
    ->dehydrateStateUsing(fn (string $state): string => Hash::make($state))
    ->dehydrated(fn (?string $state): bool => filled($state))
```

However, you want to require the password to be filled when the user is being created, by [injecting the `$operation` utility](#injecting-the-current-form-operation), and then [conditionally making the field required](#conditionally-making-a-field-required):

```php
use Filament\Forms\Components\TextInput;
use Illuminate\Support\Facades\Hash;

TextInput::make('password')
    ->password()
    ->dehydrateStateUsing(fn (string $state): string => Hash::make($state))
    ->dehydrated(fn (?string $state): bool => filled($state))
    ->required(fn (string $operation): bool => $operation === 'create')
```

## Saving data to relationships

> If you're building a form inside your Livewire component, make sure you have set up the [form's model](adding-a-form-to-a-livewire-component#setting-a-form-model). Otherwise, Filament doesn't know which model to use to retrieve the relationship from.

As well as being able to give structure to fields, [layout components](layout/getting-started) are also able to "teleport" their nested fields into a relationship. Filament will handle loading data from a `HasOne`, `BelongsTo` or `MorphOne` Eloquent relationship, and then it will save the data back to the same relationship. To set this behaviour up, you can use the `relationship()` method on any layout component:

```php
use Filament\Forms\Components\Fieldset;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;

Fieldset::make('Metadata')
    ->relationship('metadata')
    ->schema([
        TextInput::make('title'),
        Textarea::make('description'),
        FileUpload::make('image'),
    ])
```

In this example, the `title`, `description` and `image` are automatically loaded from the `metadata` relationship, and saved again when the form is submitted. If the `metadata` record does not exist, it is automatically created.

This functionality is not just limited to fieldsets - you can use it with any layout component. For example, you could use a `Group` component which has no styling associated with it:

```php
use Filament\Forms\Components\Group;
use Filament\Forms\Components\TextInput;

Group::make()
    ->relationship('customer')
    ->schema([
        TextInput::make('name')
            ->label('Customer')
            ->required(),
        TextInput::make('email')
            ->label('Email address')
            ->email()
            ->required(),
    ])
```
