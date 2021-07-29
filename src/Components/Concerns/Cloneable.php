<?php

namespace Filament\Forms2\Components\Concerns;

trait Cloneable
{
    public function getClone(): static
    {
        return clone $this;
    }
}
