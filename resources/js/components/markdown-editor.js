window.CodeMirror = require('codemirror/lib/codemirror')

require('codemirror')
require('codemirror/addon/mode/overlay')
require('codemirror/addon/edit/continuelist')
require('codemirror/addon/display/placeholder')
require('codemirror/addon/selection/mark-selection')
require('codemirror/addon/search/searchcursor')
require('codemirror/mode/clike/clike')
require('codemirror/mode/cmake/cmake')
require('codemirror/mode/css/css')
require('codemirror/mode/diff/diff')
require('codemirror/mode/django/django')
require('codemirror/mode/dockerfile/dockerfile')
require('codemirror/mode/gfm/gfm')
require('codemirror/mode/go/go')
require('codemirror/mode/htmlmixed/htmlmixed')
require('codemirror/mode/http/http')
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/jinja2/jinja2')
require('codemirror/mode/jsx/jsx')
require('codemirror/mode/markdown/markdown')
require('codemirror/mode/nginx/nginx')
require('codemirror/mode/pascal/pascal')
require('codemirror/mode/perl/perl')
require('codemirror/mode/php/php')
require('codemirror/mode/protobuf/protobuf')
require('codemirror/mode/python/python')
require('codemirror/mode/ruby/ruby')
require('codemirror/mode/rust/rust')
require('codemirror/mode/sass/sass')
require('codemirror/mode/shell/shell')
require('codemirror/mode/sql/sql')
require('codemirror/mode/stylus/stylus')
require('codemirror/mode/swift/swift')
require('codemirror/mode/vue/vue')
require('codemirror/mode/xml/xml')
require('codemirror/mode/yaml/yaml')

require('./markdown-editor/EasyMDE')

CodeMirror.commands.tabAndIndentMarkdownList = function (codemirror) {
    var ranges = codemirror.listSelections()
    var pos = ranges[0].head
    var eolState = codemirror.getStateAfter(pos.line)
    var inList = eolState.list !== false

    if (inList) {
        codemirror.execCommand('indentMore')
        return
    }

    if (codemirror.options.indentWithTabs) {
        codemirror.execCommand('insertTab')

        return
    }

    var spaces = Array(codemirror.options.tabSize + 1).join(' ')
    codemirror.replaceSelection(spaces)
}

CodeMirror.commands.shiftTabAndUnindentMarkdownList = function (codemirror) {
    var ranges = codemirror.listSelections()
    var pos = ranges[0].head
    var eolState = codemirror.getStateAfter(pos.line)
    var inList = eolState.list !== false

    if (inList) {
        codemirror.execCommand('indentLess')

        return
    }

    if (codemirror.options.indentWithTabs) {
        codemirror.execCommand('insertTab')

        return
    }

    var spaces = Array(codemirror.options.tabSize + 1).join(' ')
    codemirror.replaceSelection(spaces)
}

