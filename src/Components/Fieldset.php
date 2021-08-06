<?php

namespace Filament\Forms2\Components;

class Fieldset extends Component
{
    protected string $view = 'forms2::components.fieldset';

    final public function __construct(string $label)
    {
        $this->label($label);
    }

    public static function make(string $label): static
    {
        $static = new static($label);
        $static->setUp();

        return $static;
    }

    protected function setUp(): void
    {
        $this->columnSpan('full');
        $this->columns(2);
    }
}
