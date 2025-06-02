@props([
    'field' => null,
    'id' => null,
    'label' => null,
])

@php
    use Illuminate\View\ComponentAttributeBag;

    if ($field) {
        $id ??= $field->getId();
        $label ??= $field->getLabel();
    }
@endphp

<div
    data-field-wrapper
    {{
        (new ComponentAttributeBag)
            ->merge($field?->getExtraFieldWrapperAttributes() ?? [], escape: false)
            ->class([
                'fi-fo-field',
            ])
    }}
>
    @if (filled($label))
        <label for="{{ $id }}" class="fi-fo-field-label fi-sr-only">
            {{ $label }}
        </label>
    @endif

    {{ $slot }}
</div>
