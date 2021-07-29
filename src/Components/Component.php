<?php

namespace Filament\Forms2\Components;

use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Traits\Macroable;
use Illuminate\Support\Traits\Tappable;
use Illuminate\View\Component as ViewComponent;

class Component extends ViewComponent implements Htmlable
{
    use Concerns\BelongsToContainer;
    use Concerns\CanBeDisabled;
    use Concerns\CanBeHidden;
    use Concerns\Cloneable;
    use Concerns\EvaluatesCallbacks;
    use Concerns\HasChildComponents;
    use Concerns\HasExtraAttributes;
    use Concerns\HasId;
    use Concerns\HasState;
    use Concerns\ListensToEvents;
    use Macroable;
    use Tappable;

    protected static string $view;

    public function setUp(): void
    {
    }

    public function toHtml(): string
    {
        return $this->render()->render();
    }

    public function render(): View
    {
        return view(static::$view, array_merge($this->data(), [
            'component' => $this,
        ]));
    }
}
