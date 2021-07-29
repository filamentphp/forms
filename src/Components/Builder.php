<?php

namespace Filament\Forms2\Components;

use Filament\Forms2\ComponentContainer;
use Illuminate\Support\Str;

class Builder extends Field
{
    protected static string $view = 'forms2::components.builder';

    public function setUp(): void
    {
        parent::setUp();

        $this->registerListeners([
            'builder.addItem' => [
                function (string $statePath, string $type): void {
                    if ($statePath !== $this->getStatePath()) {
                        return;
                    }

                    $livewire = $this->getLivewire();

                    $state = $this->getNormalisedState();
                    $state[Str::orderedUuid()->toString()] = [
                        'type' => $type,
                        'data' => [],
                    ];

                    data_set($livewire, $statePath, $state);
                },
            ],
        ]);
    }

    public function blocks(array $blocks): static
    {
        $this->childComponents($blocks);

        return $this;
    }

    public function getBlocks(): array
    {
        return $this->getChildComponents();
    }

    public function getChildComponentContainers(): array
    {
        return collect($this->getNormalisedState())
            ->map(function ($item, $index): ComponentContainer {
                return $this
                    ->getChildComponentContainer()
                    ->getComponents()[$item['type']]
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
            fn ($item) => is_array($item) && $this->hasBlockType($item['type'] ?? null),
        );
    }

    public function hasBlockType($type): bool
    {
        return array_key_exists($type, $this->getBlocks());
    }
}
