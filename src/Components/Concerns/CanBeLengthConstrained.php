<?php

namespace Filament\Forms2\Components\Concerns;

trait CanBeLengthConstrained
{
    protected $maxLength = null;

    protected $minLength = null;

    public function maxLength(int | callable $length): static
    {
        $this->maxLength = $length;

        $this->addValidationRule(function (): string {
            $length = $this->getMaxLength();

            return "max:{$length}";
        });

        return $this;
    }

    public function minLength(int | callable $length): static
    {
        $this->minLength = $length;

        $this->addValidationRule(function (): string {
            $length = $this->getMinLength();

            return "min:{$length}";
        });

        return $this;
    }

    public function getMaxLength(): ?int
    {
        if (! ($length = $this->evaluate($this->maxLength))) {
            return null;
        }

        return $length;
    }

    public function getMinLength(): ?int
    {
        if (! ($length = $this->evaluate($this->minLength))) {
            return null;
        }

        return $length;
    }
}
