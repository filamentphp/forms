<?php

namespace Filament\Forms2\Components;

class Field extends Component implements Contracts\CanBeValidated
{
    use Concerns\CanBeAutofocused;
    use Concerns\CanBeValidated;
    use Concerns\HasHelperText;
    use Concerns\HasHint;
    use Concerns\HasLabel;
    use Concerns\HasStateBindingModifiers;

    protected string $name;

    final public function __construct(string $name)
    {
        $this->name($name);
    }

    public static function make(string $name): static
    {
        $static = new static($name);
        $static->setUp();

        return $static;
    }

    public function setUp(): void
    {
    }

    public function name(string $name): static
    {
        $this->name = $name;

        $this->statePath($this->getName());

        return $this;
    }

    public function getId(): string
    {
        return parent::getId() ?? $this->getStatePath();
    }

    public function getName(): string
    {
        return $this->name;
    }
}
