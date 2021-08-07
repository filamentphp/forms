<?php

namespace Filament\Forms2\Components;

use Illuminate\Support\Str;

class MultipleFileUpload extends Repeater
{
    protected string $view = 'forms2::components.repeater';

    protected $uploadComponent = null;

    protected function setUp(): void
    {
        parent::setUp();

        $this->dehydrateStateUsing(function ($state) {
            $files = [];

            foreach ($state as $item) {
                $files[] = $item['file'];
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
                $state[(string) Str::uuid()] = [
                    'file' => $file,
                ];
            }

            return $state;
        });
    }

    public function uploadComponent(Component | callable $component): static
    {
        $this->uploadComponent = $component;

        return $this;
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


