<?php

namespace Filament\Forms\Concerns;

use Filament\Forms\ComponentContainer;
use Filament\Forms\Components\Actions\Action;
use Filament\Forms\Components\Component;
use Filament\Forms\Form;
use Filament\Support\Exceptions\Cancel;
use Filament\Support\Exceptions\Halt;
use Illuminate\Support\Arr;

/**
 * @property ComponentContainer $mountedFormComponentActionForm
 */
trait HasFormComponentActions
{
    /**
     * @var array<string> | null
     */
    public ?array $mountedFormComponentActions = [];

    /**
     * @var array<string, array<string, mixed>> | null
     */
    public ?array $mountedFormComponentActionsArguments = [];

    /**
     * @var array<string, array<string, mixed>> | null
     */
    public ?array $mountedFormComponentActionsData = [];

    /**
     * @var array<string> | null
     */
    public ?array $mountedFormComponentActionsComponents = [];

    /**
     * @param  array<string, mixed>  $arguments
     */
    public function callMountedFormComponentAction(array $arguments = []): mixed
    {
        $action = $this->getMountedFormComponentAction();

        if (! $action) {
            return null;
        }

        if ($action->isDisabled()) {
            return null;
        }

        $action->arguments([
            ...Arr::last($this->mountedFormComponentActionsArguments ?? []),
            ...$arguments,
        ]);

        $form = $this->getMountedFormComponentActionForm();

        $result = null;

        try {
            if ($this->mountedFormComponentActionHasForm()) {
                $action->callBeforeFormValidated();

                $action->formData($form->getState());

                $action->callAfterFormValidated();
            }

            $action->callBefore();

            $result = $action->call([
                'form' => $form,
            ]);

            $result = $action->callAfter() ?? $result;
        } catch (Halt $exception) {
            return null;
        } catch (Cancel $exception) {
        }

        $action->resetArguments();
        $action->resetFormData();

        if (filled($this->redirectTo)) {
            return $result;
        }

        $this->unmountFormComponentAction();

        return $result;
    }

    /**
     * @param  array<string, mixed>  $arguments
     */
    public function mountFormComponentAction(string $component, string $name, array $arguments = []): mixed
    {
        $this->mountedFormComponentActions[] = $name;
        $this->mountedFormComponentActionsArguments[] = $arguments;
        $this->mountedFormComponentActionsComponents[] = $component;
        $this->mountedFormComponentActionsData[] = [];

        $action = $this->getMountedFormComponentAction();

        if (! $action) {
            $this->unmountFormComponentAction();

            return null;
        }

        if ($action->isDisabled()) {
            $this->unmountFormComponentAction();

            return null;
        }

        $action->arguments($arguments);

        $this->cacheMountedFormComponentActionForm();

        try {
            $hasForm = $this->mountedFormComponentActionHasForm();

            if ($hasForm) {
                $action->callBeforeFormFilled();
            }

            $action->mount([
                'form' => $this->getMountedFormComponentActionForm(),
            ]);

            if ($hasForm) {
                $action->callAfterFormFilled();
            }
        } catch (Halt $exception) {
            return null;
        } catch (Cancel $exception) {
            $this->unmountFormComponentAction(shouldCloseParentActions: false);

            return null;
        }

        if (! $this->mountedFormComponentActionShouldOpenModal()) {
            return $this->callMountedFormComponentAction();
        }

        $this->resetErrorBag();

        $this->openFormComponentActionModal();

        return null;
    }

    protected function cacheMountedFormComponentActionForm(): void
    {
        $this->cacheForm(
            'mountedFormComponentActionForm' . array_key_last($this->mountedFormComponentActions),
            fn () => $this->getMountedFormComponentActionForm(),
        );
    }

    public function mountedFormComponentActionShouldOpenModal(): bool
    {
        $action = $this->getMountedFormComponentAction();

        if ($action->isModalHidden()) {
            return false;
        }

        return $action->getModalDescription() ||
            $action->getModalContent() ||
            $action->getModalContentFooter() ||
            $action->getInfolist() ||
            $this->mountedFormComponentActionHasForm();
    }

