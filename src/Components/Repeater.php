<?php

namespace Filament\Forms2\Components;

use Filament\Forms2\ComponentContainer;
use Illuminate\Support\Str;

class Repeater extends Field
{
    protected static string $view = 'forms2::components.repeater';

    public function setUp(): void
    {
        parent::setUp();

        $this->registerListeners([
            'repeater.addItem' => [
                function (string $statePath): void {
                    if ($statePath !== $this->getStatePath()) {
                        return;
                    }

                    $livewire = $this->getLivewire();

                    $state = $this->getNormalisedState();
                    $state[Str::orderedUuid()->toString()] = [];

                    data_set($livewire, $statePath, $state);
                },
            ],
        ]);
    }

    public function getChildComponentContainers(): array
    {
        return collect($this->getNormalisedState())
            ->map(function ($item, $index): ComponentContainer {
                return $this
                    ->getChildComponentContainer()
                    ->getClone()
                    ->statePath($index);
            })->toArray();
    }

    public function getNormalisedState(): array
    {
        if (! is_array($state = $this->getState())) {
            return [];
        }

        return array_filter($state, fn ($item) => is_array($item));
    }
}
