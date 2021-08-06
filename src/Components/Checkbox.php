<?php

namespace Filament\Forms2\Components;

class Checkbox extends Field
{
    use Concerns\CanBeAccepted;
    use Concerns\CanBeInline;

    protected string $view = 'forms2::components.checkbox';

    protected function setUp(): void
    {
        $this->default(false);

        $this->inline();
    }
}
