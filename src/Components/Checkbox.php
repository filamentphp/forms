<?php

namespace Filament\Forms2\Components;

class Checkbox extends Field
{
    protected static string $view = 'forms2::components.checkbox';

    protected $isInline = true;

    public function setUp(): void
    {
        $this->default(false);
    }

    public function inline(bool | callable $condition = true)
    {
        $this->isInline = $condition;

        return $this;
    }

    public function isInline()
    {
        return $this->evaluate($this->isInline);
    }
}
