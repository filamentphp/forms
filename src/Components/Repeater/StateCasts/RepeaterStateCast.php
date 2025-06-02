<?php

namespace Filament\Forms\Components\Repeater\StateCasts;

use Filament\Forms\Components\Repeater;
use Filament\Schemas\Components\StateCasts\Contracts\StateCast;
use Illuminate\Support\Arr;

class RepeaterStateCast implements StateCast
{
    public function __construct(
        protected Repeater $repeater,
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

        $simpleField = $this->repeater->getSimpleField();

        if ($simpleField && is_array(Arr::first($state))) {
            return Arr::pluck($state, $simpleField->getName());
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

        $simpleFieldName = $this->repeater->getSimpleField()?->getName();

        foreach ($state as $itemData) {
            if (filled($simpleFieldName) && (! is_array($itemData))) {
                $itemData = [
                    $simpleFieldName => $itemData,
                ];
            }

            if ($key = $this->repeater->generateUuid()) {
                $items[$key] = $itemData;
            } else {
                $items[] = $itemData;
            }
        }

        return $items;
    }
}
