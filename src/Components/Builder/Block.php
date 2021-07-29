<?php

namespace Filament\Forms2\Components\Builder;

use Filament\Forms2\Components\Component;

class Block extends Component
{
    protected static string $view = 'forms2::components.builder.block';

    public static function make(): static
    {
        return new static();
    }
}
