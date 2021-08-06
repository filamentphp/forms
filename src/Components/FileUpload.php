<?php

namespace Filament\Forms2\Components;

use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Facades\Storage;
use League\Flysystem\AwsS3v3\AwsS3Adapter;
use Livewire\TemporaryUploadedFile;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use SplFileInfo;

class FileUpload extends Field
{
    use Concerns\HasPlaceholder;

    protected string $view = 'forms2::components.file-upload';

    protected $acceptedFileTypes = [];

    protected $deleteUploadedFileUsing = null;

    protected $directory = null;

    protected $diskName = null;

    protected $getUploadedFileUrlUsing = null;

    protected $imageCropAspectRatio = null;

    protected $imagePreviewHeight = null;

    protected $imageResizeTargetHeight = null;

    protected $imageResizeTargetWidth = null;

    protected $isAvatar = false;

    protected $loadingIndicatorPosition = 'right';

    protected $maxSize = null;

    protected $mediaLibraryCollection = null;

    protected $mediaLibraryModel = null;

    protected $minSize = null;

    protected $panelAspectRatio = null;

    protected $panelLayout = null;

    protected $removeUploadButtonPosition = 'left';

    protected $saveUploadedFileUsing = null;

    protected $shouldUploadedFileBeDeletedOnRemoval = false;

    protected $uploadButtonPosition = 'right';

    protected $uploadProgressIndicatorPosition = 'right';

    protected $visibility = 'public';

    public function setUp(): void
    {
        parent::setUp();

        $this->beforeStateDehydrated(function ($setState, $state) {
            if (! ($state instanceof TemporaryUploadedFile)) {
                return;
            }

            $setState($this, $this->saveUploadedFile());
        });

        $this->dehydrated(function ($state) {
            if (! ($state instanceof TemporaryUploadedFile)) {
                return false;
            }

            if ($this->usesMediaLibrary()) {
                return false;
            }

            return true;
        });

        $this->hydrateStateUsing(function () {
            return $this->getUploadedFile();
        });
    }

    public function acceptedFileTypes(array | callable $types): static
    {
        $this->acceptedFileTypes = $types;

        $this->addValidationRule(function () {
            $types = implode(',', $this->getAcceptedFileTypes());

            return "mimetypes:{$types}";
        }, function () {
            return $this->hasFileObjectState() && count($this->getAcceptedFileTypes());
        });

        return $this;
    }

    public function avatar(): static
    {
        $this->isAvatar = true;

        $this->image();
        $this->imageCropAspectRatio('1:1');
        $this->imageResizeTargetHeight('500');
        $this->imageResizeTargetWidth('500');
        $this->loadingIndicatorPosition('center bottom');
        $this->panelLayout('compact circle');
        $this->removeUploadButtonPosition('center bottom');
        $this->uploadButtonPosition('center bottom');
        $this->uploadProgressIndicatorPosition('center bottom');

        return $this;
    }

    public function deleteUploadedFile(): static
    {
        $file = $this->getState();

        if ($callback = $this->deleteUploadedFileUsing) {
            $this->evaluate($callback, [
                'file' => $file,
            ]);
        } elseif ($this->usesMediaLibrary()) {
            Media::findByUuid($file)?->delete();
        } elseif ($this->shouldUploadedFileBeDeletedOnRemoval()) {
            $this->getDisk()->delete($file);
        }

        return $this;
    }

    public function deleteUploadedFileUsing(callable $callback): static
    {
        $this->deleteUploadedFileUsing = $callback;

        return $this;
    }

    public function directory(string | callable $directory): static
    {
        $this->directory = $directory;

        return $this;
    }

    public function disk($name): static
    {
        $this->diskName = $name;

        return $this;
    }

    public function getUploadedFile()
    {
        if (! ($state = $this->getState())) {
            if ($this->usesMediaLibrary()) {
                $state = $this->getUploadedFileFromMediaLibrary();
            }
        }

        return $state;
    }

    public function getUploadedFileFromMediaLibrary(): ?string
    {
        if (! ($model = $this->getMediaLibraryModel())) {
            return null;
        }

        $media = $model
            ->getMedia($this->getMediaLibraryCollection())
            ->first();

        if (! $media) {
            return null;
        }

        return $media->uuid;
    }

