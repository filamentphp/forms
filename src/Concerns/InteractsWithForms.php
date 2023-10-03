<?php

namespace Filament\Forms\Concerns;

use Closure;
use Exception;
use Filament\Forms\Components\Component;
use Filament\Forms\Form;
use Filament\Support\Concerns\ResolvesDynamicLivewireProperties;
use Filament\Support\Contracts\TranslatableContentDriver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;
use Livewire\TemporaryUploadedFile;
use Livewire\WithFileUploads;

trait InteractsWithForms
{
    use WithFileUploads;
    use HasFormComponentActions;
    use ResolvesDynamicLivewireProperties;

    /**
     * @var array <string, TemporaryUploadedFile | null>
     */
    public array $componentFileAttachments = [];

    /**
     * @var array<string, Form>
     */
    protected ?array $cachedForms = null;

    protected bool $hasCachedForms = false;

    protected bool $isCachingForms = false;

    protected bool $hasFormsModalRendered = false;

    public function dispatchFormEvent(mixed ...$args): void
    {
        foreach ($this->getCachedForms() as $form) {
            $form->dispatchEvent(...$args);
        }
    }

    public function getFormComponentFileAttachment(string $statePath): ?TemporaryUploadedFile
    {
        return data_get($this->componentFileAttachments, $statePath);
    }

    public function getFormComponentFileAttachmentUrl(string $statePath): ?string
    {
        $this->skipRender();

        foreach ($this->getCachedForms() as $form) {
            if ($url = $form->getComponentFileAttachmentUrl($statePath)) {
                return $url;
            }
        }

        return null;
    }

    /**
     * @return array<array{'label': string, 'value': string}>
     */
    public function getFormSelectOptionLabels(string $statePath): array
    {
        $this->skipRender();

        foreach ($this->getCachedForms() as $form) {
            if ($labels = $form->getSelectOptionLabels($statePath)) {
                return $labels;
            }
        }

        return [];
    }

    public function getFormSelectOptionLabel(string $statePath): ?string
    {
        $this->skipRender();

        foreach ($this->getCachedForms() as $form) {
            if ($label = $form->getSelectOptionLabel($statePath)) {
                return $label;
            }
        }

        return null;
    }

    /**
     * @return array<array{'label': string, 'value': string}>
     */
    public function getFormSelectOptions(string $statePath): array
    {
        $this->skipRender();

        foreach ($this->getCachedForms() as $form) {
            if ($results = $form->getSelectOptions($statePath)) {
                return $results;
            }
        }

        return [];
    }

    /**
     * @return array<array{'label': string, 'value': string}>
     */
    public function getFormSelectSearchResults(string $statePath, string $search): array
    {
        $this->skipRender();

        foreach ($this->getCachedForms() as $form) {
            if ($results = $form->getSelectSearchResults($statePath, $search)) {
                return $results;
            }
        }

        return [];
    }

    public function deleteUploadedFile(string $statePath, string $fileKey): void
    {
        foreach ($this->getCachedForms() as $form) {
            $form->deleteUploadedFile($statePath, $fileKey);
        }
    }

    /**
     * @return array<array{name: string, size: int, type: string, url: string} | null> | null
     */
    public function getFormUploadedFiles(string $statePath): ?array
    {
        $this->skipRender();

        foreach ($this->getCachedForms() as $form) {
            if ($files = $form->getUploadedFiles($statePath)) {
                return $files;
            }
        }

        return null;
    }

    public function removeFormUploadedFile(string $statePath, string $fileKey): void
    {
        foreach ($this->getCachedForms() as $form) {
            $form->removeUploadedFile($statePath, $fileKey);
        }
    }

    public function reorderFormUploadedFiles(string $statePath, array $fileKeys): void
    {
        foreach ($this->getCachedForms() as $form) {
            $form->reorderUploadedFiles($statePath, $fileKeys);
        }
    }

    /**
     * @param  array<string, array<mixed>> | null  $rules
     * @param  array<string, string>  $messages
     * @param  array<string, string>  $attributes
     * @return array<string, mixed>
     */
    public function validate($rules = null, $messages = [], $attributes = []): array
    {
        try {
            return parent::validate($rules, $messages, $attributes);
        } catch (ValidationException $exception) {
            $this->onValidationError($exception);

            $this->dispatchBrowserEvent('expand-concealing-component');

            throw $exception;
        }
    }

    protected function onValidationError(ValidationException $exception): void
    {
    }

    /**
     * @param  string  $field
     * @param  array<string, array<mixed>>  $rules
     * @param  array<string, string>  $messages
     * @param  array<string, string>  $attributes
     * @return array<string, mixed>
     */
    public function validateOnly($field, $rules = null, $messages = [], $attributes = [])
    {
        try {
            return parent::validateOnly($field, $rules, $messages, $attributes);
        } catch (ValidationException $exception) {
            $this->onValidationError($exception);

            $this->dispatchBrowserEvent('expand-concealing-component');

            throw $exception;
        }
    }

