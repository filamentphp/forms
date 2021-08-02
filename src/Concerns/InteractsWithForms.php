<?php

namespace Filament\Forms2\Concerns;

use Filament\Forms2\ComponentContainer;
use Livewire\WithFileUploads;

trait InteractsWithForms
{
    use WithFileUploads;

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
