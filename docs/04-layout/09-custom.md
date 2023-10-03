---
title: Custom layouts
---

## View components

Aside from [building custom layout components](custom), you may create "view" components which allow you to create custom layouts without extra PHP classes.

```php
use Filament\Forms\Components\View;

View::make('filament.forms.components.wizard')
```

This assumes that you have a `resources/views/filament/forms/components/wizard.blade.php` file.

## Custom layout classes

You may create your own custom component classes and views, which you can reuse across your project, and even release as a plugin to the community.

> If you're just creating a simple custom component to use once, you could instead use a [view component](#view) to render any custom Blade file.

To create a custom column class and view, you may use the following command:

```bash
php artisan make:form-layout Wizard
```

This will create the following layout component class:

```php
use Filament\Forms\Components\Component;

class Wizard extends Component
{
    protected string $view = 'filament.forms.components.wizard';

    public static function make(): static
    {
        return app(static::class);
    }
}
```

It will also create a view file at `resources/views/filament/forms/components/wizard.blade.php`.

## Rendering the component's schema

Inside your view, you may render the component's `schema()` using the `$getChildComponentContainer()` function:

```blade
<div>
    {{ $getChildComponentContainer() }}
</div>
```

## Accessing the Eloquent record

Inside your view, you may access the Eloquent record using the `$getRecord()` function:

```blade
<div>
    {{ $getRecord()->name }}
</div>
```
