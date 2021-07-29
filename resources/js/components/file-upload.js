import * as FilePond from 'filepond'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

FilePond.registerPlugin(FilePondPluginFileValidateSize)
FilePond.registerPlugin(FilePondPluginFileValidateType)
FilePond.registerPlugin(FilePondPluginImageCrop)
FilePond.registerPlugin(FilePondPluginImageExifOrientation)
FilePond.registerPlugin(FilePondPluginImagePreview)
FilePond.registerPlugin(FilePondPluginImageResize)
FilePond.registerPlugin(FilePondPluginImageTransform)

export default (Alpine) => {
    Alpine.data('fileUploadFormComponent', ({
        acceptedFileTypes,
        getUploadedFileUrlUsing,
        imageCropAspectRatio,
        imagePreviewHeight,
        imageResizeTargetHeight,
        imageResizeTargetWidth,
        loadingIndicatorPosition,
        panelAspectRatio,
        panelLayout,
        placeholder,
        maxSize,
        minSize,
        removeTemporaryUploadedFileUsing,
        removeUploadButtonPosition,
        removeUploadedFileUsing,
        state,
        statePath,
        uploadButtonPosition,
        uploadedFileUrl,
        uploadProgressIndicatorPosition,
        uploadUsing,
    }) => {
        return {
            files: [],

            pond: null,

            state,

            init: function () {
                if (uploadedFileUrl) {
                    this.files = [{
                        source: uploadedFileUrl,
                        options: {
                            type: 'local',
                        },
                    }]
                }

                this.pond = FilePond.create(this.$refs.input, {
                    acceptedFileTypes,
                    files: this.files,
                    imageCropAspectRatio,
                    imagePreviewHeight,
                    imageResizeTargetHeight,
                    imageResizeTargetWidth,
                    ...(placeholder && {labelIdle: placeholder}),
                    maxFileSize: maxSize,
                    minFileSize: minSize,
                    styleButtonProcessItemPosition: uploadButtonPosition,
                    styleButtonRemoveItemPosition: removeUploadButtonPosition,
                    styleLoadIndicatorPosition: loadingIndicatorPosition,
                    stylePanelAspectRatio: panelAspectRatio,
                    stylePanelLayout: panelLayout,
                    styleProgressIndicatorPosition: uploadProgressIndicatorPosition,
                    server: {
                        load: (source, load) => {
                            fetch(source).then((response) => {
                                response.blob().then((blob) => load(blob))
                            })
                        },
                        process: (fieldName, file, metadata, load, error, progress) => {
                            uploadUsing(statePath, file, load, error, progress)
                        },
                        remove: (source, load) => {
                            removeUploadedFileUsing(statePath).then(() => load())
                        },
                        revert: (uniqueFileId, load) => {
                            removeTemporaryUploadedFileUsing(statePath, uniqueFileId).then(() => load())
                        },
                    },
                })

                this.$watch('state', () => {
                    if (! this.state) {
                        this.pond.removeFiles()

                        return
                    }

                    if (this.state.startsWith('livewire-file:')) return

                    getUploadedFileUrlUsing(statePath).then((uploadedFileUrl) => {
                        if (uploadedFileUrl) {
                            this.pond.files = [{
                                source: uploadedFileUrl,
                                options: {
                                    type: 'local',
                                },
                            }]
                        } else {
                            this.pond.files = []
                        }
                    })
                })
            }
        }
    })
}
