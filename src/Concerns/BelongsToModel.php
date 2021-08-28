<?php

namespace Filament\Forms\Concerns;

use Illuminate\Database\Eloquent\Model;

trait BelongsToModel
{
    public ?Model $model = null;

    public function model(Model $model): static
    {
        $this->model = $model;

        return $this;
    }

    public function saveRelationships(): void
    {
        foreach ($this->getComponents() as $component) {
            if ($component->getModel()) {
                $component->saveRelationships();
            }

            foreach ($component->getChildComponentContainers() as $container) {
                $container->saveRelationships();
            }
        }
    }

    public function getModel(): Model | string | null
    {
        if ($model = $this->model) {
            return $model;
        }

        return $this->getParentComponent()?->getModel();
    }
}
