---
title: Select
---
import Aside from "@components/Aside.astro"
import AutoScreenshot from "@components/AutoScreenshot.astro"
import UtilityInjection from "@components/UtilityInjection.astro"

## Introduction

The select component allows you to select from a list of predefined options:

```php
use Filament\Forms\Components\Select;

Select::make('status')
    ->options([
        'draft' => 'Draft',
        'reviewing' => 'Reviewing',
        'published' => 'Published',
    ])
```

<UtilityInjection set="formFields" version="4.x">As well as allowing a static array, the `options()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.</UtilityInjection>

<AutoScreenshot name="forms/fields/select/simple" alt="Select" version="4.x" />

## Enabling the JavaScript select

By default, Filament uses the native HTML5 select. You may enable a more customizable JavaScript select using the `native(false)` method:

```php
use Filament\Forms\Components\Select;

Select::make('status')
    ->options([
        'draft' => 'Draft',
        'reviewing' => 'Reviewing',
        'published' => 'Published',
    ])
    ->native(false)
```

<UtilityInjection set="formFields" version="4.x">As well as allowing a static value, the `native()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.</UtilityInjection>

<AutoScreenshot name="forms/fields/select/javascript" alt="JavaScript select" version="4.x" />

## Searching options

You may enable a search input to allow easier access to many options, using the `searchable()` method:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->label('Author')
    ->options(User::query()->pluck('name', 'id'))
    ->searchable()
```

Optionally, you may pass a boolean value to control if the input should be searchable or not:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->label('Author')
    ->options(User::query()->pluck('name', 'id'))
    ->searchable(FeatureFlag::active())
```

<UtilityInjection set="formFields" version="4.x">As well as allowing a static value, the `searchable()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.</UtilityInjection>

<AutoScreenshot name="forms/fields/select/searchable" alt="Searchable select" version="4.x" />

### Returning custom search results

If you have lots of options and want to populate them based on a database search or other external data source, you can use the `getSearchResultsUsing()` and `getOptionLabelUsing()` methods instead of `options()`.

The `getSearchResultsUsing()` method accepts a callback that returns search results in `$key => $value` format. The current user's search is available as `$search`, and you should use that to filter your results.

The `getOptionLabelUsing()` method accepts a callback that transforms the selected option `$value` into a label. This is used when the form is first loaded when the user has not made a search yet. Otherwise, the label used to display the currently selected option would not be available.

Both `getSearchResultsUsing()` and `getOptionLabelUsing()` must be used on the select if you want to provide custom search results:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->searchable()
    ->getSearchResultsUsing(fn (string $search): array => User::query()
        ->where('name', 'like', "%{$search}%")
        ->limit(50)
        ->pluck('name', 'id')
        ->all())
    ->getOptionLabelUsing(fn ($value): ?string => User::find($value)?->name),
```

<UtilityInjection set="formFields" version="4.x" extras="Option value;;mixed;;$value;;[<code>getOptionLabelUsing()</code> only] The option value to retrieve the label for.||Option values;;array<mixed>;;$values;;[<code>getOptionLabelsUsing()</code> only] The option values to retrieve the labels for.||Search;;?string;;$search;;[<code>getSearchResultsUsing()</code> only] The current search input value, if the field is searchable.">You can inject various utilities into these functions as parameters.</UtilityInjection>

### Setting a custom loading message

When you're using a searchable select or multi-select, you may want to display a custom message while the options are loading. You can do this using the `loadingMessage()` method:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->loadingMessage('Loading authors...')
```

<UtilityInjection set="formFields" version="4.x">As well as allowing a static value, the `loadingMessage()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.</UtilityInjection>

### Setting a custom no search results message

When you're using a searchable select or multi-select, you may want to display a custom message when no search results are found. You can do this using the `noSearchResultsMessage()` method:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->noSearchResultsMessage('No authors found.')
```

<UtilityInjection set="formFields" version="4.x">As well as allowing a static value, the `noSearchResultsMessage()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.</UtilityInjection>

### Setting a custom search prompt

When you're using a searchable select or multi-select, you may want to display a custom message when the user has not yet entered a search term. You can do this using the `searchPrompt()` method:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable(['name', 'email'])
    ->searchPrompt('Search authors by their name or email address')
```

<UtilityInjection set="formFields" version="4.x">As well as allowing a static value, the `searchPrompt()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.</UtilityInjection>

### Setting a custom searching message

