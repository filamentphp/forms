<?php

namespace Filament\Forms\Components;

use Filament\Support\Concerns\HasExtraAlpineAttributes;

class CodeEditor extends Field
{
    use HasExtraAlpineAttributes;

    /**
     * @var view-string
     */
    protected string $view = 'filament-forms::components.code-editor';
}
