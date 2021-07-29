<?php

namespace Filament\Forms2\Components;

class TextInput extends Field
{
    use Concerns\HasPlaceholder;

    protected static string $view = 'forms2::components.text-input';

    protected $autocomplete = null;

    protected $isEmail = false;

    protected $isNumeric = false;

    protected $isPassword = false;

    protected $isTel = false;

    protected $isUrl = false;

    protected $maxLength = null;

    protected $minLength = null;

    protected $postfixLabel = null;

    protected $prefixLabel = null;

    protected $type = null;

    public function autocomplete(string | callable $autocomplete = 'on'): static
    {
        $this->autocomplete = $autocomplete;

        return $this;
    }

    public function currentPassword(bool | callable $condition = true): static
    {
        $this->addValidationRule('current_password', $condition);

        return $this;
    }

    public function disableAutocomplete(bool | callable $condition = true): static
    {
        $this->autocomplete(function () use ($condition): ?string {
            return $this->evaluate($condition) ? 'off' : null;
        });

        return $this;
    }

    public function email(bool | callable $condition = true): static
    {
        $this->isEmail = $condition;

        $this->addValidationRule('email', $condition);

        return $this;
    }

    public function maxValue($value): static
    {
        $this->addValidationRule(function () use ($value): string {
            $value = $this->evaluate($value);

            return "max:{$value}";
        });

        return $this;
    }

    public function maxLength(int | callable $length): static
    {
        $this->maxLength = $length;

        $this->addValidationRule(function (): string {
            $length = $this->getMaxLength();

            return "max:{$length}";
        });

        return $this;
    }

    public function minValue($value): static
    {
        $this->addValidationRule(function () use ($value): string {
            $value = $this->evaluate($value);

            return "min:{$value}";
        });

        return $this;
    }

    public function minLength(int | callable $length): static
    {
        $this->minLength = $length;

        $this->addValidationRule(function (): string {
            $length = $this->getMaxLength();

            return "min:{$length}";
        });

        return $this;
    }

    public function numeric(bool | callable $condition = true): static
    {
        $this->isNumeric = $condition;

        $this->addValidationRule('numeric', $condition);

        return $this;
    }

    public function password(bool | callable $condition = true): static
    {
        $this->isPassword = $condition;

        return $this;
    }

    public function prefix(string | callable $label): static
    {
        $this->prefixLabel = $label;

        return $this;
    }

    public function postfix(string | callable $label): static
    {
        $this->postfixLabel = $label;

        return $this;
    }

    public function tel(bool | callable $condition = true): static
    {
        $this->isTel = $condition;

        return $this;
    }

    public function type(string | callable $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function url(bool | callable $condition = true): static
    {
        $this->isUrl = $condition;

        $this->addValidationRule('url', $condition);

        return $this;
    }

    public function getAutocomplete(): ?string
    {
        if (! ($autocomplete = $this->evaluate($this->autocomplete))) {
            return null;
        }

        return $autocomplete;
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

    public function getPrefixLabel(): ?string
    {
        if (! ($label = $this->evaluate($this->prefixLabel))) {
            return null;
        }

        return $label;
    }

    public function getPostfixLabel(): ?string
    {
        if (! ($label = $this->evaluate($this->postfixLabel))) {
            return null;
        }

        return $label;
    }

    public function getType(): string
    {
        if ($type = $this->evaluate($this->type)) {
            return $type;
        } elseif ($this->isEmail()) {
            return 'email';
        } elseif ($this->isNumeric()) {
            return 'number';
        } elseif ($this->isPassword()) {
            return 'password';
        } elseif ($this->isTel()) {
            return 'tel';
        } elseif ($this->isUrl()) {
            return 'url';
        }

        return 'text';
    }

    public function isEmail(): bool
    {
        return (bool) $this->evaluate($this->isEmail);
    }

    public function isNumeric(): bool
    {
        return (bool) $this->evaluate($this->isNumeric);
    }

    public function isPassword(): bool
    {
        return (bool) $this->evaluate($this->isPassword);
    }

    public function isTel(): bool
    {
        return (bool) $this->evaluate($this->isTel);
    }

    public function isUrl(): bool
    {
        return (bool) $this->evaluate($this->isUrl);
    }
}
