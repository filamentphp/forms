<?php

namespace Filament\Forms2\Concerns;

use Filament\Forms2\Components\Select;

trait SupportsSelectFields
{
    public function getSelectSearchResults(string $statePath, string $query): array
    {
        foreach ($this->getComponents() as $component) {
            if ($component instanceof Select && $component->getStatePath() === $statePath) {
                return $component->getSearchResults($query);
            }

            foreach ($component->getChildComponentContainers() as $container) {
                if ($results = $container->getSelectSearchResults($statePath, $query)) {
                    return $results;
                }
            }
        }
    }
}