import Image from '@tiptap/extension-image'

export default Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            'data-id': {
                default: null,
            },
        }
    },
})
