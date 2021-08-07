<?php

namespace Filament\Forms2\Components;

class Select extends Field
{
    use Concerns\HasPlaceholder;

    protected string $view = 'forms2::components.select';

    protected $getSearchResultsUsing = null;

    protected $getSelectedOptionLabelUsing = null;

    protected $isSearchable = false;

    protected $noOptionsMessage = null;

    protected $noSearchResultsMessage = null;

    protected $options = [];

    protected function setUp(): void
    {
        parent::setUp();

        $this->getSelectedOptionLabelUsing(function (Select $component, $state): ?string {
            if (array_key_exists($state, $options = $component->getOptions())) {
                return $options[$state];
            }

            return $state;
        });

        $this->noOptionsMessage(__('forms2::components.select.noOptionsMessage'));

        $this->noSearchResultsMessage(__('forms2::components.select.noSearchResultsMessage'));

        $this->placeholder(__('forms2::components.select.placeholder'));
    }

    public function getSearchResultsUsing(callable $callback): static
    {
        $this->getSearchResultsUsing = $callback;

        return $this;
    }

    public function getSelectedOptionLabelUsing(callable $callback): static
    {
        $this->getSelectedOptionLabelUsing = $callback;

        return $this;
    }

    public function noOptionsMessage(string | callable $message): static
    {
        $this->noOptionsMessage = $message;

        return $this;
    }

    public function noSearchResultsMessage(string | callable $message): static
    {
        $this->noSearchResultsMessage = $message;

        return $this;
    }

    public function options(array | callable $options): static
    {
        $this->options = $options;

        return $this;
    }

    public function searchable(bool | callable $condition = true): static
    {
        $this->isSearchable = $condition;

        return $this;
    }

    public function getNoOptionsMessage(): string
    {
        return $this->evaluate($this->noOptionsMessage);
    }

    public function getNoSearchResultsMessage(): string
    {
        return $this->evaluate($this->noSearchResultsMessage);
    }

    public function getOptions(): array
    {
        return $this->evaluate($this->options);
    }

    public function getSearchResults(string $query): array
    {
        if (! $this->getSearchResultsUsing) {
            return [];
        }

        return $this->evaluate($this->getSearchResultsUsing, [
            'query' => $query,
        ]);
    }

    public function getSelectedOptionLabel(): ?string
    {
        return $this->evaluate($this->getSelectedOptionLabelUsing);
    }

    public function isSearchable(): bool
    {
        return (bool) $this->evaluate($this->isSearchable);
    }
}
