<?php

namespace Filament\Forms2\Concerns;

use Filament\Forms2\Components;

trait CanBeValidated
{
    public function getValidationRules(): array
    {
        $rules = [];

        foreach ($this->getComponents() as $component) {
            if (
                $component instanceof Components\Contracts\CanBeValidated &&
                count($componentRules = $component->getValidationRules())
            ) {
                $rules[$component->getStatePath()] = $componentRules;
            }

            foreach ($component->getChildComponentContainers() as $container) {
                $rules = array_merge($rules, $container->getValidationRules());
            }
        }

        return $rules;
    }

    public function validate(): array
    {
        return $this->getLivewire()->validate($this->getValidationRules());
    }
}
