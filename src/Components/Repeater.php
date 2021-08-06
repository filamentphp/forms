<?php

namespace Filament\Forms2\Components;

use Filament\Forms2\ComponentContainer;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class Repeater extends Field
{
    protected static string $view = 'forms2::components.repeater';

    public function setUp(): void
    {
        parent::setUp();

        $this->registerListeners([
            'repeater.createItem' => [
                function (string $statePath): void {
                    if ($statePath !== $this->getStatePath()) {
                        return;
                    }

                    $livewire = $this->getLivewire();

                    $uuid = Str::uuid();

                    data_set($livewire, "{$statePath}.{$uuid}", []);
                },
            ],
            'repeater.deleteItem' => [
                function (string $statePath, string $uuidToDelete): void {
                    if ($statePath !== $this->getStatePath()) {
                        return;
                    }

                    $livewire = $this->getLivewire();

                    $items = Arr::except($this->getNormalisedState(), $uuidToDelete);

                    data_set($livewire, $statePath, $items);
                },
            ],
            'repeater.moveItemDown' => [
                function (string $statePath, string $uuidToMoveDown): void {
                    if ($statePath !== $this->getStatePath()) {
                        return;
                    }

                    $livewire = $this->getLivewire();

                    $items = $this->getNormalisedState();

                    $uuids = array_keys($items);
                    $indexToMoveDown = array_search($uuidToMoveDown, $uuids);
                    $uuidToMoveUp = $uuids[$indexToMoveDown + 1];

                    $uuids[$indexToMoveDown + 1] = $uuidToMoveDown;
                    $uuids[$indexToMoveDown] = $uuidToMoveUp;

                    $newItems = [];

                    foreach ($uuids as $uuid) {
                        $newItems[$uuid] = $items[$uuid];
                    }

                    data_set($livewire, $statePath, $newItems);
                },
            ],
            'repeater.moveItemUp' => [
                function (string $statePath, string $uuidToMoveUp): void {
                    if ($statePath !== $this->getStatePath()) {
                        return;
                    }

                    $livewire = $this->getLivewire();

                    $items = $this->getNormalisedState();

                    $uuids = array_keys($items);
                    $indexToMoveUp = array_search($uuidToMoveUp, $uuids);
                    $uuidToMoveDown = $uuids[$indexToMoveUp - 1];

                    $uuids[$indexToMoveUp - 1] = $uuidToMoveUp;
                    $uuids[$indexToMoveUp] = $uuidToMoveDown;

                    $newItems = [];

                    foreach ($uuids as $uuid) {
                        $newItems[$uuid] = $items[$uuid];
                    }

                    data_set($livewire, $statePath, $newItems);
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
