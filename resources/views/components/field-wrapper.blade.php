@php
    use Filament\Support\Enums\VerticalAlignment;
@endphp

@props([
    'field' => null,
    'hasInlineLabel' => null,
    'hasNestedRecursiveValidationRules' => null,
    'id' => null,
    'inlineLabelVerticalAlignment' => VerticalAlignment::Start,
    'isDisabled' => null,
    'label' => null,
    'labelPrefix' => null,
    'labelSrOnly' => null,
    'labelSuffix' => null,
    'required' => null,
    'statePath' => null,
])

@php
    if ($field) {
        $hasInlineLabel ??= $field->hasInlineLabel();
        $hasNestedRecursiveValidationRules ??= $field instanceof \Filament\Forms\Components\Contracts\HasNestedRecursiveValidationRules;
        $id ??= $field->getId();
        $isDisabled ??= $field->isDisabled();
        $label ??= $field->getLabel();
        $labelSrOnly ??= $field->isLabelHidden();
        $required ??= $field->isMarkedAsRequired();
        $statePath ??= $field->getStatePath();
    }

    $aboveLabelSchema = $field?->getChildSchema($field::ABOVE_LABEL_SCHEMA_KEY);
    $belowLabelSchema = $field?->getChildSchema($field::BELOW_LABEL_SCHEMA_KEY);
    $beforeLabelSchema = $field?->getChildSchema($field::BEFORE_LABEL_SCHEMA_KEY)?->toHtmlString();
    $afterLabelSchema = $field?->getChildSchema($field::AFTER_LABEL_SCHEMA_KEY)?->toHtmlString();
    $aboveContentSchema = $field?->getChildSchema($field::ABOVE_CONTENT_SCHEMA_KEY)?->toHtmlString();
    $belowContentSchema = $field?->getChildSchema($field::BELOW_CONTENT_SCHEMA_KEY)?->toHtmlString();
    $beforeContentSchema = $field?->getChildSchema($field::BEFORE_CONTENT_SCHEMA_KEY)?->toHtmlString();
    $afterContentSchema = $field?->getChildSchema($field::AFTER_CONTENT_SCHEMA_KEY)?->toHtmlString();
    $aboveErrorMessageSchema = $field?->getChildSchema($field::ABOVE_ERROR_MESSAGE_SCHEMA_KEY)?->toHtmlString();
    $belowErrorMessageSchema = $field?->getChildSchema($field::BELOW_ERROR_MESSAGE_SCHEMA_KEY)?->toHtmlString();

    $hasError = filled($statePath) && ($errors->has($statePath) || ($hasNestedRecursiveValidationRules && $errors->has("{$statePath}.*")));
@endphp

<div
    data-field-wrapper
    {{
        $attributes
            ->merge($field?->getExtraFieldWrapperAttributes() ?? [], escape: false)
            ->class([
                'fi-fo-field',
                'fi-fo-field-has-inline-label' => $hasInlineLabel,
            ])
    }}
>
    @if (filled($label) && $labelSrOnly)
        <label for="{{ $id }}" class="fi-fo-field-label fi-sr-only">
            {{ $label }}
        </label>
    @endif

    @if ((filled($label) && (! $labelSrOnly)) || $hasInlineLabel || $aboveLabelSchema || $belowLabelSchema || $beforeLabelSchema || $afterLabelSchema || $labelPrefix || $labelSuffix)
        <div
            @class([
                'fi-fo-field-label-col',
                "fi-vertical-align-{$inlineLabelVerticalAlignment->value}" => $hasInlineLabel,
            ])
        >
            {{ $aboveLabelSchema }}

            <div
                @class([
                    'fi-fo-field-label-ctn',
                    ($label instanceof \Illuminate\View\ComponentSlot) ? $label->attributes->get('class') : null,
                ])
            >
                {{ $beforeLabelSchema }}

                @if ((filled($label) && (! $labelSrOnly)) || $labelPrefix || $labelSuffix)
                    <label class="fi-fo-field-label">
                        {{ $labelPrefix }}

                        @if (filled($label) && (! $labelSrOnly))
                            <span class="fi-fo-field-label-content">
                                {{ $label }}

                                @if ($required && (! $isDisabled))
                                    <sup
                                        class="fi-fo-field-label-required-mark"
                                    >
                                        *
                                    </sup>
                                @endif
                            </span>
                        @endif

                        {{ $labelSuffix }}
                    </label>
                @endif

                {{ $afterLabelSchema }}
            </div>

            {{ $belowLabelSchema }}
        </div>
    @endif

    @if ((! \Filament\Support\is_slot_empty($slot)) || $hasError || $aboveContentSchema || $belowContentSchema || $beforeContentSchema || $afterContentSchema || $aboveErrorMessageSchema || $belowErrorMessageSchema)
        <div class="fi-fo-field-content-col">
            {{ $aboveContentSchema }}

            @if ($beforeContentSchema || $afterContentSchema)
                <div class="fi-fo-field-content-ctn">
                    {{ $beforeContentSchema }}

                    <div class="fi-fo-field-content">
                        {{ $slot }}
                    </div>

                    {{ $afterContentSchema }}
                </div>
            @else
                {{ $slot }}
            @endif

            {{ $belowContentSchema }}

            @if ($hasError)
                {{ $aboveErrorMessageSchema }}

                <p data-validation-error class="fi-fo-field-wrp-error-message">
                    {{ $errors->has($statePath) ? $errors->first($statePath) : ($hasNestedRecursiveValidationRules ? $errors->first("{$statePath}.*") : null) }}
                </p>

                {{ $belowErrorMessageSchema }}
            @endif
        </div>
    @endif
</div>
