<?php

namespace Filament\Forms2\Components\Contracts;

interface CanBeValidated
{
    public function getStatePath(): string;

    public function getValidationRules(): array;
}
