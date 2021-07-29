<?php

namespace Filament\Forms2\Components\Concerns;

trait HasPlaceholder
{
    protected $placeholder = null;

    public function placeholder(string | callable $placeholder): static
    {
        $this->placeholder = $placeholder;

        return $this;
    }

    public function getPlaceholder(): ?string
    {
        if (! ($placeholder = $this->evaluate($this->placeholder))) {
            return null;
        }

        return $placeholder;
    }
}
