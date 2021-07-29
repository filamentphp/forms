<?php

namespace Filament\Forms2\Concerns;

trait ListensToEvents
{
    public function dispatchEvent(string $event, ...$parameters): void
    {
        foreach ($this->getComponents() as $component) {
            $component->dispatchEvent($event, ...$parameters);

            foreach ($component->getChildComponentContainers() as $container) {
                $container->dispatchEvent($event, ...$parameters);
            }
        }
    }
}
