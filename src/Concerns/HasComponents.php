<?php

namespace Filament\Forms2\Concerns;

use Filament\Forms2\Components\Component;

trait HasComponents
{
    protected array $components = [];

    public function components(array $components): static
    {
        $this->components = array_map(function (Component $component): Component {
            $component->container($this);

            return $component;
        }, $components);

        return $this;
    }

    public function schema(array $components): static
    {
        $this->components($components);

        return $this;
    }

    public function getComponents(): array
    {
        return array_filter($this->components, fn (Component $component) => ! $component->isHidden());
    }
}
