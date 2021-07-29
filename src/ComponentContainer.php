<?php

namespace Filament\Forms2;

use Filament\Forms2\Contracts\HasForms;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component as ViewComponent;

class ComponentContainer extends ViewComponent implements Htmlable
{
    use Concerns\BelongsToLivewire;
    use Concerns\BelongsToParentComponent;
    use Concerns\CanBeDisabled;
    use Concerns\CanBeValidated;
    use Concerns\Cloneable;
    use Concerns\HasComponents;
    use Concerns\HasState;
    use Concerns\ListensToEvents;
    use Concerns\SupportsFileUploadFields;

    public static function make(HasForms $livewire): static
    {
        $static = new static();
        $static->livewire($livewire);

        return $static;
    }

    public function getClone(): static
    {
        $clone = clone $this;
        $clone->cloneComponents();

        return $clone;
    }

    public function toHtml(): string
    {
        return $this->render()->render();
    }

    public function render(): View
    {
        return view('forms2::component-container', array_merge($this->data(), [
            'container' => $this,
        ]));
    }
}
