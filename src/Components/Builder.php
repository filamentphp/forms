<?php

namespace Filament\Forms2\Components;

use Filament\Forms2\ComponentContainer;
use Filament\Forms2\Components\Builder\Block;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class Builder extends Field
{
    protected string $view = 'forms2::components.builder';

    protected function setUp(): void
    {
        parent::setUp();

        $this->registerListeners([
            'builder.createItem' => [
                function (string $statePath, string $block, ?string $afterUuid = null): void {
                    if ($statePath !== $this->getStatePath()) {
                        return;
                    }

                    $livewire = $this->getLivewire();

                    $newUuid = (string) Str::uuid();
                    $newItem = [
                        'type' => $block,
                        'data' => [],
                    ];

                    if ($afterUuid) {
                        $newItems = [];

                        foreach ($this->getNormalisedState() as $uuid => $item) {
                            $newItems[$uuid] = $item;

                            if ($uuid === $afterUuid) {
                                $newItems[$newUuid] = $newItem;
                            }
                        }

                        data_set($livewire, $statePath, $newItems);
                    } else {
                        data_set($livewire, "{$statePath}.{$newUuid}", $newItem);
                    }

                    $this->hydrateDefaultItemState($newUuid);
                },
            ],
            'builder.deleteItem' => [
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
            'builder.moveItemDown' => [
                function (string $statePath, string $uuidToMoveDown): void {
                    if ($statePath !== $this->getStatePath()) {
                        return;
                    }

                    $items = Arr::moveElementAfter($this->getNormalisedState(), $uuidToMoveDown);

                    $livewire = $this->getLivewire();
                    data_set($livewire, $statePath, $items);
                },
            ],
            'builder.moveItemUp' => [
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

    public function blocks(array $blocks): static
    {
        $this->childComponents($blocks);

        return $this;
    }

    public function getBlock($name): ?Block
    {
        return Arr::first(
            $this->getBlocks(),
            fn (Block $block) => $block->getName() === $name,
        );
    }

    public function getBlocks(): array
    {
        return $this->getChildComponentContainer()->getComponents();
    }

    public function getChildComponentContainers(): array
    {
        return collect($this->getNormalisedState())
            ->map(function ($item, $index): ComponentContainer {
                return $this->getBlock($item['type'])
                    ->getChildComponentContainer()
                    ->getClone()
                    ->statePath("{$index}.data");
            })->toArray();
    }

    public function getNormalisedState(): array
    {
        if (! is_array($state = $this->getState())) {
            return [];
        }

        return array_filter(
            $state,
            fn ($item) => is_array($item) && $this->hasBlock($item['type'] ?? null),
        );
    }

    public function hasBlock($name): bool
    {
        return (bool) $this->getBlock($name);
    }

    protected function hydrateDefaultItemState(string $uuid): void
    {
        $this->getChildComponentContainers()[$uuid]->hydrateDefaultState();
    }
}
