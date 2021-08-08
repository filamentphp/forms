<?php

namespace Filament\Forms2\Components;

use Filament\Forms2\ComponentContainer;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class MultipleFileUpload extends Field
{
    protected string $view = 'forms2::components.multiple-file-upload';

    protected $uploadComponent = null;

    protected function setUp(): void
    {
        parent::setUp();

        $this->dehydrateStateUsing(function ($state) {
            $files = [];

            foreach ($state as $item) {
                if ($file = $item['file'] ?? null) {
                    $files[] = $file;
                }
            }

            return $files;
        });

        $this->hydrateStateUsing(function ($state) {
            $files = $state;

            if (! is_array($files)) {
                $files = [];
            }

            $state = [];

            foreach ($files as $file) {
                if ($file) {
                    $state[(string) Str::uuid()] = [
                        'file' => $file,
                    ];
                }
            }

            $state[(string) Str::uuid()] = [
                'file' => null,
            ];

            return $state;
        });
    }

    public function appendNewUploadField(): void
    {
        $files = $this->getState();

        $files[(string) Str::uuid()] = [
            'file' => null,
        ];

        $this->state($files);
    }

    public function removeUploadedFile(string $uuid): void
    {
        $files = $this->getState();

        unset($files[$uuid]);

        $this->state($files);
    }

    public function uploadComponent(Component | callable $component): static
    {
        $this->uploadComponent = $component;

        return $this;
    }

    public function getChildComponentContainers(): array
    {
        return collect($this->getState())
            ->map(function ($item, $index): ComponentContainer {
                return $this
                    ->getChildComponentContainer()
                    ->getClone()
                    ->statePath($index);
            })->toArray();
    }

    public function getChildComponents(): array
    {
        return [
            $this->getUploadComponent(),
        ];
    }

    public function getUploadComponent(): Component
    {
        return $this->evaluate($this->uploadComponent) ?? $this->getDefaultUploadComponent();
    }

    protected function getDefaultUploadComponent(): Component
    {
        return FileUpload::make('file');
    }
}