When you're using a searchable select or multi-select, you may want to display a custom message while the search results are being loaded. You can do this using the `searchingMessage()` method:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->searchingMessage('Searching authors...')
```

<UtilityInjection set="formFields" version="4.x">As well as allowing a static value, the `searchingMessage()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.</UtilityInjection>

### Tweaking the search debounce

By default, Filament will wait 1000 milliseconds (1 second) before searching for options when the user types in a searchable select or multi-select. It will also wait 1000 milliseconds between searches, if the user is continuously typing into the search input. You can change this using the `searchDebounce()` method:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->searchDebounce(500)
```

Ensure that you are not lowering the debounce too much, as this may cause the select to become slow and unresponsive due to a high number of network requests to retrieve options from server.

<UtilityInjection set="formFields" version="4.x">As well as allowing a static value, the `searchDebounce()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.</UtilityInjection>

## Multi-select

The `multiple()` method on the `Select` component allows you to select multiple values from the list of options:

```php
use Filament\Forms\Components\Select;

Select::make('technologies')
    ->multiple()
    ->options([
        'tailwind' => 'Tailwind CSS',
        'alpine' => 'Alpine.js',
        'laravel' => 'Laravel',
        'livewire' => 'Laravel Livewire',
    ])
```

Optionally, you may pass a boolean value to control if the input should be multiple or not:

```php
use Filament\Forms\Components\Select;

Select::make('technologies')
    ->multiple(FeatureFlag::active())
    ->options([
        'tailwind' => 'Tailwind CSS',
        'alpine' => 'Alpine.js',
        'laravel' => 'Laravel',
        'livewire' => 'Laravel Livewire',
    ])
```

<UtilityInjection set="formFields" version="4.x">As well as allowing a static value, the `multiple()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.</UtilityInjection>

<AutoScreenshot name="forms/fields/select/multiple" alt="Multi-select" version="4.x" />

These options are returned in JSON format. If you're saving them using Eloquent, you should be sure to add an `array` [cast](https://laravel.com/docs/eloquent-mutators#array-and-json-casting) to the model property:

```php
use Illuminate\Database\Eloquent\Model;

class App extends Model
{
    protected $casts = [
        'technologies' => 'array',
    ];

    // ...
}
```

If you're [returning custom search results](#returning-custom-search-results), you should define `getOptionLabelsUsing()` instead of `getOptionLabelUsing()`. `$values` will be passed into the callback instead of `$value`, and you should return a `$key => $value` array of labels and their corresponding values:

```php
Select::make('technologies')
    ->multiple()
    ->searchable()
    ->getSearchResultsUsing(fn (string $search): array => Technology::query()
        ->where('name', 'like', "%{$search}%")
        ->limit(50)
        ->pluck('name', 'id')
        ->all())
    ->getOptionLabelsUsing(fn (array $values): array => Technology::query()
        ->whereIn('id', $values)
        ->pluck('name', 'id')
        ->all()),
```

<UtilityInjection set="formFields" version="4.x" extras="Option values;;array<mixed>;;$values;;[<code>getOptionLabelsUsing()</code> only] The option values to retrieve the labels for.">The `getOptionLabelsUsing()` method can inject various utilities into the function as parameters.</UtilityInjection>

## Grouping options

You can group options together under a label, to organize them better. To do this, you can pass an array of groups to `options()` or wherever you would normally pass an array of options. The keys of the array are used as group labels, and the values are arrays of options in that group:

```php
use Filament\Forms\Components\Select;

Select::make('status')
    ->searchable()
    ->options([
        'In Process' => [
            'draft' => 'Draft',
            'reviewing' => 'Reviewing',
        ],
        'Reviewed' => [
            'published' => 'Published',
            'rejected' => 'Rejected',
        ],
    ])
```

<AutoScreenshot name="forms/fields/select/grouped" alt="Grouped select" version="4.x" />

## Integrating with an Eloquent relationship

You may employ the `relationship()` method of the `Select` to configure a `BelongsTo` relationship to automatically retrieve options from. The `titleAttribute` is the name of a column that will be used to generate a label for each option:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
```

The `multiple()` method may be used in combination with `relationship()` to use a `BelongsToMany` relationship. Filament will load the options from the relationship, and save them back to the relationship's pivot table when the form is submitted. If a `name` is not provided, Filament will use the field name as the relationship name:

```php
use Filament\Forms\Components\Select;

Select::make('technologies')
    ->multiple()
    ->relationship(titleAttribute: 'name')
```

