<?php

namespace Filament\Forms2\Contracts;

interface HasForms
{
    public function dispatchFormEvent(...$args): void;

    public function getUploadedFileUrl(string $statePath): ?string;

    public function removeUploadedFile(string $statePath): void;
}
