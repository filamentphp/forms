import { Editor } from '@tiptap/core'
import getExtensions from './rich-editor/extensions'
import { Selection } from '@tiptap/pm/state'

export default function richEditorFormComponent({
    extensions,
    key,
    isLiveDebounced,
    isLiveOnBlur,
    liveDebounce,
    livewireId,
    state,
    statePath,
    uploadingFileMessage,
}) {
    let editor

    return {
        state,

        editorSelection: { type: 'text', anchor: 1, head: 1 },

        isUploadingFile: false,

        shouldUpdateState: true,

        editorUpdatedAt: Date.now(),

        init: async function () {
            editor = new Editor({
                element: this.$refs.editor,
                extensions: await getExtensions({
                    customExtensionUrls: extensions,
                    key,
                    statePath,
                    uploadingFileMessage,
                    $wire: this.$wire,
                }),
                content: this.state,
            })

            editor.on('create', () => {
                this.editorUpdatedAt = Date.now()
            })

            editor.on(
                'update',
                Alpine.debounce(({ editor }) => {
                    this.editorUpdatedAt = Date.now()

                    this.state = editor.getJSON()

                    this.shouldUpdateState = false

                    if (isLiveDebounced) {
                        this.$wire.commit()
                    }
                }, liveDebounce ?? 300),
            )

            editor.on('selectionUpdate', ({ transaction }) => {
                this.editorUpdatedAt = Date.now()
                this.editorSelection = transaction.selection.toJSON()
            })

            if (isLiveOnBlur) {
                editor.on('blur', () => this.$wire.commit())
            }

            this.$watch('state', () => {
                if (!this.shouldUpdateState) {
                    this.shouldUpdateState = true

                    return
                }

                editor.commands.setContent(this.state)
            })

            window.addEventListener('run-rich-editor-commands', (event) => {
                if (event.detail.livewireId !== livewireId) {
                    return
                }

                if (event.detail.key !== key) {
                    return
                }

                this.runEditorCommands(event.detail)
            })

            window.addEventListener('rich-editor-uploading-file', (event) => {
                if (event.detail.livewireId !== livewireId) {
                    return
                }

                if (event.detail.key !== key) {
                    return
                }

                this.isUploadingFile = true

                event.stopPropagation()
            })

            window.addEventListener('rich-editor-uploaded-file', (event) => {
                if (event.detail.livewireId !== livewireId) {
                    return
                }

                if (event.detail.key !== key) {
                    return
                }

                this.isUploadingFile = false

                event.stopPropagation()
            })

            window.dispatchEvent(
                new CustomEvent(`schema-component-${livewireId}-${key}-loaded`),
            )
        },

        getEditor: function () {
            return editor
        },

        $getEditor: function () {
            return this.getEditor()
        },

        setEditorSelection: function (selection) {
            if (!selection) {
                return
            }

            this.editorSelection = selection

            editor
                .chain()
                .command(({ tr }) => {
                    tr.setSelection(
                        Selection.fromJSON(
                            editor.state.doc,
                            this.editorSelection,
                        ),
                    )

                    return true
                })
                .run()
        },

        runEditorCommands: function ({ commands, editorSelection }) {
            this.setEditorSelection(editorSelection)

            let commandChain = editor.chain()

            commands.forEach(
                (command) =>
                    (commandChain = commandChain[command.name](
                        ...(command.arguments ?? []),
                    )),
            )

            commandChain.run()
        },
    }
}
