<?php

namespace Filament\Forms2\Components\Contracts;

interface HasValidationRules
{
    public function getStatePath(): string;

    public function getValidationRules(): array;
}
