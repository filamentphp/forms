<?php

namespace Filament\Forms2\Components\Concerns;

trait HasHint
{
    protected $hint = null;

    public function hint(string | callable $hint): static
    {
        $this->hint = $hint;

        return $this;
    }

    public function getHint(): ?string
    {
        return $this->evaluate($this->hint);
    }
}
