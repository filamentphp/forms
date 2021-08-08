<?php

namespace Filament\Forms2\Concerns;

use Filament\Forms2\Components\FileUpload;
use Filament\Forms2\Components\MultipleFileUpload;
use Illuminate\Database\Eloquent\Model;

trait SupportsFileUploadFields
{
    public ?Model $fileUploadModel = null;

    public function fileUploadModel(Model $model): static
    {
        $this->fileUploadModel = $model;

        return $this;
    }

    public function getUploadedFileUrl(string $statePath): ?string
    {
        foreach ($this->getComponents() as $component) {
            if ($component instanceof FileUpload && $component->getStatePath() === $statePath) {
                return $component->getUploadedFileUrl();
            }

            foreach ($component->getChildComponentContainers() as $container) {
                if ($url = $container->getUploadedFileUrl($statePath)) {
                    return $url;
                }
            }
        }

        return null;
    }

    public function removeUploadedFile(string $statePath): bool
    {
        foreach ($this->getComponents() as $component) {
            if ($component instanceof FileUpload && $component->getStatePath() === $statePath) {
                $component->removeUploadedFile();

                return true;
            }

            foreach ($component->getChildComponentContainers() as $container) {
                if ($container->removeUploadedFile($statePath)) {
                    return true;
                }
            }
        }

        return false;
    }

    public function saveUploadedFiles(): void
    {
        foreach ($this->getComponents() as $component) {
            if ($component instanceof FileUpload) {
                $component->saveUploadedFile();
            }

            foreach ($component->getChildComponentContainers() as $container) {
                $container->saveUploadedFiles();
            }
        }
    }

    public function getFileUploadModel(): ?Model
    {
        if ($model = $this->fileUploadModel) {
            return $model;
        }

        $parentComponent = $this->getParentComponent();

        if (! $parentComponent) {
            return null;
        }

        if (
            $parentComponent instanceof MultipleFileUpload &&
            ($model = $parentComponent->getModel())
        ) {
            return $model;
        }

        return $parentComponent->getContainer()->getFileUploadModel();
    }
}
