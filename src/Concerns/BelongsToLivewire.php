<?php

namespace Filament\Forms2\Concerns;

use Filament\Forms2\Contracts\HasForms;

trait BelongsToLivewire
{
    protected HasForms $livewire;

    public function livewire(HasForms $livewire): static
    {
        $this->livewire = $livewire;

        return $this;
    }

    public function getLivewire(): HasForms
    {
        return $this->livewire;
    }
}