<Aside variant="warning">
    When using `disabled()` with `multiple()` and `relationship()`, ensure that `disabled()` is called before `relationship()`. This ensures that the `dehydrated()` call from within `relationship()` is not overridden by the call from `disabled()`:
    
    ```php
    use Filament\Forms\Components\Select;
    
    Select::make('technologies')
        ->multiple()
        ->disabled()
        ->relationship(titleAttribute: 'name')
    ```
</Aside>

### Searching relationship options across multiple columns

By default, if the select is also searchable, Filament will return search results for the relationship based on the title column of the relationship. If you'd like to search across multiple columns, you can pass an array of columns to the `searchable()` method:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable(['name', 'email'])
```

### Preloading relationship options

If you'd like to populate the searchable options from the database when the page is loaded, instead of when the user searches, you can use the `preload()` method:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->preload()
```

Optionally, you may pass a boolean value to control if the input should be preloaded or not:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->preload(FeatureFlag::active())
```

<UtilityInjection set="formFields" version="4.x">As well as allowing a static value, the `preload()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.</UtilityInjection>

### Excluding the current record

When working with recursive relationships, you will likely want to remove the current record from the set of results.

This can be easily be done using the `ignoreRecord` argument:

```php
use Filament\Forms\Components\Select;

Select::make('parent_id')
    ->relationship(name: 'parent', titleAttribute: 'name', ignoreRecord: true)
```

### Customizing the relationship query

You may customize the database query that retrieves options using the third parameter of the `relationship()` method:

```php
use Filament\Forms\Components\Select;
use Illuminate\Database\Eloquent\Builder;

Select::make('author_id')
    ->relationship(
        name: 'author',
        titleAttribute: 'name',
        modifyQueryUsing: fn (Builder $query) => $query->withTrashed(),
    )
```

<UtilityInjection set="formFields" version="4.x" extras="Query;;Illuminate\Database\Eloquent\Builder;;$query;;The Eloquent query builder to modify.||Search;;?string;;$search;;The current search input value, if the field is searchable.">The `modifyQueryUsing` argument can inject various utilities into the function as parameters.</UtilityInjection>

### Customizing the relationship option labels

If you'd like to customize the label of each option, maybe to be more descriptive, or to concatenate a first and last name, you could use a virtual column in your database migration:

```php
$table->string('full_name')->virtualAs('concat(first_name, \' \', last_name)');
```

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'full_name')
```

Alternatively, you can use the `getOptionLabelFromRecordUsing()` method to transform an option's Eloquent model into a label:

```php
use Filament\Forms\Components\Select;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

Select::make('author_id')
    ->relationship(
        name: 'author',
        modifyQueryUsing: fn (Builder $query) => $query->orderBy('first_name')->orderBy('last_name'),
    )
    ->getOptionLabelFromRecordUsing(fn (Model $record) => "{$record->first_name} {$record->last_name}")
    ->searchable(['first_name', 'last_name'])
```

<UtilityInjection set="formFields" version="4.x" extras="Eloquent record;;Illuminate\Database\Eloquent\Model;;$record;;The Eloquent record to get the option label for.">The `getOptionLabelFromRecordUsing()` method can inject various utilities into the function as parameters.</UtilityInjection>

### Saving pivot data to the relationship

If you're using a `multiple()` relationship and your pivot table has additional columns, you can use the `pivotData()` method to specify the data that should be saved in them:

```php
use Filament\Forms\Components\Select;

Select::make('primaryTechnologies')
    ->relationship(name: 'technologies', titleAttribute: 'name')
    ->multiple()
    ->pivotData([
        'is_primary' => true,
    ])
```

<UtilityInjection set="formFields" version="4.x">As well as allowing a static value, the `pivotData()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.</UtilityInjection>

### Creating a new option in a modal

You may define a custom form that can be used to create a new record and attach it to the `BelongsTo` relationship:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->createOptionForm([
        Forms\Components\TextInput::make('name')
            ->required(),
        Forms\Components\TextInput::make('email')
            ->required()
            ->email(),
    ]),
```

<UtilityInjection set="formFields" version="4.x" extras="Schema;;Filament\Schemas\Schema;;$schema;;The schema object for the form in the modal.">As well as allowing a static value, the `createOptionForm()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.</UtilityInjection>

<AutoScreenshot name="forms/fields/select/create-option" alt="Select with create option button" version="4.x" />