    public function getUploadedFileUrl(): ?string
    {
        if ($callback = $this->getUploadedFileUrlUsing) {
            return $this->evaluate($callback);
        }

        if ($this->usesMediaLibrary()) {
            return $this->getUploadedFileUrlFromMediaLibrary();
        }

        return $this->getUploadedFileUrlFromStorage();
    }

    public function getUploadedFileUrlFromMediaLibrary(): ?string
    {
        if (! $this->getMediaLibraryModel()) {
            return null;
        }

        if (! ($mediaUuid = $this->getState())) {
            return null;
        }

        if ($mediaUuid instanceof SplFileInfo) {
            return null;
        }

        return Media::findByUuid($mediaUuid)?->getUrl();
    }

    public function getUploadedFileUrlFromStorage(): ?string
    {
        if (! ($path = $this->getState())) {
            return null;
        }

        $storage = $this->getDisk();

        if (
            $storage->getDriver()->getAdapter() instanceof AwsS3Adapter &&
            $storage->getVisibility($path) === 'private'
        ) {
            return $storage->temporaryUrl(
                $path,
                now()->addMinutes(5),
            );
        }

        return $storage->url($path);
    }

    public function getUploadedFileUrlUsing(callable $callback): static
    {
        $this->getUploadedFileUrlUsing = $callback;

        return $this;
    }

    public function image(): static
    {
        $this->acceptedFileTypes([
            'image/*',
        ]);

        return $this;
    }

    public function imageCropAspectRatio(string | callable $ratio): static
    {
        $this->imageCropAspectRatio = $ratio;

        return $this;
    }

    public function imagePreviewHeight(string | callable $height): static
    {
        $this->imagePreviewHeight = $height;

        return $this;
    }

    public function imageResizeTargetHeight(string | callable $height): static
    {
        $this->imageResizeTargetHeight = $height;

        return $this;
    }

    public function imageResizeTargetWidth(string | callable $width): static
    {
        $this->imageResizeTargetWidth = $width;

        return $this;
    }

    public function loadingIndicatorPosition(string | callable $position): static
    {
        $this->loadingIndicatorPosition = $position;

        return $this;
    }

    public function maxSize(int | callable $size): static
    {
        $this->maxSize = $size;

        $this->addValidationRule(function (): string {
            $size = $this->getMaxSize();

            return "max:{$size}";
        }, function () {
            return $this->hasFileObjectState();
        });

        return $this;
    }

    public function mediaLibraryCollection(string | callable $collection): static
    {
        $this->mediaLibraryCollection = $collection;

        return $this;
    }

    public function mediaLibraryModel(HasMedia | callable $model): static
    {
        $this->mediaLibraryModel = $model;

        return $this;
    }

    public function minSize(int | callable $size): static
    {
        $this->minSize = $size;

        $this->addValidationRule(function (): string {
            $size = $this->getMaxSize();

            return "min:{$size}";
        }, function () {
            return $this->hasFileObjectState();
        });

        return $this;
    }

    public function panelAspectRatio(string | callable $ratio): static
    {
        $this->panelAspectRatio = $ratio;

        return $this;
    }

    public function panelLayout(string | callable $layout): static
    {
        $this->panelLayout = $layout;

        return $this;
    }

    public function removeUploadButtonPosition(string | callable $position): static
    {
        $this->removeUploadButtonPosition = $position;

        return $this;
    }

    public function removeUploadedFile(): static
    {
        if (! $this->getState()) {
            return $this;
        }

        $this->deleteUploadedFile();

        $livewire = $this->getLivewire();
        data_set($livewire, $this->getStatePath(), null);

        return $this;
    }

    public function saveUploadedFile()
    {
        $file = $this->getState();

        if ($callback = $this->saveUploadedFileUsing) {
            return $this->evaluate($callback);
        }

        if ($this->usesMediaLibrary()) {
            return $this->saveUploadedFileToMediaLibrary();
        }

        return $this->saveUploadedFileToStorage();
    }

