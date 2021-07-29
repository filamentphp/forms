<?php

namespace Filament\Forms2\Components\Concerns;

use Filament\Forms2\ComponentContainer;
use Filament\Forms2\Contracts\HasForms;

trait BelongsToContainer
{
    protected ComponentContainer $container;

    public function container(ComponentContainer $container): static
    {
        $this->container = $container;

        return $this;
    }

    public function getContainer(): ComponentContainer
    {
        return $this->container;
    }

    public function getLivewire(): HasForms
    {
        return $this->getContainer()->getLivewire();
    }
}
