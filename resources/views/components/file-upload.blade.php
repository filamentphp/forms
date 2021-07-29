<x-forms2::field-wrapper
    :id="$getId()"
    :label="$getLabel()"
    :label-sr-only="$isAvatar()"
    :helper-text="$getHelperText()"
    :hint="$getHint()"
    :required="$isRequired()"
    :state-path="$getStatePath()"
>
    <div
        @class([
            'w-32 mx-auto' => $isAvatar(),
        ])
        x-data="fileUploadFormComponent({
            state: $wire.{{ $applyStateBindingModifiers('entangle(\'' . $getStatePath() . '\')') }},
            statePath: '{{ $getStatePath() }}',
            disk: '{{ $getDiskName() }}',
            uploadedFileUrl: {{ ($url = $getUploadedFileUrl()) ? "'{$url}'" : 'null' }},
            getUploadedFileUrlUsing: $wire.getUploadedFileUrl,
            uploadUsing: $wire.upload,
            removeTemporaryUploadedFileUsing: $wire.removeUpload,
            removeUploadedFileUsing: $wire.removeUploadedFile,
            acceptedFileTypes: {{ json_encode($getAcceptedFileTypes()) }},
            imageCropAspectRatio: {{ ($aspectRatio = $getImageCropAspectRatio()) ? "'{$aspectRatio}'" : 'null' }},
            imagePreviewHeight: {{ ($height = $getImagePreviewHeight()) ? "'{$height}'" : 'null' }},
            imageResizeTargetHeight: {{ ($height = $getImageResizeTargetHeight()) ? "'{$height}'" : 'null' }},
            imageResizeTargetWidth: {{ ($width = $getImageResizeTargetWidth()) ? "'{$width}'" : 'null' }},
            loadingIndicatorPosition: '{{ $getLoadingIndicatorPosition() }}',
            panelAspectRatio: {{ ($aspectRatio = $getPanelAspectRatio()) ? "'{$aspectRatio}'" : 'null' }},
            panelLayout: {{ ($layout = $getPanelLayout()) ? "'{$layout}'" : 'null' }},
            placeholder: {{ ($placeholder = $getPlaceholder()) ? "'{$placeholder}'" : 'null' }},
            maxSize: {{ ($size = $getMaxSize()) ? "'{$size} KB'" : 'null' }},
            minSize: {{ ($size = $getMinSize()) ? "'{$size} KB'" : 'null' }},
            removeUploadPosition: '{{ $getRemoveUploadButtonPosition() }}',
            uploadButtonPosition: '{{ $getUploadButtonPosition() }}',
            uploadProgressIndicatorPosition: '{{ $getUploadProgressIndicatorPosition() }}',
        })"
        wire:ignore
    >
        <input
            x-ref="input"
            {{ $isDisabled() ? 'disabled' : '' }}
            id="{{ $getId() }}"
            type="file"
        />
    </div>
</x-forms2::field-wrapper>
