@php
    $iconClasses = 'w-7 h-7';
    $iconContainerClasses = [
        'absolute inset-y-0 left-0 flex items-center justify-center w-10 h-10 transition pointer-events-none group-focus-within:text-primary-500',
        'text-gray-400' => ! $errors->has($getStatePath()),
        'text-danger-400' => $errors->has($getStatePath()),
    ];
    $sideLabelClasses = [
        'whitespace-nowrap transition group-focus-within:text-primary-500',
        'text-gray-400' => ! $errors->has($getStatePath()),
        'text-danger-400' => $errors->has($getStatePath()),
    ];
@endphp

<x-forms2::field-wrapper
    :id="$getId()"
    :label="$getLabel()"
    :helper-text="$getHelperText()"
    :hint="$getHint()"
    :required="$isRequired()"
    :state-path="$getStatePath()"
>
    <div class="flex items-center space-x-1 group">
        @if ($label = $getPrefixLabel())
            <span @class($sideLabelClasses)>
                {{ $label }}
            </span>
        @endif

        <div class="flex-1">
            <input
                {!! ($autocomplete = $getAutocomplete()) ? "autocomplete=\"{$autocomplete}\"" : null !!}
                {!! $isAutofocused() ? 'autofocus' : null !!}
                {!! $isDisabled() ? 'disabled' : null !!}
                id="{{ $getId() }}"
                {!! ($length = $getMaxLength()) ? "maxlength=\"{$length}\"" : null !!}
                {!! ($length = $getMinLength()) ? "minlength=\"{$length}\"" : null !!}
                {!! ($placeholder = $getPlaceholder()) ? "placeholder=\"{$placeholder}\"" : null !!}
                {!! $isRequired() ? 'required' : null !!}
                type="{{ $getType() }}"
                {{ $applyStateBindingModifiers('wire:model') }}="{{ $getStatePath() }}"
                {{ $attributes->merge($getExtraAttributes())->class([
                    'block w-full h-10 transition duration-75 rounded-lg shadow-sm focus:border-primary-600 focus:ring-1 focus:ring-inset focus:ring-primary-600',
                    'border-gray-300' => ! $errors->has($getStatePath()),
                    'border-danger-600 ring-danger-600' => $errors->has($getStatePath()),
                ]) }}
            />
        </div>

        @if ($label = $getPostfixLabel())
            <span @class($sideLabelClasses)>
                {{ $label }}
            </span>
        @endif
    </div>
</x-forms2::field-wrapper>
