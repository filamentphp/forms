<?php

namespace Filament\Forms2\Components\Builder;

use Filament\Forms2\Components\Component;
use Filament\Forms2\Components\Concerns;

class Block extends Component
{
    use Concerns\HasLabel;

    protected static string $view = 'forms2::components.builder.block';

    protected $icon;

    protected string $name;

    final public function __construct(string $name)
    {
        $this->name($name);
    }

    public static function make(string $name): static
    {
        return new static($name);
    }

    public function icon(string | callable $icon): static
    {
        $this->icon = $icon;

        return $this;
    }

    public function name(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getIcon(): ?string
    {
        return $this->evaluate($this->icon);
    }

    public function getName(): string
    {
        return $this->name;
    }
}
