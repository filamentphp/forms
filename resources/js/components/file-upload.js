import * as FilePond from 'filepond'
import Cropper from 'cropperjs'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageEdit from 'filepond-plugin-image-edit'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
import FilePondPluginMediaPreview from 'filepond-plugin-media-preview'

FilePond.registerPlugin(FilePondPluginFileValidateSize)
FilePond.registerPlugin(FilePondPluginFileValidateType)
FilePond.registerPlugin(FilePondPluginImageCrop)
FilePond.registerPlugin(FilePondPluginImageEdit)
FilePond.registerPlugin(FilePondPluginImageExifOrientation)
FilePond.registerPlugin(FilePondPluginImagePreview)
FilePond.registerPlugin(FilePondPluginImageResize)
FilePond.registerPlugin(FilePondPluginImageTransform)
FilePond.registerPlugin(FilePondPluginMediaPreview)

window.FilePond = FilePond

export default function fileUploadFormComponent({
    acceptedFileTypes,
    deleteUploadedFileUsing,
    getUploadedFilesUsing,
    imageCropAspectRatio,
    imageEditorEmptyFillColor,
    imageEditorMode,
    imageEditorViewportHeight,
    imageEditorViewportWidth,
    imagePreviewHeight,
    imageResizeMode,
    imageResizeTargetHeight,
    imageResizeTargetWidth,
    imageResizeUpscale,
    isAvatar,
    isDeletable,
    isDisabled,
    isDownloadable,
    isMultiple,
    isOpenable,
    isPreviewable,
    isReorderable,
    hasImageEditor,
    canEditSvgs,
    isSvgEditingConfirmed,
    confirmSvgEditingMessage,
    disabledSvgEditingMessage,
    loadingIndicatorPosition,
    locale,
    panelAspectRatio,
    panelLayout,
    placeholder,
    maxSize,
    minSize,
    removeUploadedFileButtonPosition,
    removeUploadedFileUsing,
    reorderUploadedFilesUsing,
    shouldAppendFiles,
    shouldOrientImageFromExif,
    shouldTransformImage,
    state,
    uploadButtonPosition,
    uploadProgressIndicatorPosition,
    uploadUsing,
}) {
    return {
        fileKeyIndex: {},

        pond: null,

        shouldUpdateState: true,

        state,

        lastState: null,

        uploadedFileIndex: {},

        isEditorOpen: false,

        editingFile: {},

        currentRatio: '',

        editor: {},

        init: async function () {
            FilePond.setOptions(locales[locale] ?? locales['en'])

            this.pond = FilePond.create(this.$refs.input, {
                acceptedFileTypes,
                allowImageExifOrientation: shouldOrientImageFromExif,
                allowPaste: false,
                allowReorder: isReorderable,
                allowImagePreview: isPreviewable,
                allowVideoPreview: isPreviewable,
                allowAudioPreview: isPreviewable,
                allowImageTransform: shouldTransformImage,
                credits: false,
                files: await this.getFiles(),
                imageCropAspectRatio,
                imagePreviewHeight,
                imageResizeTargetHeight,
                imageResizeTargetWidth,
                imageResizeMode,
                imageResizeUpscale,
                itemInsertLocation: shouldAppendFiles ? 'after' : 'before',
                ...(placeholder && { labelIdle: placeholder }),
                maxFileSize: maxSize,
                minFileSize: minSize,
                styleButtonProcessItemPosition: uploadButtonPosition,
                styleButtonRemoveItemPosition: removeUploadedFileButtonPosition,
                styleLoadIndicatorPosition: loadingIndicatorPosition,
                stylePanelAspectRatio: panelAspectRatio,
                stylePanelLayout: panelLayout,
                styleProgressIndicatorPosition: uploadProgressIndicatorPosition,
                server: {
                    load: async (source, load) => {
                        let response = await fetch(source, {
                            cache: 'no-store',
                        })
                        let blob = await response.blob()

                        load(blob)
                    },
                    process: (
                        fieldName,
                        file,
                        metadata,
                        load,
                        error,
                        progress,
                    ) => {
                        this.shouldUpdateState = false

                        let fileKey = (
                            [1e7] +
                            -1e3 +
                            -4e3 +
                            -8e3 +
                            -1e11
                        ).replace(/[018]/g, (c) =>
                            (
                                c ^
                                (crypto.getRandomValues(new Uint8Array(1))[0] &
                                    (15 >> (c / 4)))
                            ).toString(16),
                        )

                        uploadUsing(
                            fileKey,
                            file,
                            (fileKey) => {
                                this.shouldUpdateState = true

                                load(fileKey)
                            },
                            error,
                            progress,
                        )
                    },
                    remove: async (source, load) => {
                        let fileKey = this.uploadedFileIndex[source] ?? null

                        if (!fileKey) {
                            return
                        }

                        await deleteUploadedFileUsing(fileKey)

                        load()
                    },
                    revert: async (uniqueFileId, load) => {
                        await removeUploadedFileUsing(uniqueFileId)

                        load()
                    },
                },
                allowImageEdit: hasImageEditor,
                imageEditEditor: {
                    open: (file) => this.loadEditor(file),
                    onconfirm: () => {},
                    oncancel: () => this.closeEditor(),
                    onclose: () => this.closeEditor(),
                },
            })

            this.$watch('state', async () => {
                if (!this.pond) {
                    return
                }

                if (!this.shouldUpdateState) {
                    return
                }

                // We don't want to overwrite the files that are already in the input, if they haven't been saved yet.
                if (
                    this.state !== null &&
                    Object.values(this.state).filter((file) =>
                        file.startsWith('livewire-file:'),
                    ).length
                ) {
                    this.lastState = null

                    return
                }

                // Don't do anything if the state hasn't changed
                if (JSON.stringify(this.state) === this.lastState) {
                    return
                }

                this.lastState = JSON.stringify(this.state)

                this.pond.files = await this.getFiles()
            })

            this.pond.on('reorderfiles', async (files) => {
                const orderedFileKeys = files
                    .map((file) =>
                        file.source instanceof File
                            ? file.serverId
                            : this.uploadedFileIndex[file.source] ?? null,
                    ) // file.serverId is null for a file that is not yet uploaded
                    .filter((fileKey) => fileKey)

                await reorderUploadedFilesUsing(
                    shouldAppendFiles
                        ? orderedFileKeys
                        : orderedFileKeys.reverse(),
                )
            })

            this.pond.on('initfile', async (fileItem) => {
                if (!isDownloadable) {
                    return
                }

                if (isAvatar) {
                    return
                }

                this.insertDownloadLink(fileItem)
            })

            this.pond.on('initfile', async (fileItem) => {
                if (!isOpenable) {
                    return
                }

                if (isAvatar) {
                    return
                }

                this.insertOpenLink(fileItem)
            })

            this.pond.on('addfilestart', async (file) => {
                if (file.status !== FilePond.FileStatus.PROCESSING_QUEUED) {
                    return
                }

                this.dispatchFormEvent('file-upload-started')
            })

            const handleFileProcessing = async () => {
                if (
                    this.pond
                        .getFiles()
                        .filter(
                            (file) =>
                                file.status ===
                                    FilePond.FileStatus.PROCESSING ||
                                file.status ===
                                    FilePond.FileStatus.PROCESSING_QUEUED,
                        ).length
                ) {
                    return
                }

                this.dispatchFormEvent('file-upload-finished')
            }

            this.pond.on('processfile', handleFileProcessing)

            this.pond.on('processfileabort', handleFileProcessing)

            this.pond.on('processfilerevert', handleFileProcessing)
        },

        destroy: function () {
            this.editor.destroy()
            this.editor = null

            FilePond.destroy(this.$refs.input)
            this.pond = null
        },

        dispatchFormEvent: function (name) {
            this.$el.closest('form')?.dispatchEvent(
                new CustomEvent(name, {
                    composed: true,
                    cancelable: true,
                }),
            )
        },

        getUploadedFiles: async function () {
            const uploadedFiles = await getUploadedFilesUsing()

            this.fileKeyIndex = uploadedFiles ?? {}

            this.uploadedFileIndex = Object.entries(this.fileKeyIndex)
                .filter(([key, value]) => value?.url)
                .reduce((obj, [key, value]) => {
                    obj[value.url] = key

                    return obj
                }, {})
        },

        getFiles: async function () {
            await this.getUploadedFiles()

            let files = []

            for (const uploadedFile of Object.values(this.fileKeyIndex)) {
                if (!uploadedFile) {
                    continue
                }

                files.push({
                    source: uploadedFile.url,
                    options: {
                        type: 'local',
                        ...(/^image/.test(uploadedFile.type)
                            ? {}
                            : {
                                  file: {
                                      name: uploadedFile.name,
                                      size: uploadedFile.size,
                                      type: uploadedFile.type,
                                  },
                              }),
                    },
                })
            }

            return shouldAppendFiles ? files : files.reverse()
        },

        insertDownloadLink: function (file) {
            if (file.origin !== FilePond.FileOrigin.LOCAL) {
                return
            }

            const anchor = this.getDownloadLink(file)

            if (!anchor) {
                return
            }

            document
                .getElementById(`filepond--item-${file.id}`)
                .querySelector('.filepond--file-info-main')
                .prepend(anchor)
        },

        insertOpenLink: function (file) {
            if (file.origin !== FilePond.FileOrigin.LOCAL) {
                return
            }

            const anchor = this.getOpenLink(file)

            if (!anchor) {
                return
            }

            document
                .getElementById(`filepond--item-${file.id}`)
                .querySelector('.filepond--file-info-main')
                .prepend(anchor)
        },

        getDownloadLink: function (file) {
            let fileSource = file.source

            if (!fileSource) {
                return
            }

            const anchor = document.createElement('a')
            anchor.className = 'filepond--download-icon'
            anchor.href = fileSource
            anchor.download = file.file.name

            return anchor
        },

        getOpenLink: function (file) {
            let fileSource = file.source

            if (!fileSource) {
                return
            }

            const anchor = document.createElement('a')
            anchor.className = 'filepond--open-icon'
            anchor.href = fileSource
            anchor.target = '_blank'

            return anchor
        },

        initEditor: function () {
            if (isDisabled) {
                return
            }

            if (!hasImageEditor) {
                return
            }

            this.editor = new Cropper(this.$refs.editor, {
                aspectRatio:
                    imageEditorViewportWidth / imageEditorViewportHeight,
                autoCropArea: 1,
                center: true,
                crop: (event) => {
                    this.$refs.xPositionInput.value = Math.round(event.detail.x)
                    this.$refs.yPositionInput.value = Math.round(event.detail.y)
                    this.$refs.heightInput.value = Math.round(
                        event.detail.height,
                    )
                    this.$refs.widthInput.value = Math.round(event.detail.width)
                    this.$refs.rotationInput.value = event.detail.rotate
                },
                cropBoxResizable: true,
                guides: true,
                highlight: true,
                responsive: true,
                toggleDragModeOnDblclick: true,
                viewMode: imageEditorMode,
                wheelZoomRatio: 0.02,
            })
        },

        closeEditor: function () {
            this.editingFile = {}

            this.isEditorOpen = false

            this.editor.destroy()
            this.editor = null
        },

        fixImageDimensions: function (file, callback) {
            if (file.type !== 'image/svg+xml') {
                return callback(file)
            }

            const svgReader = new FileReader()

            svgReader.onload = (event) => {
                const svgElement = new DOMParser()
                    .parseFromString(event.target.result, 'image/svg+xml')
                    ?.querySelector('svg')

                if (!svgElement) {
                    return callback(file)
                }

                const viewBoxAttribute = ['viewBox', 'ViewBox', 'viewbox'].find(
                    (attribute) => svgElement.hasAttribute(attribute),
                )

                if (!viewBoxAttribute) {
                    return callback(file)
                }

                const viewBox = svgElement
                    .getAttribute(viewBoxAttribute)
                    .split(' ')

                if (!viewBox || viewBox.length !== 4) {
                    return callback(file)
                }

                svgElement.setAttribute('width', parseFloat(viewBox[2]) + 'pt')
                svgElement.setAttribute('height', parseFloat(viewBox[3]) + 'pt')

                return callback(
                    new File(
                        [
                            new Blob(
                                [
                                    new XMLSerializer().serializeToString(
                                        svgElement,
                                    ),
                                ],
                                { type: 'image/svg+xml' },
                            ),
                        ],
                        file.name,
                        {
                            type: 'image/svg+xml',
                            _relativePath: '',
                        },
                    ),
                )
            }

            svgReader.readAsText(file)
        },

        loadEditor: function (file) {
            if (isDisabled) {
                return
            }

            if (!hasImageEditor) {
                return
            }

            if (!file) {
                return
            }

            const isFileSvg = file.type === 'image/svg+xml'

            if (!canEditSvgs && isFileSvg) {
                alert(disabledSvgEditingMessage)

                return
            }

            if (
                isSvgEditingConfirmed &&
                isFileSvg &&
                !confirm(confirmSvgEditingMessage)
            ) {
                return
            }

            this.fixImageDimensions(file, (editingFile) => {
                this.editingFile = editingFile

                this.initEditor()

                const reader = new FileReader()

                reader.onload = (event) => {
                    this.isEditorOpen = true

                    setTimeout(
                        () => this.editor.replace(event.target.result),
                        200,
                    )
                }

                reader.readAsDataURL(file)
            })
        },

        saveEditor: function () {
            if (isDisabled) {
                return
            }

            if (!hasImageEditor) {
                return
            }

            this.editor
                .getCroppedCanvas({
                    fillColor: imageEditorEmptyFillColor,
                    height: imageResizeTargetHeight,
                    imageSmoothingEnabled: true,
                    imageSmoothingQuality: 'high',
                    width: imageResizeTargetWidth,
                })
                .toBlob((croppedImage) => {
                    if (isMultiple) {
                        this.pond.removeFile(
                            this.pond
                                .getFiles()
                                .find(
                                    (uploadedFile) =>
                                        uploadedFile.filename ===
                                        this.editingFile.name,
                                )?.id,
                            { revert: true },
                        )
                    }

                    this.$nextTick(() => {
                        this.shouldUpdateState = false

                        let editingFileName = this.editingFile.name.slice(
                            0,
                            this.editingFile.name.lastIndexOf('.'),
                        )
                        let editingFileExtension = this.editingFile.name
                            .split('.')
                            .pop()

                        if (editingFileExtension === 'svg') {
                            editingFileExtension = 'png'
                        }

                        const fileNameVersionRegex = /-v(\d+)/

                        if (fileNameVersionRegex.test(editingFileName)) {
                            editingFileName = editingFileName.replace(
                                fileNameVersionRegex,
                                (match, number) => {
                                    const newNumber = Number(number) + 1

                                    return `-v${newNumber}`
                                },
                            )
                        } else {
                            editingFileName += '-v1'
                        }

                        this.pond
                            .addFile(
                                new File(
                                    [croppedImage],
                                    `${editingFileName}.${editingFileExtension}`,
                                    {
                                        type:
                                            this.editingFile.type ===
                                            'image/svg+xml'
                                                ? 'image/png'
                                                : this.editingFile.type,
                                        lastModified: new Date().getTime(),
                                    },
                                ),
                            )
                            .then(() => {
                                this.closeEditor()
                            })
                            .catch(() => {
                                this.closeEditor()
                            })
                    })
                }, this.editingFile.type)
        },
    }
}

