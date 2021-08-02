<?php

namespace Filament\Forms2\Contracts;

interface HasForms
{
    public function dispatchFormEvent(...$args): void;

    public function getSelectSearchResults(string $statePath, string $query): array;

    public function getUploadedFileUrl(string $statePath): ?string;

    public function removeUploadedFile(string $statePath): void;

    public function validate(?array $rules = null, array $messages = [], array $attributes = []);
}
