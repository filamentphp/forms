<?php

namespace Filament\Forms\Components\Builder\StateCasts;

use Filament\Forms\Components\Builder;
use Filament\Schemas\Components\StateCasts\Contracts\StateCast;

class BuilderStateCast implements StateCast
{
    public function __construct(
        protected Builder $builder,
    ) {}

    /**
     * @return array<mixed>
     */
    public function get(mixed $state): array
    {
        if (! is_array($state)) {
            return [];
        }

        if (blank($state)) {
            return [];
        }

        return array_values($state);
    }

    /**
     * @return array<mixed>
     */
    public function set(mixed $state): array
    {
        if (! is_array($state)) {
            return [];
        }

        if (blank($state)) {
            return [];
        }

        $items = [];

        foreach ($state as $itemData) {
            if ($key = $this->builder->generateUuid()) {
                $items[$key] = $itemData;
            } else {
                $items[] = $itemData;
            }
        }

        return $items;
    }
}
