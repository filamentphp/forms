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

    $beforeLabelContainer = $field?->getChildSchema($field::BEFORE_LABEL_SCHEMA_KEY)?->toHtmlString();
    $afterLabelContainer = $field?->getChildSchema($field::AFTER_LABEL_SCHEMA_KEY)?->toHtmlString();
    $aboveContentContainer = $field?->getChildSchema($field::ABOVE_CONTENT_SCHEMA_KEY)?->toHtmlString();
    $belowContentContainer = $field?->getChildSchema($field::BELOW_CONTENT_SCHEMA_KEY)?->toHtmlString();
    $beforeContentContainer = $field?->getChildSchema($field::BEFORE_CONTENT_SCHEMA_KEY)?->toHtmlString();
    $afterContentContainer = $field?->getChildSchema($field::AFTER_CONTENT_SCHEMA_KEY)?->toHtmlString();
    $aboveErrorMessageContainer = $field?->getChildSchema($field::ABOVE_ERROR_MESSAGE_SCHEMA_KEY)?->toHtmlString();
    $belowErrorMessageContainer = $field?->getChildSchema($field::BELOW_ERROR_MESSAGE_SCHEMA_KEY)?->toHtmlString();

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
    @if ($label && $labelSrOnly)
        <label for="{{ $id }}" class="fi-fo-field-label fi-sr-only">
            {{ $label }}
        </label>
    @endif

    <div
        @class([
            'fi-fo-field-label-col',
            "fi-vertical-align-{$inlineLabelVerticalAlignment->value}" => $hasInlineLabel,
        ])
    >
        {{ $field?->getChildSchema($field::ABOVE_LABEL_SCHEMA_KEY) }}

        @if (($label && (! $labelSrOnly)) || $labelPrefix || $labelSuffix || $beforeLabelContainer || $afterLabelContainer)
            <div
                @class([
                    'fi-fo-field-label-ctn',
                    ($label instanceof \Illuminate\View\ComponentSlot) ? $label->attributes->get('class') : null,
                ])
            >
                {{ $beforeLabelContainer }}

                <label class="fi-fo-field-label">
                    {{ $labelPrefix }}

                    @if ($label && (! $labelSrOnly))
                        <span class="fi-fo-field-label-content">
                            {{ $label }}

                            @if ($required && (! $isDisabled))
                                <sup class="fi-fo-field-label-required-mark">
                                    *
                                </sup>
                            @endif
                        </span>
                    @endif

                    {{ $labelSuffix }}
                </label>

                {{ $afterLabelContainer }}
            </div>
        @endif

        {{ $field?->getChildSchema($field::BELOW_LABEL_SCHEMA_KEY) }}
    </div>

    @if ((! \Filament\Support\is_slot_empty($slot)) || $hasError || $aboveContentContainer || $belowContentContainer || $beforeContentContainer || $afterContentContainer || $aboveErrorMessageContainer || $belowErrorMessageContainer)
        <div class="fi-fo-field-content-col">
            {{ $aboveContentContainer }}

            @if ($beforeContentContainer || $afterContentContainer)
                <div class="fi-fo-field-content-ctn">
                    {{ $beforeContentContainer }}

                    <div class="fi-fo-field-content">
                        {{ $slot }}
                    </div>

                    {{ $afterContentContainer }}
                </div>
            @else
                {{ $slot }}
            @endif

            {{ $belowContentContainer }}

            @if ($hasError)
                {{ $aboveErrorMessageContainer }}

                <p data-validation-error class="fi-fo-field-wrp-error-message">
                    {{ $errors->has($statePath) ? $errors->first($statePath) : ($hasNestedRecursiveValidationRules ? $errors->first("{$statePath}.*") : null) }}
                </p>

                {{ $belowErrorMessageContainer }}
            @endif
        </div>
    @endif
</div>