    /**
     * @return class-string<TranslatableContentDriver> | null
     */
    public function getFormTranslatableContentDriver(): ?string
    {
        return null;
    }

    public function makeFormTranslatableContentDriver(): ?TranslatableContentDriver
    {
        $driver = $this->getFormTranslatableContentDriver();

        if (! $driver) {
            return null;
        }

        return app($driver, ['locale' => $this->getActiveFormLocale() ?? app()->getLocale()]);
    }

    public function getActiveFormLocale(): ?string
    {
        return null;
    }

    /**
     * @param  string  $name
     * @param  mixed  $value
     * @param  Closure  $callback
     */
    protected function callBeforeAndAfterSyncHooks($name, $value, $callback): void
    {
        parent::callBeforeAndAfterSyncHooks($name, $value, $callback);

        foreach ($this->getCachedForms() as $form) {
            $form->callAfterStateUpdated($name);
        }
    }

    protected function cacheForm(string $name, Form | Closure | null $form): ?Form
    {
        $this->isCachingForms = true;

        $form = value($form);

        if ($form) {
            $this->cachedForms[$name] = $form;
        } else {
            unset($this->cachedForms[$name]);
        }

        $this->isCachingForms = false;

        return $form;
    }

    /**
     * @return array<string, Form>
     */
    protected function cacheForms(): array
    {
        $this->isCachingForms = true;

        $this->cachedForms = collect($this->getForms())
            ->merge($this->getTraitForms())
            ->mapWithKeys(function (Form | string | null $form, string | int $formName): array {
                if ($form === null) {
                    return ['' => null];
                }

                if (is_string($formName)) {
                    return [$formName => $form];
                }

                if (! method_exists($this, $form)) {
                    $livewireClass = $this::class;

                    throw new Exception("Form configuration method [{$formName}()] is missing from Livewire component [{$livewireClass}].");
                }

                return [$form => $this->{$form}($this->makeForm())];
            })
            ->forget('')
            ->all();

        $this->isCachingForms = false;

        $this->hasCachedForms = true;

        foreach ($this->mountedFormComponentActions as $actionNestingIndex => $actionName) {
            $this->cacheForm(
                "mountedFormComponentActionForm{$actionNestingIndex}",
                $this->getMountedFormComponentActionForm($actionNestingIndex),
            );
        }

        return $this->cachedForms;
    }

    /**
     * @return array<int | string, string | Form>
     */
    public function getTraitForms(): array
    {
        $forms = [];

        foreach (class_uses_recursive($class = static::class) as $trait) {
            if (method_exists($class, $method = 'get' . class_basename($trait) . 'Forms')) {
                $forms = [
                    ...$forms,
                    ...$this->{$method}(),
                ];
            }
        }

        return $forms;
    }

    protected function hasCachedForm(string $name): bool
    {
        return array_key_exists($name, $this->getCachedForms());
    }

    public function getForm(string $name): ?Form
    {
        return $this->getCachedForms()[$name] ?? null;
    }

    /**
     * @return array<string, Form>
     */
    public function getCachedForms(): array
    {
        if (! $this->hasCachedForms) {
            return $this->cacheForms();
        }

        return $this->cachedForms;
    }

    /**
     * @return array<int | string, string | Form>
     */
    protected function getForms(): array
    {
        return [
            'form',
        ];
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema($this->getFormSchema())
            ->model($this->getFormModel())
            ->statePath($this->getFormStatePath())
            ->operation($this->getFormContext());
    }

    /**
     * @deprecated Override the `form()` method to configure the default form.
     */
    protected function getFormModel(): Model | string | null
    {
        return null;
    }

    /**
     * @deprecated Override the `form()` method to configure the default form.
     *
     * @return array<Component>
     */
    protected function getFormSchema(): array
    {
        return [];
    }

    /**
     * @deprecated Override the `form()` method to configure the default form.
     */
    protected function getFormContext(): ?string
    {
        return null;
    }

    /**
     * @deprecated Override the `form()` method to configure the default form.
     */
    protected function getFormStatePath(): ?string
    {
        return null;
    }

    /**
     * @return array<string, array<mixed>>
     */
    protected function getRules(): array
    {
        $rules = parent::getRules();

        foreach ($this->getCachedForms() as $form) {
            $rules = [
                ...$rules,
                ...$form->getValidationRules(),
            ];
        }

        return $rules;
    }

    /**
     * @return array<string, string>
     */
    protected function getValidationAttributes(): array
    {
        $attributes = parent::getValidationAttributes();

        foreach ($this->getCachedForms() as $form) {
            $attributes = [
                ...$attributes,
                ...$form->getValidationAttributes(),
            ];
        }

        return $attributes;
    }

    protected function makeForm(): Form
    {
        return Form::make($this);
    }

    public function isCachingForms(): bool
    {
        return $this->isCachingForms;
    }
}
