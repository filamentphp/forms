<?php

namespace Filament\Forms\Components;

use Closure;
use Exception;
use Filament\Forms\Components\MorphToSelect\Type;
use Filament\Schemas\Components\Component;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class MorphToSelect extends Component
{
    use Concerns\CanAllowHtml;
    use Concerns\CanBeNative;
    use Concerns\CanBePreloaded;
    use Concerns\CanBeSearchable;
    use Concerns\HasLoadingMessage;
    use Concerns\HasName;

    protected string $view = 'filament-schemas::components.fieldset';

    protected bool | Closure $isRequired = false;

    protected int | Closure $optionsLimit = 50;

    /**
     * @var array<Type> | Closure
     */
    protected array | Closure $types = [];

    final public function __construct(string $name)
    {
        $this->name($name);
    }

    public static function make(?string $name = null): static
    {
        $morphToSelectClass = static::class;

        $name ??= static::getDefaultName();

        if (blank($name)) {
            throw new Exception("MorphToSelect of class [$morphToSelectClass] must have a unique name, passed to the [make()] method.");
        }

        $static = app($morphToSelectClass, ['name' => $name]);
        $static->configure();

        return $static;
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this->schema(function (MorphToSelect $component): array {
            $relationship = $component->getRelationship();
            $typeColumn = $relationship->getMorphType();
            $keyColumn = $relationship->getForeignKeyName();

            $types = $component->getTypes();
            $isRequired = $component->isRequired();

            return [
                Select::make($typeColumn)
                    ->label($component->getLabel())
                    ->hiddenLabel()
                    ->options(array_map(
                        fn (Type $type): string => $type->getLabel(),
                        $types,
                    ))
                    ->native($component->isNative())
                    ->required($isRequired)
                    ->live()
                    ->afterStateUpdated(function (Set $set) use ($component, $keyColumn): void {
                        $set($keyColumn, null);
                        $component->callAfterStateUpdated();
                    }),
                Select::make($keyColumn)
                    ->label(fn (Get $get): ?string => ($types[$get($typeColumn)] ?? null)?->getLabel())
                    ->hiddenLabel()
                    ->options(fn (Select $component, Get $get): ?array => $component->evaluate(($types[$get($typeColumn)] ?? null)?->getOptionsUsing))
                    ->getSearchResultsUsing(fn (Select $component, Get $get, $search): ?array => $component->evaluate(($types[$get($typeColumn)] ?? null)?->getSearchResultsUsing, ['search' => $search]))
                    ->getOptionLabelUsing(fn (Select $component, Get $get, $value): ?string => $component->evaluate(($types[$get($typeColumn)] ?? null)?->getOptionLabelUsing, ['value' => $value]))
                    ->native($component->isNative())
                    ->required(fn (Get $get): bool => filled(($types[$get($typeColumn)] ?? null)))
                    ->hidden(fn (Get $get): bool => blank(($types[$get($typeColumn)] ?? null)))
                    ->dehydratedWhenHidden()
                    ->searchable($component->isSearchable())
                    ->searchDebounce($component->getSearchDebounce())
                    ->searchPrompt($component->getSearchPrompt())
                    ->searchingMessage($component->getSearchingMessage())
                    ->noSearchResultsMessage($component->getNoSearchResultsMessage())
                    ->loadingMessage($component->getLoadingMessage())
                    ->allowHtml($component->isHtmlAllowed())
                    ->optionsLimit($component->getOptionsLimit())
                    ->preload($component->isPreloaded())
                    ->when(
                        $component->isLive(),
                        fn (Select $component) => $component->live(onBlur: $this->isLiveOnBlur()),
                    )
                    ->afterStateUpdated(function () use ($component): void {
                        $component->callAfterStateUpdated();
                    }),
            ];
        });
    }

    public static function getDefaultName(): ?string
    {
        return null;
    }

    public function optionsLimit(int | Closure $limit): static
    {
        $this->optionsLimit = $limit;

        return $this;
    }

    public function required(bool | Closure $condition = true): static
    {
        $this->isRequired = $condition;

        return $this;
    }

    /**
     * @param  array<Type> | Closure  $types
     */
    public function types(array | Closure $types): static
    {
        $this->types = $types;

        return $this;
    }

    public function getRelationship(): MorphTo
    {
        $record = $this->getModelInstance();

        $relationshipName = $this->getName();

        if (! $record->isRelation($relationshipName)) {
            throw new Exception("The relationship [{$relationshipName}] does not exist on the model [{$this->getModel()}].");
        }

        return $record->{$relationshipName}();
    }

    /**
     * @return array<string, Type>
     */
    public function getTypes(): array
    {
        $types = [];

        foreach ($this->evaluate($this->types) as $type) {
            $types[$type->getAlias()] = $type;
        }

        return $types;
    }

    public function isRequired(): bool
    {
        return (bool) $this->evaluate($this->isRequired);
    }

    public function getOptionsLimit(): int
    {
        return $this->evaluate($this->optionsLimit);
    }
}