    public function saveUploadedFileToMediaLibrary()
    {
        $file = $this->getState();

        if (! ($model = $this->getMediaLibraryModel())) {
            return $file;
        }

        $collection = $this->getMediaLibraryCollection();

        $media = $model
            ->addMediaFromString($file->get())
            ->usingFileName($file->getFilename())
            ->toMediaCollection($collection);

        $livewire = $this->getLivewire();
        data_set($livewire, $this->getStatePath(), $media->uuid);

        return $media->uuid;
    }

    public function saveUploadedFileToStorage()
    {
        $file = $this->getState();

        $storeMethod = $this->getVisibility() === 'public' ? 'storePublicly' : 'store';

        $path = $file->{$storeMethod}($this->getDirectory(), $this->getDiskName());

        $livewire = $this->getLivewire();
        data_set($livewire, $this->getStatePath(), $path);

        return $path;
    }

    public function saveUploadedFileUsing(callable $callback): static
    {
        $this->saveUploadedFileUsing = $callback;

        return $this;
    }

    public function uploadButtonPosition(string | callable $position): static
    {
        $this->uploadButtonPosition = $position;

        return $this;
    }

    public function uploadProgressIndicatorPosition(string | callable $position): static
    {
        $this->uploadProgressIndicatorPosition = $position;

        return $this;
    }

    public function uploadedFileShouldBeDeletedOnRemoval(bool | callable $condition = true): static
    {
        $this->shouldUploadedFileBeDeletedOnRemoval = $condition;

        return $this;
    }

    public function visibility(string | callable $visibility): static
    {
        $this->visibility = $visibility;

        return $this;
    }

    public function getAcceptedFileTypes(): array
    {
        return $this->evaluate($this->acceptedFileTypes);
    }

    public function getDirectory(): ?string
    {
        return $this->evaluate($this->directory);
    }

    public function getDisk(): Filesystem
    {
        return Storage::disk($this->getDiskName());
    }

    public function getDiskName(): string
    {
        return $this->evaluate($this->diskName) ?? config('forms2.default_filesystem_disk');
    }

    public function getImageCropAspectRatio(): ?string
    {
        return $this->evaluate($this->imageCropAspectRatio);
    }

    public function getImagePreviewHeight(): ?string
    {
        return $this->evaluate($this->imagePreviewHeight);
    }

    public function getImageResizeTargetHeight(): ?string
    {
        return $this->evaluate($this->imageResizeTargetHeight);
    }

    public function getImageResizeTargetWidth(): ?string
    {
        return $this->evaluate($this->imageResizeTargetWidth);
    }

    public function getLoadingIndicatorPosition(): string
    {
        return $this->evaluate($this->loadingIndicatorPosition);
    }

    public function getMaxSize(): ?int
    {
        return $this->evaluate($this->maxSize);
    }

    public function getMediaLibraryCollection(): ?string
    {
        return $this->evaluate($this->mediaLibraryCollection);
    }

    public function getMediaLibraryModel(): ?HasMedia
    {
        return $this->evaluate($this->mediaLibraryModel) ?? $this->getContainer()->getMediaLibraryModel();
    }

    public function getMinSize(): ?int
    {
        return $this->evaluate($this->minSize);
    }

    public function getPanelAspectRatio(): ?string
    {
        return $this->evaluate($this->panelAspectRatio);
    }

    public function getPanelLayout(): ?string
    {
        return $this->evaluate($this->panelLayout);
    }

    public function getRemoveUploadButtonPosition(): string
    {
        return $this->evaluate($this->removeUploadButtonPosition);
    }

    public function getUploadButtonPosition(): string
    {
        return $this->evaluate($this->uploadButtonPosition);
    }

    public function getUploadProgressIndicatorPosition(): string
    {
        return $this->evaluate($this->uploadProgressIndicatorPosition);
    }

    public function getVisibility(): string
    {
        return $this->evaluate($this->visibility);
    }

    public function isAvatar(): bool
    {
        return (bool) $this->evaluate($this->isAvatar);
    }

    public function shouldUploadedFileBeDeletedOnRemoval(): bool
    {
        return (bool) $this->evaluate($this->shouldUploadedFileBeDeletedOnRemoval);
    }

    public function usesMediaLibrary(): bool
    {
        return (bool) $this->getMediaLibraryCollection();
    }

    protected function hasFileObjectState(): bool
    {
        return $this->getState() instanceof SplFileInfo;
    }
}
