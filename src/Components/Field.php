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

    public static function make(string $name): static
    {
        $static = new static();
        $static->name($name);

        return $static;
    }

    public function getId(): ?string
    {
        return parent::getId() ?? $this->getStatePath();
    }
}
