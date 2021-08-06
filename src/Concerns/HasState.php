<?php

namespace Filament\Forms2\Concerns;

use Illuminate\Support\Arr;

trait HasState
{
    protected ?string $statePath = null;

    public function callAfterStateUpdated(string $path): bool
    {
        foreach ($this->getComponents() as $component) {
            if ($component->getStatePath() === $path) {
                $component->callAfterStateUpdated();

                return true;
            }

            foreach ($component->getChildComponentContainers() as $container) {
                if ($container->callAfterStateUpdated($path)) {
                    return true;
                }
            }
        }

        return false;
    }

    public function dehydrateState(array $state = []): array
    {
        foreach ($this->getComponents() as $component) {
            $componentStatePath = $component->getStatePath();

            $component->callBeforeStateDehydrated();

            if ($component->isDehydrated()) {
                data_set($state, $componentStatePath, $component->dehydrateState());
            } else {
                Arr::forget($state, $componentStatePath);
            }

            foreach ($component->getChildComponentContainers() as $container) {
                $container->dehydrateState($state);
            }
        }

        if ($statePath = $this->getStatePath()) {
            $state = data_get($state, $statePath, []);
        }

        return $state;
    }

    public function hydrateDefaultState(): static
    {
        foreach ($this->getComponents() as $component) {
            $component->hydrateDefaultState();

            foreach ($component->getChildComponentContainers() as $container) {
                $container->hydrateDefaultState();
            }
        }

        return $this;
    }

    public function hydrateState(?array $state = null): static
    {
        if ($state !== null) {
            $this->hydrateStateFromArray($state);
        } else {
            $this->hydrateDefaultState();
        }

        return $this;
    }

    public function hydrateStateFromArray(array $state): static
    {
        $livewire = $this->getLivewire();

        if ($statePath = $this->getStatePath()) {
            data_set($livewire, $statePath, $state);
        } else {
            foreach ($state as $key => $value) {
                data_set($livewire, $key, $value);
            }
        }

        foreach ($this->getComponents() as $component) {
            $component->hydrateState();

            foreach ($component->getChildComponentContainers() as $container) {
                $container->hydrateState();
            }
        }

        return $this;
    }

    public function statePath(string $path): static
    {
        $this->statePath = $path;

        return $this;
    }

    public function getStatePath(): string
    {
        $pathComponents = [];

        if ($parentComponentStatePath = $this->getParentComponent()?->getStatePath()) {
            $pathComponents[] = $parentComponentStatePath;
        }

        if (($statePath = $this->statePath) !== null) {
            $pathComponents[] = $statePath;
        }

        return implode('.', $pathComponents);
    }

    public function getValidState(): array
    {
        $state = $this->validate();

        return $this->dehydrateState($state);
    }
}
