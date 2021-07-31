<?php

namespace Filament\Forms2\Concerns;

use Filament\Forms2\Components\FileUpload;
use Spatie\MediaLibrary\HasMedia;

trait SupportsFileUploadFields
{
    protected ?HasMedia $mediaLibraryModel = null;

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

    public function mediaLibraryModel(HasMedia $model): static
    {
        $this->mediaLibraryModel = $model;

        return $this;
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

    public function getMediaLibraryModel(): ?HasMedia
    {
        return $this->mediaLibraryModel ?? $this->getParentComponent()?->getContainer()->getMediaLibraryModel();
    }
}