The form opens in a modal, where the user can fill it with data. Upon form submission, the new record is selected by the field.

<AutoScreenshot name="forms/fields/select/create-option-modal" alt="Select with create option modal" version="4.x" />

#### Customizing new option creation

You can customize the creation process of the new option defined in the form using the `createOptionUsing()` method, which should return the primary key of the newly created record:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->createOptionForm([
       // ...
    ])
    ->createOptionUsing(function (array $data): int {
        return auth()->user()->team->members()->create($data)->getKey();
    }),
```

<UtilityInjection set="formFields" version="4.x" extras="Data;;array<string, mixed>;;$data;;The data from the form in the modal.||Schema;;Filament\Schemas\Schema;;$schema;;The schema object for the form in the modal.">The `createOptionUsing()` method can inject various utilities into the function as parameters.</UtilityInjection>

### Editing the selected option in a modal

You may define a custom form that can be used to edit the selected record and save it back to the `BelongsTo` relationship:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->editOptionForm([
        Forms\Components\TextInput::make('name')
            ->required(),
        Forms\Components\TextInput::make('email')
            ->required()
            ->email(),
    ]),
```

<UtilityInjection set="formFields" version="4.x" extras="Schema;;Filament\Schemas\Schema;;$schema;;The schema object for the form in the modal.">As well as allowing a static value, the `editOptionForm()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.</UtilityInjection>

<AutoScreenshot name="forms/fields/select/edit-option" alt="Select with edit option button" version="4.x" />

The form opens in a modal, where the user can fill it with data. Upon form submission, the data from the form is saved back to the record.

<AutoScreenshot name="forms/fields/select/edit-option-modal" alt="Select with edit option modal" version="4.x" />

#### Customizing option updates

You can customize the update process of the selected option defined in the form using the `updateOptionUsing()` method. The current Eloquent record being edited can be retrieved using the `getRecord()` method on the schema:

```php
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->editOptionForm([
       // ...
    ])
    ->updateOptionUsing(function (array $data, Schema $schema) {
        $schema->getRecord()?->update($data);
    }),
```

<UtilityInjection set="formFields" version="4.x" extras="Data;;array<string, mixed>;;$data;;The data from the form in the modal.||Schema;;Filament\Schemas\Schema;;$schema;;The schema object for the form in the modal.">The `updateOptionUsing()` method can inject various utilities into the function as parameters.</UtilityInjection>

### Handling `MorphTo` relationships

`MorphTo` relationships are special, since they give the user the ability to select records from a range of different models. Because of this, we have a dedicated `MorphToSelect` component which is not actually a select field, rather 2 select fields inside a fieldset. The first select field allows you to select the type, and the second allows you to select the record of that type.

To use the `MorphToSelect`, you must pass `types()` into the component, which tell it how to render options for different types:

```php
use Filament\Forms\Components\MorphToSelect;

MorphToSelect::make('commentable')
    ->types([
        MorphToSelect\Type::make(Product::class)
            ->titleAttribute('name'),
        MorphToSelect\Type::make(Post::class)
            ->titleAttribute('title'),
    ])
```

<UtilityInjection set="formFields" version="4.x">The `types()` method can inject various utilities into the function as parameters.</UtilityInjection>

#### Customizing the option labels for each morphed type

The `titleAttribute()` is used to extract the titles out of each product or post. If you'd like to customize the label of each option, you can use the `getOptionLabelFromRecordUsing()` method to transform the Eloquent model into a label:

```php
use Filament\Forms\Components\MorphToSelect;

MorphToSelect::make('commentable')
    ->types([
        MorphToSelect\Type::make(Product::class)
            ->getOptionLabelFromRecordUsing(fn (Product $record): string => "{$record->name} - {$record->slug}"),
        MorphToSelect\Type::make(Post::class)
            ->titleAttribute('title'),
    ])
```

#### Customizing the relationship query for each morphed type

You may customize the database query that retrieves options using the `modifyOptionsQueryUsing()` method:

```php
use Filament\Forms\Components\MorphToSelect;
use Illuminate\Database\Eloquent\Builder;

MorphToSelect::make('commentable')
    ->types([
        MorphToSelect\Type::make(Product::class)
            ->titleAttribute('name')
            ->modifyOptionsQueryUsing(fn (Builder $query) => $query->whereBelongsTo($this->team)),
        MorphToSelect\Type::make(Post::class)
            ->titleAttribute('title')
            ->modifyOptionsQueryUsing(fn (Builder $query) => $query->whereBelongsTo($this->team)),
    ])
