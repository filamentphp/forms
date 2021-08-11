<?php

namespace Filament\Forms2\Components\Concerns;

use Filament\Forms2\Components\Component;

trait HasState
{
    protected $afterStateUpdated = null;

    protected $beforeStateDehydrated = null;

    protected $defaultState = null;

    protected $dehydrateStateUsing = null;

    protected $hydrateStateUsing = null;

    protected $isDehydrated = true;

    protected ?string $statePath = null;

    public function afterStateUpdated(?callable $callback): static
    {
        $this->afterStateUpdated = $callback;

        return $this;
    }

    public function beforeStateDehydrated(?callable $callback): static
    {
        $this->beforeStateDehydrated = $callback;

        return $this;
    }

    public function callAfterStateUpdated(): static
    {
        if ($callback = $this->afterStateUpdated) {
            $this->evaluate($callback, [
                'setState' => $this->getSetStateCallback(),
            ]);
        }

        return $this;
    }

    public function callBeforeStateDehydrated(): static
    {
        if ($callback = $this->beforeStateDehydrated) {
            $this->evaluate($callback, [
                'setState' => $this->getSetStateCallback(),
            ]);
        }

        return $this;
    }

    public function default($state): static
    {
        $this->defaultState = $state;

        return $this;
    }

    public function dehydrated(bool | callable $condition = true): static
    {
        $this->isDehydrated = $condition;

        return $this;
    }

    public function dehydrateState()
    {
        if ($callback = $this->dehydrateStateUsing) {
            return $this->evaluate($callback);
        }

        return $this->getState();
    }

    public function dehydrateStateUsing(?callable $callback): static
    {
        $this->dehydrateStateUsing = $callback;

        return $this;
    }

    public function hydrateDefaultState(): static
    {
        $state = $this->getDefaultState();

        if ($callback = $this->hydrateStateUsing) {
            $state = $this->evaluate($callback, [
                'state' => $state,
            ]);
        }

        $this->state($state);

        return $this;
    }

    public function hydrateState(): static
    {
        if ($callback = $this->hydrateStateUsing) {
            $this->state($callback);
        }

        return $this;
    }

    public function hydrateStateUsing(?callable $callback): static
    {
        $this->hydrateStateUsing = $callback;

        return $this;
    }

    public function state($state): static
    {
        $livewire = $this->getLivewire();

        data_set($livewire, $this->getStatePath(), $this->evaluate($state));

        return $this;
    }

    public function statePath(string $path): static
    {
        $this->statePath = $path;

        return $this;
    }

    public function getDefaultState()
    {
        return $this->evaluate($this->defaultState);
    }

    public function getState()
    {
        return data_get($this->getLivewire(), $this->getStatePath());
    }

    public function getStatePath(bool $absolute = true): string
    {
        $pathComponents = [];

        if ($absolute && ($containerStatePath = $this->getContainer()->getStatePath())) {
            $pathComponents[] = $containerStatePath;
        }

        if (($statePath = $this->statePath) !== null) {
            $pathComponents[] = $statePath;
        }

        return implode('.', $pathComponents);
    }

    public function isDehydrated(): bool
    {
        return (bool) $this->evaluate($this->isDehydrated);
    }

    protected function getSetStateCallback(): callable
    {
        return function ($statePath, $state) {
            if ($statePath instanceof Component) {
                $statePath = $statePath->getStatePath();
            } elseif ($containerStatePath = $this->getContainer()->getStatePath()) {
                $statePath = "{$containerStatePath}.{$statePath}";
            }

            $livewire = $this->getLivewire();
            data_set($livewire, $statePath, $this->evaluate($state));

            return $state;
        };
    }
}
