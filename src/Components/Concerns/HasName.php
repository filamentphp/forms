<?php

namespace Filament\Forms2\Components\Concerns;

trait HasName
{
    protected string $name;

    public function name(string | callable $name): static
    {
        $this->name = $name;

        $this->statePath($this->name);

        return $this;
    }

    public function getName(): string
    {
        return $this->evaluate($this->name);
    }
}
