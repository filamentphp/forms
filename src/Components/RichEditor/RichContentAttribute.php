<?php

namespace Filament\Forms\Components\RichEditor;

use Filament\Forms\Components\RichEditor\FileAttachmentProviders\Contracts\FileAttachmentProvider;
use Filament\Forms\Components\RichEditor\Plugins\Contracts\RichContentPlugin;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Database\Eloquent\Model;

class RichContentAttribute implements Htmlable
{
    protected ?string $fileAttachmentsDiskName = null;

    protected ?string $fileAttachmentsVisibility = null;

    /**
     * @var array<RichContentPlugin>
     */
    protected array $plugins = [];

    protected ?FileAttachmentProvider $fileAttachmentProvider = null;

    public function __construct(protected Model $model, protected string $name) {}

    public static function make(Model $model, string $name): static
    {
        return app(static::class, ['model' => $model, 'name' => $name]);
    }

    public function fileAttachmentsDisk(?string $name): static
    {
        $this->fileAttachmentsDiskName = $name;

        return $this;
    }

    public function fileAttachmentsVisibility(?string $visibility): static
    {
        $this->fileAttachmentsVisibility = $visibility;

        return $this;
    }

    public function getFileAttachmentsDiskName(): ?string
    {
        return $this->fileAttachmentsDiskName;
    }

    public function getFileAttachmentsVisibility(): ?string
    {
        return $this->fileAttachmentsVisibility ?? $this->getFileAttachmentProvider()?->getDefaultFileAttachmentVisibility();
    }

    /**
     * @param  array<RichContentPlugin>  $plugins
     */
    public function plugins(array $plugins): static
    {
        $this->plugins = [
            ...$this->plugins,
            ...$plugins,
        ];

        return $this;
    }

    /**
     * @return array<RichContentPlugin>
     */
    public function getPlugins(): array
    {
        return $this->plugins;
    }

    public function fileAttachmentProvider(?FileAttachmentProvider $provider): static
    {
        $this->fileAttachmentProvider = $provider?->attribute($this);

        return $this;
    }

    public function getFileAttachmentProvider(): ?FileAttachmentProvider
    {
        return $this->fileAttachmentProvider;
    }

    public function getModel(): Model
    {
        return $this->model;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function toHtml(): string
    {
        return RichContentRenderer::make($this->model->getAttribute($this->name))
            ->plugins($this->getPlugins())
            ->fileAttachmentsDisk($this->getFileAttachmentsDiskName())
            ->fileAttachmentsVisibility($this->getFileAttachmentsVisibility())
            ->fileAttachmentProvider($this->getFileAttachmentProvider())
            ->toHtml();
    }
}