import ar from 'filepond/locale/ar-ar'
import cs from 'filepond/locale/cs-cz'
import da from 'filepond/locale/da-dk'
import de from 'filepond/locale/de-de'
import en from 'filepond/locale/en-en'
import es from 'filepond/locale/es-es'
import fa from 'filepond/locale/fa_ir'
import fi from 'filepond/locale/fi-fi'
import fr from 'filepond/locale/fr-fr'
import hu from 'filepond/locale/hu-hu'
import id from 'filepond/locale/id-id'
import it from 'filepond/locale/it-it'
import nl from 'filepond/locale/nl-nl'
import pl from 'filepond/locale/pl-pl'
import pt_BR from 'filepond/locale/pt-br'
import pt_PT from 'filepond/locale/pt-br'
import ro from 'filepond/locale/ro-ro'
import ru from 'filepond/locale/ru-ru'
import sv from 'filepond/locale/sv_se'
import tr from 'filepond/locale/tr-tr'
import uk from 'filepond/locale/uk-ua'
import vi from 'filepond/locale/vi-vi'
import zh_CN from 'filepond/locale/zh-cn'
import zh_TW from 'filepond/locale/zh-tw'

const locales = {
    ar,
    cs,
    da,
    de,
    en,
    es,
    fa,
    fi,
    fr,
    hu,
    id,
    it,
    nl,
    pl,
    pt_BR,
    pt_PT,
    ro,
    ru,
    sv,
    tr,
    uk,
    vi,
    zh_CN,
    zh_TW,
}
