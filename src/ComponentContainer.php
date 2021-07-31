<?php

namespace Filament\Forms2;

use Filament\Forms2\Contracts\HasForms;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Traits\Macroable;
use Illuminate\Support\Traits\Tappable;
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
    use Macroable;
    use Tappable;

    final public function __construct(HasForms $livewire)
    {
        $this->livewire($livewire);
    }

    public static function make(HasForms $livewire): static
    {
        return new static($livewire);
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
