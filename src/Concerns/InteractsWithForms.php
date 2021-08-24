<?php

namespace Filament\Forms\Concerns;

use Filament\Forms\ComponentContainer;
use Illuminate\Validation\ValidationException;
use Livewire\WithFileUploads;
use SplFileInfo;

trait InteractsWithForms
{
    use WithFileUploads;

    public array $componentFileAttachments = [];

    protected ?array $cachedForms = null;

    public function __get($property)
    {
        if ($form = $this->getCachedForm($property)) {
            return $form;
        }

        return parent::__get($property);
    }

    public function dispatchFormEvent(...$args): void
    {
        foreach ($this->getCachedForms() as $form) {
            $form->dispatchEvent(...$args);
        }
    }

    public function getComponentFileAttachment(string $statePath): ?SplFileInfo
    {
        return data_get($this->componentFileAttachments, $statePath);
    }

    public function getComponentFileAttachmentUrl(string $statePath): ?string
    {
        foreach ($this->getCachedForms() as $form) {
            if ($url = $form->getComponentFileAttachmentUrl($statePath)) {
                return $url;
            }
        }

        return null;
    }

    public function getSelectOptionLabel(string $statePath)
    {
        foreach ($this->getCachedForms() as $form) {
            if ($label = $form->getSelectOptionLabel($statePath)) {
                return $label;
            }
        }

        return null;
    }

    public function getSelectSearchResults(string $statePath, string $query): array
    {
        foreach ($this->getCachedForms() as $form) {
            if ($results = $form->getSelectSearchResults($statePath, $query)) {
                return $results;
            }
        }

        return [];
    }

    public function getUploadedFileUrl(string $statePath): ?string
    {
        foreach ($this->getCachedForms() as $form) {
            if ($url = $form->getUploadedFileUrl($statePath)) {
                return $url;
            }
        }

        return null;
    }

    public function removeUploadedFile(string $statePath): void
    {
        foreach ($this->getCachedForms() as $form) {
            $form->removeUploadedFile($statePath);
        }
    }

    public function validate($rules = null, $messages = [], $attributes = [])
    {
        try {
            return parent::validate($rules, $messages, $attributes);
        } catch (ValidationException $exception) {
            $invalidComponentStatePaths = array_keys($exception->validator->failed());

            $componentToFocus = null;

            foreach ($this->getCachedForms() as $form) {
                if ($componentToFocus = $form->getInvalidComponentToFocus($invalidComponentStatePaths)) {
                    break;
                }
            }

            if ($concealingComponent = $componentToFocus?->getConcealingComponent()) {
                $this->dispatchBrowserEvent('expand-concealing-component', [
                    'id' => $concealingComponent->getId(),
                ]);
            }

            throw $exception;
        }
    }

    protected function callBeforeAndAfterSyncHooks($name, $value, $callback): void
    {
        parent::callBeforeAndAfterSyncHooks($name, $value, $callback);

        foreach ($this->getCachedForms() as $form) {
            $form->callAfterStateUpdated($name);
        }
    }

    protected function cacheForms(): array
    {
        return $this->cachedForms = $this->getForms();
    }

    protected function getCachedForm($name): ?ComponentContainer
    {
        return $this->getCachedForms()[$name] ?? null;
    }

    protected function getCachedForms(): array
    {
        if ($this->cachedForms === null) {
            return $this->cacheForms();
        }

        return $this->cachedForms;
    }

    protected function getFormSchema(): array
    {
        return [];
    }

    protected function getForms(): array
    {
        return [
            'form' => $this->makeForm()->schema($this->getFormSchema()),
        ];
    }

    protected function makeForm(): ComponentContainer
    {
        return ComponentContainer::make($this);
    }
}
