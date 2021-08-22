<?php

namespace Filament\Forms\Components\Concerns;

use SplFileInfo;

trait HasFileAttachments
{
    protected $fileAttachmentsDirectory = null;

    protected $fileAttachmentsDiskName = null;

    protected $saveUploadedFileAttachmentsUsing = null;

    protected $fileAttachmentsVisibility = 'public';

    public function fileAttachmentsDirectory(string | callable $directory): static
    {
        $this->fileAttachmentsDirectory = $directory;

        return $this;
    }

    public function fileAttachmentsDisk($name): static
    {
        $this->fileAttachmentsDiskName = $name;

        return $this;
    }

    public function saveUploadedFileAttachment(SplFileInfo $attachment): ?string
    {
        if ($callback = $this->saveUploadedFileAttachmentsUsing) {
            $url = $this->evaluate($callback, [
                'file' => $attachment,
            ]);
        } else {
            $url = $this->handleFileAttachmentUpload($attachment);
        }

        return $url;
    }

    public function fileAttachmentsVisibility(string | callable $visibility): static
    {
        $this->fileAttachmentsVisibility = $visibility;

        return $this;
    }

    public function getFileAttachmentsDirectory(): ?string
    {
        return $this->evaluate($this->fileAttachmentsDirectory);
    }

    public function getFileAttachmentsDiskName(): string
    {
        return $this->evaluate($this->fileAttachmentsDiskName) ?? config('forms.default_filesystem_disk');
    }

    public function getFileAttachmentsVisibility(): string
    {
        return $this->evaluate($this->fileAttachmentsVisibility);
    }

    protected function handleFileAttachmentUpload($file)
    {
        $storeMethod = $this->getFileAttachmentsVisibility() === 'public' ? 'storePublicly' : 'store';

        return $file->{$storeMethod}($this->getFileAttachmentsDirectory(), $this->getFileAttachmentsDiskName());
    }
}