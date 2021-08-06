<?php

namespace Filament\Forms2\Components;

class Toggle extends Field
{
    use Concerns\CanBeAccepted;
    use Concerns\CanBeInline;

    protected static string $view = 'forms2::components.toggle';

    protected $offIcon = null;

    protected $onIcon = null;

    public function setUp(): void
    {
        $this->default(false);

        $this->inline();
    }

    public function offIcon(string | callable $icon): static
    {
        $this->offIcon = $icon;

        return $this;
    }

    public function onIcon(string | callable $icon): static
    {
        $this->onIcon = $icon;

        return $this;
    }

    public function getOffIcon(): ?string
    {
        return $this->evaluate($this->offIcon);
    }

    public function getOnIcon(): ?string
    {
        return $this->evaluate($this->onIcon);
    }

    public function hasOffIcon(): bool
    {
        return $this->getOffIcon() !== null;
    }

    public function hasOnIcon(): bool
    {
        return $this->getOnIcon() !== null;
    }
}
