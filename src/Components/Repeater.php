<?php

namespace Filament\Forms2\Components;

use Filament\Forms2\ComponentContainer;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class Repeater extends Field
{
    protected string $view = 'forms2::components.repeater';

    protected function setUp(): void
    {
        parent::setUp();

        $this->registerListeners([
            'repeater.createItem' => [
                function (string $statePath): void {
                    if ($statePath !== $this->getStatePath()) {
                        return;
                    }

                    $newUuid = (string) Str::uuid();

                    $livewire = $this->getLivewire();
                    data_set($livewire, "{$statePath}.{$newUuid}", []);

                    $this->hydrateDefaultItemState($newUuid);
                },
            ],
            'repeater.deleteItem' => [
                function (string $statePath, string $uuidToDelete): void {
                    if ($statePath !== $this->getStatePath()) {
                        return;
                    }

                    $items = $this->getNormalisedState();

                    unset($items[$uuidToDelete]);

                    $livewire = $this->getLivewire();
                    data_set($livewire, $statePath, $items);
                },
            ],
            'repeater.moveItemDown' => [
                function (string $statePath, string $uuidToMoveDown): void {
                    if ($statePath !== $this->getStatePath()) {
                        return;
                    }

                    $items = Arr::moveElementAfter($this->getNormalisedState(), $uuidToMoveDown);

                    $livewire = $this->getLivewire();
                    data_set($livewire, $statePath, $items);
                },
            ],
            'repeater.moveItemUp' => [
                function (string $statePath, string $uuidToMoveUp): void {
                    if ($statePath !== $this->getStatePath()) {
                        return;
                    }

                    $items = Arr::moveElementBefore($this->getNormalisedState(), $uuidToMoveUp);

                    $livewire = $this->getLivewire();
                    data_set($livewire, $statePath, $items);
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

    protected function hydrateDefaultItemState(string $uuid): void
    {
        $this->getChildComponentContainers()[$uuid]->hydrateDefaultState();
    }
}