export default function markdownEditorFormComponent({
    canAttachFiles,
    isLiveDebounced,
    isLiveOnBlur,
    liveDebounce,
    maxHeight,
    minHeight,
    placeholder,
    setUpUsing,
    state,
    translations,
    toolbarButtons,
    uploadFileAttachmentUsing,
}) {
    return {
        editor: null,

        state,

        init: async function () {
            if (this.$root._editor) {
                this.$root._editor.toTextArea()
                this.$root._editor = null
            }

            this.$root._editor = this.editor = new EasyMDE({
                autoDownloadFontAwesome: false,
                autoRefresh: true,
                autoSave: false,
                element: this.$refs.editor,
                imageAccept:
                    'image/png, image/jpeg, image/gif, image/avif, image/webp',
                imageUploadFunction: uploadFileAttachmentUsing,
                initialValue: this.state ?? '',
                maxHeight,
                minHeight,
                placeholder,
                previewImagesInEditor: true,
                spellChecker: false,
                status: [
                    {
                        className: 'upload-image',
                        defaultValue: '',
                    },
                ],
                toolbar: this.getToolbar(),
                uploadImage: canAttachFiles,
            })

            this.editor.codemirror.setOption(
                'direction',
                document.documentElement?.dir ?? 'ltr',
            )

            // When creating a link, highlight the URL instead of the label:
            this.editor.codemirror.on('changes', (instance, changes) => {
                try {
                    const lastChange = changes[changes.length - 1]

                    if (lastChange.origin === '+input') {
                        const urlPlaceholder = '(https://)'
                        const urlLineText =
                            lastChange.text[lastChange.text.length - 1]

                        if (
                            urlLineText.endsWith(urlPlaceholder) &&
                            urlLineText !== '[]' + urlPlaceholder
                        ) {
                            const from = lastChange.from
                            const to = lastChange.to
                            const isSelectionMultiline =
                                lastChange.text.length > 1
                            const baseIndex = isSelectionMultiline ? 0 : from.ch

                            setTimeout(() => {
                                instance.setSelection(
                                    {
                                        line: to.line,
                                        ch:
                                            baseIndex +
                                            urlLineText.lastIndexOf('(') +
                                            1,
                                    },
                                    {
                                        line: to.line,
                                        ch:
                                            baseIndex +
                                            urlLineText.lastIndexOf(')'),
                                    },
                                )
                            }, 25)
                        }
                    }
                } catch (error) {
                    // Revert to original behavior.
                }
            })

            this.editor.codemirror.on(
                'change',
                Alpine.debounce(() => {
                    if (!this.editor) {
                        return
                    }

                    this.state = this.editor.value()

                    if (isLiveDebounced) {
                        this.$wire.commit()
                    }
                }, liveDebounce ?? 300),
            )

            if (isLiveOnBlur) {
                this.editor.codemirror.on('blur', () => this.$wire.commit())
            }

            this.$watch('state', () => {
                if (!this.editor) {
                    return
                }

                if (this.editor.codemirror.hasFocus()) {
                    return
                }

                Alpine.raw(this.editor).value(this.state ?? '')
            })

            if (setUpUsing) {
                setUpUsing(this)
            }
        },

        destroy: function () {
            this.editor.cleanup()
            this.editor = null
        },

        getToolbar: function () {
            let toolbar = []

            toolbarButtons.forEach((buttonGroup) => {
                buttonGroup.forEach((button) =>
                    toolbar.push(this.getToolbarButton(button)),
                )

                if (buttonGroup.length > 0) {
                    toolbar.push('|')
                }
            })

            if (toolbar[toolbar.length - 1] === '|') {
                toolbar.pop()
            }

            return toolbar
        },

        getToolbarButton: function (name) {
            if (name === 'bold') {
                return this.getBoldToolbarButton()
            }

            if (name === 'italic') {
                return this.getItalicToolbarButton()
            }

            if (name === 'strike') {
                return this.getStrikeToolbarButton()
            }

            if (name === 'link') {
                return this.getLinkToolbarButton()
            }

            if (name === 'heading') {
                return this.getHeadingToolbarButton()
            }

            if (name === 'blockquote') {
                return this.getBlockquoteToolbarButton()
            }

            if (name === 'codeBlock') {
                return this.getCodeBlockToolbarButton()
            }

            if (name === 'bulletList') {
                return this.getBulletListToolbarButton()
            }

            if (name === 'orderedList') {
                return this.getOrderedListToolbarButton()
            }

            if (name === 'table') {
                return this.getTableToolbarButton()
            }

            if (name === 'attachFiles') {
                return this.getAttachFilesToolbarButton()
            }

            if (name === 'undo') {
                return this.getUndoToolbarButton()
            }

            if (name === 'redo') {
                return this.getRedoToolbarButton()
            }

            console.error(`Markdown editor toolbar button "${name}" not found.`)
        },

        getBoldToolbarButton: function () {
            return {
                name: 'bold',
                action: EasyMDE.toggleBold,
                title: translations.toolbar_buttons?.bold,
            }
        },

        getItalicToolbarButton: function () {
            return {
                name: 'italic',
                action: EasyMDE.toggleItalic,
                title: translations.toolbar_buttons?.italic,
            }
        },

        getStrikeToolbarButton: function () {
            return {
                name: 'strikethrough',
                action: EasyMDE.toggleStrikethrough,
                title: translations.toolbar_buttons?.strike,
            }
        },

        getLinkToolbarButton: function () {
            return {
                name: 'link',
                action: EasyMDE.drawLink,
                title: translations.toolbar_buttons?.link,
            }
        },

        getHeadingToolbarButton: function () {
            return {
                name: 'heading',
                action: EasyMDE.toggleHeadingSmaller,
                title: translations.toolbar_buttons?.heading,
            }
        },

        getBlockquoteToolbarButton: function () {
            return {
                name: 'quote',
                action: EasyMDE.toggleBlockquote,
                title: translations.toolbar_buttons?.blockquote,
            }
        },

        getCodeBlockToolbarButton: function () {
            return {
                name: 'code',
                action: EasyMDE.toggleCodeBlock,
                title: translations.toolbar_buttons?.code_block,
            }
        },

        getBulletListToolbarButton: function () {
            return {
                name: 'unordered-list',
                action: EasyMDE.toggleUnorderedList,
                title: translations.toolbar_buttons?.bullet_list,
            }
        },

        getOrderedListToolbarButton: function () {
            return {
                name: 'ordered-list',
                action: EasyMDE.toggleOrderedList,
                title: translations.toolbar_buttons?.ordered_list,
            }
        },

        getTableToolbarButton: function () {
            return {
                name: 'table',
                action: EasyMDE.drawTable,
                title: translations.toolbar_buttons?.table,
            }
        },

        getAttachFilesToolbarButton: function () {
            return {
                name: 'upload-image',
                action: EasyMDE.drawUploadedImage,
                title: translations.toolbar_buttons?.attach_files,
            }
        },

        getUndoToolbarButton: function () {
            return {
                name: 'undo',
                action: EasyMDE.undo,
                title: translations.toolbar_buttons?.undo,
            }
        },

        getRedoToolbarButton: function () {
            return {
                name: 'redo',
                action: EasyMDE.redo,
                title: translations.toolbar_buttons?.redo,
            }
        },
    }
}
