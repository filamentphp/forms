<?php

namespace Filament\Forms2\Concerns;

use Filament\Forms2\Components\FileUpload;
use Filament\Forms2\Components\MultipleFileUpload;
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

    public function getModel(): ?Model
    {
        if ($model = $this->model) {
            return $model;
        }

        return $this->getParentComponent()?->getModel();
    }
}