---
title: Key-value
---
import AutoScreenshot from "@components/AutoScreenshot.astro"

## Overview

The key-value field allows you to interact with one-dimensional JSON object:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
```

<AutoScreenshot name="forms/fields/key-value/simple" alt="Key-value" version="3.x" />

## Adding rows

An action button is displayed below the field to allow the user to add a new row.

## Setting the add action button's label

You may set a label to customize the text that should be displayed in the button for adding a row, using the `addActionLabel()` method:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->addActionLabel('Add property')
```

### Preventing the user from adding rows

You may prevent the user from adding rows using the `addable(false)` method:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->addable(false)
```

## Deleting rows

An action button is displayed on each item to allow the user to delete it.

### Preventing the user from deleting rows

You may prevent the user from deleting rows using the `deletable(false)` method:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->deletable(false)
```

## Editing keys

### Customizing the key fields' label

You may customize the label for the key fields using the `keyLabel()` method:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->keyLabel('Property name')
```

### Adding key field placeholders

You may also add placeholders for the key fields using the `keyPlaceholder()` method:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->keyPlaceholder('Property name')
```

### Preventing the user from editing keys

You may prevent the user from editing keys using the `editableKeys(false)` method:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->editableKeys(false)
```

## Editing values

### Customizing the value fields' label

You may customize the label for the value fields using the `valueLabel()` method:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->valueLabel('Property value')
```

### Adding value field placeholders

You may also add placeholders for the value fields using the `valuePlaceholder()` method:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->valuePlaceholder('Property value')
```

### Preventing the user from editing values

You may prevent the user from editing values using the `editableValues(false)` method:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->editableValues(false)
```

## Reordering rows

You can allow the user to reorder rows within the table using the `reorderable()` method:

```php
use Filament\Forms\Components\KeyValue;

KeyValue::make('meta')
    ->reorderable()
```

<AutoScreenshot name="forms/fields/key-value/reorderable" alt="Key-value with reorderable rows" version="3.x" />
