@php
    use Filament\Support\Facades\FilamentView;

    $fieldWrapperView = $getFieldWrapperView();
    $id = $getId();
    $key = $getKey();
    $statePath = $getStatePath();
    $tools = $getTools();
    $toolbarButtons = $getToolbarButtons();
@endphp

<x-dynamic-component :component="$fieldWrapperView" :field="$field">
    <div
        @if (FilamentView::hasSpaMode())
            {{-- format-ignore-start --}}x-load="visible || event (x-modal-opened)"{{-- format-ignore-end --}}
        @else
            x-load
        @endif
        x-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('rich-editor', 'filament/forms') }}"
        x-data="richEditorFormComponent({
                    extensions: @js($getTipTapJsExtensions()),
                    key: @js($key),
                    isLiveDebounced: @js($isLiveDebounced()),
                    isLiveOnBlur: @js($isLiveOnBlur()),
                    liveDebounce: @js($getNormalizedLiveDebounce()),
                    livewireId: @js($this->getId()),
                    state: $wire.{{ $applyStateBindingModifiers("\$entangle('{$statePath}')", isOptimisticallyLive: false) }},
                    statePath: @js($statePath),
                    uploadingFileMessage: @js($getUploadingFileMessage()),
                })"
        x-bind:class="{
            'fi-fo-rich-editor-uploading-file': isUploadingFile,
        }"
        {{ $getExtraAttributeBag()->class(['fi-fo-rich-editor']) }}
    >
        <x-filament::input.wrapper :valid="! $errors->has($statePath)" x-cloak>
            @if (filled($toolbarButtons))
                <div class="fi-fo-rich-editor-toolbar">
                    @foreach ($toolbarButtons as $buttonGroup)
                        <div class="fi-fo-rich-editor-toolbar-group">
                            @foreach ($buttonGroup as $button)
                                {{ $tools[$button] ?? throw new Exception("Toolbar button [{$button}] cannot be found.") }}
                            @endforeach
                        </div>
                    @endforeach
                </div>
            @endif

            <div
                class="fi-fo-rich-editor-content fi-prose"
                x-ref="editor"
                wire:ignore
            ></div>
        </x-filament::input.wrapper>
    </div>
</x-dynamic-component>