    public function mountedFormComponentActionHasForm(): bool
    {
        return (bool) count($this->getMountedFormComponentActionForm()?->getComponents() ?? []);
    }

    public function getMountedFormComponentAction(int $actionNestingIndex = null): ?Action
    {
        $actionNestingIndex ??= array_key_last($this->mountedFormComponentActions);
        $actionName = $this->mountedFormComponentActions[$actionNestingIndex] ?? null;

        if (blank($actionName)) {
            return null;
        }

        return $this->getMountedFormComponentActionComponent($actionNestingIndex)?->getAction($actionName);
    }

    protected function getMountedFormComponentActionForm(int $actionNestingIndex = null): ?Form
    {
        $actionNestingIndex ??= array_key_last($this->mountedFormComponentActions);

        $action = $this->getMountedFormComponentAction($actionNestingIndex);

        if (! ($action instanceof Action)) {
            return null;
        }

        if ((! $this->isCachingForms) && $this->hasCachedForm("mountedFormComponentActionForm{$actionNestingIndex}")) {
            return $this->getForm("mountedFormComponentActionForm{$actionNestingIndex}");
        }

        return $action->getForm(
            $this->makeForm()
                ->model($this->getMountedFormComponentActionComponent($actionNestingIndex)->getActionFormModel())
                ->statePath('mountedFormComponentActionsData.' . $actionNestingIndex)
                ->operation(implode('.', array_slice($this->mountedFormComponentActions, 0, $actionNestingIndex + 1))),
        );
    }

    public function getMountedFormComponentActionComponent(int $actionNestingIndex = null): ?Component
    {
        $actionNestingIndex ??= array_key_last($this->mountedFormComponentActions);
        $componentKey = $this->mountedFormComponentActionsComponents[$actionNestingIndex] ?? null;

        if (blank($componentKey)) {
            return null;
        }

        foreach ($this->getCachedForms() as $form) {
            $component = $form->getComponent($componentKey);

            if (! $component) {
                continue;
            }

            return $component;
        }

        return null;
    }

    protected function resetMountedFormComponentActionProperties(): void
    {
        $this->mountedFormComponentActions = [];
        $this->mountedFormComponentActionsArguments = [];
        $this->mountedFormComponentActionsComponents = [];
        $this->mountedFormComponentActionsData = [];
    }

    protected function popMountedFormComponentAction(): ?string
    {
        try {
            return array_pop($this->mountedFormComponentActions);
        } finally {
            array_pop($this->mountedFormComponentActionsArguments);
            array_pop($this->mountedFormComponentActionsComponents);
            array_pop($this->mountedFormComponentActionsData);
        }
    }

    public function unmountFormComponentAction(bool $shouldCloseParentActions = true): void
    {
        $action = $this->getMountedFormComponentAction();

        if (! ($shouldCloseParentActions && $action)) {
            $this->popMountedFormComponentAction();
        } elseif ($action->shouldCloseAllParentActions()) {
            $this->resetMountedFormComponentActionProperties();
        } else {
            $parentActionToCloseTo = $action->getParentActionToCloseTo();

            while (true) {
                $recentlyClosedParentAction = $this->popMountedFormComponentAction();

                if (
                    blank($parentActionToCloseTo) ||
                    ($recentlyClosedParentAction === $parentActionToCloseTo)
                ) {
                    break;
                }
            }
        }

        if (! count($this->mountedFormComponentActions)) {
            $this->closeFormComponentActionModal();

            return;
        }

        $this->resetErrorBag();

        $this->openFormComponentActionModal();
    }

    protected function closeFormComponentActionModal(): void
    {
        $this->dispatchBrowserEvent('close-modal', [
            'id' => "{$this->id}-form-component-action",
        ]);

        $this->dispatchBrowserEvent('closed-form-component-action-modal', [
            'id' => $this->id,
        ]);
    }

    protected function openFormComponentActionModal(): void
    {
        $this->dispatchBrowserEvent('open-modal', [
            'id' => "{$this->id}-form-component-action",
        ]);

        $this->dispatchBrowserEvent('opened-form-component-action-modal', [
            'id' => $this->id,
        ]);
    }
}
