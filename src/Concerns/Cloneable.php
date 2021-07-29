<?php

namespace Filament\Forms2\Concerns;

trait Cloneable
{
    public function cloneComponents(): static
    {
        $components = [];

        foreach ($this->getComponents() as $component) {
            $components[] = $component->getClone();
        }

        return $this->components($components);
    }

    public function getClone(): static
    {
        $clone = clone $this;
        $clone->cloneComponents();

        return $clone;
    }
}