```

<UtilityInjection set="formFields" version="4.x" extras="Eloquent query builder;;Illuminate\Database\Eloquent\Builder;;$query;;The query builder to modify.">The `modifyOptionsQueryUsing()` method can inject various utilities into the function as parameters.</UtilityInjection>

<Aside variant="tip">
    Many of the same options in the select field are available for `MorphToSelect`, including `searchable()`, `preload()`, `native()`, `allowHtml()`, and `optionsLimit()`.
</Aside>

## Allowing HTML in the option labels

By default, Filament will escape any HTML in the option labels. If you'd like to allow HTML, you can use the `allowHtml()` method:

```php
use Filament\Forms\Components\Select;

Select::make('technology')
    ->options([
        'tailwind' => '<span class="text-blue-500">Tailwind</span>',
        'alpine' => '<span class="text-green-500">Alpine</span>',
        'laravel' => '<span class="text-red-500">Laravel</span>',
        'livewire' => '<span class="text-pink-500">Livewire</span>',
    ])
    ->searchable()
    ->allowHtml()
```

<Aside variant="danger">
    Be aware that you will need to ensure that the HTML is safe to render, otherwise your application will be vulnerable to XSS attacks.
</Aside>

Optionally, you may pass a boolean value to control if the input should allow HTML or not:

```php
use Filament\Forms\Components\Select;

Select::make('technology')
    ->options([
        'tailwind' => '<span class="text-blue-500">Tailwind</span>',
        'alpine' => '<span class="text-green-500">Alpine</span>',
        'laravel' => '<span class="text-red-500">Laravel</span>',
        'livewire' => '<span class="text-pink-500">Livewire</span>',
    ])
    ->searchable()
    ->allowHtml(FeatureFlag::active())
```

<UtilityInjection set="formFields" version="4.x">As well as allowing a static value, the `allowHtml()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.</UtilityInjection>

## Disable placeholder selection

You can prevent the placeholder (null option) from being selected using the `selectablePlaceholder(false)` method:

```php
use Filament\Forms\Components\Select;

Select::make('status')
    ->options([
        'draft' => 'Draft',
        'reviewing' => 'Reviewing',
        'published' => 'Published',
    ])
    ->default('draft')
    ->selectablePlaceholder(false)
```

<UtilityInjection set="formFields" version="4.x">As well as allowing a static value, the `selectablePlaceholder()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.</UtilityInjection>

## Disabling specific options

You can disable specific options using the `disableOptionWhen()` method. It accepts a closure, in which you can check if the option with a specific `$value` should be disabled:

```php
use Filament\Forms\Components\Select;

Select::make('status')
    ->options([
        'draft' => 'Draft',
        'reviewing' => 'Reviewing',
        'published' => 'Published',
    ])
    ->default('draft')
    ->disableOptionWhen(fn (string $value): bool => $value === 'published')
```

<UtilityInjection set="formFields" version="4.x" extras="Option value;;mixed;;$value;;The value of the option to disable.||Option label;;string | Illuminate\Contracts\Support\Htmlable;;$label;;The label of the option to disable.">You can inject various utilities into the function as parameters.</UtilityInjection>

If you want to retrieve the options that have not been disabled, e.g. for validation purposes, you can do so using `getEnabledOptions()`:

```php
use Filament\Forms\Components\Select;

Select::make('status')
    ->options([
        'draft' => 'Draft',
        'reviewing' => 'Reviewing',
        'published' => 'Published',
    ])
    ->default('draft')
    ->disableOptionWhen(fn (string $value): bool => $value === 'published')
    ->in(fn (Select $component): array => array_keys($component->getEnabledOptions()))
```

For more information about the `in()` function, please see the [Validation documentation](validation#in).

## Adding affix text aside the field

You may place text before and after the input using the `prefix()` and `suffix()` methods:

```php
use Filament\Forms\Components\Select;

Select::make('domain')
    ->prefix('https://')
    ->suffix('.com')
```

<UtilityInjection set="formFields" version="4.x">As well as allowing static values, the `prefix()` and `suffix()` methods also accept a function to dynamically calculate them. You can inject various utilities into the function as parameters.</UtilityInjection>

<AutoScreenshot name="forms/fields/select/affix" alt="Select with affixes" version="4.x" />

### Using icons as affixes

You may place an [icon](../styling/icons) before and after the input using the `prefixIcon()` and `suffixIcon()` methods:

```php
use Filament\Forms\Components\Select;
use Filament\Support\Icons\Heroicon;

