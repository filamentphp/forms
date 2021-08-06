<?php

namespace Filament\Forms2\Components\Concerns;

use Filament\Forms2\Components\Component;
use Filament\Forms2\Components\Contracts\CanConcealComponents;

trait CanBeConcealed
{
    public function getConcealingComponent(): ?Component
    {
        $parentComponent = $this->getContainer()->getParentComponent();

        if (! $parentComponent) {
            return null;
        }

        if (! $parentComponent instanceof CanConcealComponents) {
            return $parentComponent->getConcealingComponent();
        }

        return $parentComponent;
    }
}
