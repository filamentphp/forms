<?php

namespace Filament\Forms2\Components;

class Field extends Component implements Contracts\CanBeValidated
{
    use Concerns\CanBeAutofocused;
    use Concerns\CanBeValidated;
    use Concerns\HasHelperText;
    use Concerns\HasHint;
    use Concerns\HasLabel;
    use Concerns\HasName;
    use Concerns\HasStateBindingModifiers;

    final public function __construct(string $name)
    {
        $this->name($name);
    }

    public static function make(string $name): static
    {
        return new static($name);
    }

    public function getId(): ?string
    {
        return parent::getId() ?? $this->getStatePath();
    }
}
