<?php

namespace Filament\Forms2\Components\Concerns;

use Illuminate\Support\Str;

trait HasLabel
{
    protected $label = null;

    public function label(string | callable $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function getLabel(): string
    {
        return $this->evaluate($this->label) ?? (string) Str::of($this->getStatePath())
            ->afterLast('.')
            ->kebab()
            ->replace(['-', '_'], ' ')
            ->ucfirst();
    }
}