Select::make('domain')
    ->suffixIcon(Heroicon::GlobeAlt)
```

<UtilityInjection set="formFields" version="4.x">As well as allowing static values, the `prefixIcon()` and `suffixIcon()` methods also accept a function to dynamically calculate them. You can inject various utilities into the function as parameters.</UtilityInjection>

<AutoScreenshot name="forms/fields/select/suffix-icon" alt="Select with suffix icon" version="4.x" />

#### Setting the affix icon's color

Affix icons are gray by default, but you may set a different color using the `prefixIconColor()` and `suffixIconColor()` methods:

```php
use Filament\Forms\Components\Select;
use Filament\Support\Icons\Heroicon;

Select::make('domain')
    ->suffixIcon(Heroicon::CheckCircle)
    ->suffixIconColor('success')
```

<UtilityInjection set="formFields" version="4.x">As well as allowing static values, the `prefixIconColor()` and `suffixIconColor()` methods also accept a function to dynamically calculate them. You can inject various utilities into the function as parameters.</UtilityInjection>

## Limiting the number of options

You can limit the number of options that are displayed in a searchable select or multi-select using the `optionsLimit()` method. The default is 50:

```php
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->searchable()
    ->optionsLimit(20)
```

Ensure that you are not raising the limit too high, as this may cause the select to become slow and unresponsive due to high in-browser memory usage.

<UtilityInjection set="formFields" version="4.x">As well as allowing a static value, the `optionsLimit()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.</UtilityInjection>

## Boolean options

If you want a simple boolean select, with "Yes" and "No" options, you can use the `boolean()` method:

```php
use Filament\Forms\Components\Select;

Select::make('feedback')
    ->label('Like this post?')
    ->boolean()
```

To customize the "Yes" label, you can use the `trueLabel` argument on the `boolean()` method:

```php
use Filament\Forms\Components\Select;

Select::make('feedback')
    ->label('Like this post?')
    ->boolean(trueLabel: 'Absolutely!')
```

To customize the "No" label, you can use the `falseLabel` argument on the `boolean()` method:

```php
use Filament\Forms\Components\Select;

Select::make('feedback')
    ->label('Like this post?')
    ->boolean(falseLabel: 'Not at all!')
```

To customize the placeholder that shows when an option has not yet been selected, you can use the `placeholder` argument on the `boolean()` method:

```php
use Filament\Forms\Components\Select;

Select::make('feedback')
    ->label('Like this post?')
    ->boolean(placeholder: 'Make your mind up...')
```

## Select validation

As well as all rules listed on the [validation](validation) page, there are additional rules that are specific to selects.

### Selected items validation

You can validate the minimum and maximum number of items that you can select in a [multi-select](#multi-select) by setting the `minItems()` and `maxItems()` methods:

```php
use Filament\Forms\Components\Select;

Select::make('technologies')
    ->multiple()
    ->options([
        'tailwind' => 'Tailwind CSS',
        'alpine' => 'Alpine.js',
        'laravel' => 'Laravel',
        'livewire' => 'Laravel Livewire',
    ])
    ->minItems(1)
    ->maxItems(3)
```

<UtilityInjection set="formFields" version="4.x">As well as allowing static values, the `minItems()` and `maxItems()` methods also accept a function to dynamically calculate them. You can inject various utilities into the function as parameters.</UtilityInjection>

## Customizing the select action objects

This field uses action objects for easy customization of buttons within it. You can customize these buttons by passing a function to an action registration method. The function has access to the `$action` object, which you can use to [customize it](../actions/overview) or [customize its modal](../actions/modals). The following methods are available to customize the actions:

- `createOptionAction()`
- `editOptionAction()`
- `manageOptionActions()` (for customizing both the create and edit option actions at once)

Here is an example of how you might customize an action:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\Select;

Select::make('author_id')
    ->relationship(name: 'author', titleAttribute: 'name')
    ->createOptionAction(
        fn (Action $action) => $action->modalWidth('3xl'),
    )
```

<UtilityInjection set="formFields" version="4.x" extras="Action;;Filament\Actions\Action;;$action;;The action object to customize.">The action registration methods can inject various utilities into the function as parameters.</UtilityInjection>
