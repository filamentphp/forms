<?php

namespace Filament\Forms2\Components;

class Checkbox extends Field
{
    use Concerns\CanBeAccepted;
    use Concerns\CanBeInline;

    protected static string $view = 'forms2::components.checkbox';

    public function setUp(): void
    {
        $this->default(false);

        $this->inline();
    }
}
