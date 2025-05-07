import { EditorView, basicSetup } from 'codemirror-v6'
import { indentWithTab } from '@codemirror/commands'
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { php } from '@codemirror/lang-php'
import { EditorState } from '@codemirror/state'
import { keymap } from '@codemirror/view'

export default function codeEditorFormComponent({ isDisabled, state }) {
    return {
        editor: null,

        state,

        init: function () {
            this.editor = new EditorView({
                parent: this.$refs.editor,
                state: EditorState.create({
                    doc: this.state,
                    extensions: [
                        basicSetup,
                        keymap.of([indentWithTab]),
                        EditorState.readOnly.of(isDisabled),
                        EditorView.editable.of(!isDisabled),
                        EditorView.updateListener.of((viewUpdate) => {
                            if (!viewUpdate.docChanged) {
                                return
                            }

                            this.state = viewUpdate.state.doc.toString()
                        }),
                        css(),
                        html(),
                        javascript(),
                        json(),
                        php(),
                    ],
                }),
            })

            this.$watch('state', () => {
                if (this.editor.state.doc.toString() === this.state) {
                    return
                }

                this.editor.dispatch({
                    changes: {
                        from: 0,
                        to: this.editor.state.doc.length,
                        insert: this.state,
                    },
                })
            })
        },
    }
}
