<?php

namespace Filament\Forms2\Components\Concerns;

use Illuminate\Database\Eloquent\Model;

trait BelongsToModel
{
    protected $model = null;

    public function model(Model | callable $model): static
    {
        $this->model = $model;

        return $this;
    }

    public function saveRelationships(): void
    {
    }

    public function getModel(): ?Model
    {
        if ($model = $this->evaluate($this->model)) {
            return $model;
        }

        return $this->getContainer()->getModel();
    }
}
