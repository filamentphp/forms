<?php

namespace Filament\Forms2\Components\Concerns;

trait ListensToEvents
{
    protected array $listeners = [];

    public function dispatchEvent(string $event, ...$parameters): static
    {
        foreach ($this->getListeners($event) as $callback) {
            $callback(...$parameters);
        }

        return $this;
    }

    public function registerListeners(array $listeners): static
    {
        foreach ($listeners as $event => $callbacks) {
            $this->listeners[$event] = array_merge($this->getListeners($event), $callbacks);
        }

        return $this;
    }

    public function getListeners(string $event = null): array
    {
        $listeners = $this->listeners;

        if ($event) {
            return $listeners[$event] ?? [];
        }

        return $listeners;
    }
}
