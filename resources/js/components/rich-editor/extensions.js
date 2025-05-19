import { UndoRedo } from '@tiptap/extensions'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Italic from '@tiptap/extension-italic'
import Image from './extension-image.js'
import Link from '@tiptap/extension-link'
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list'
import LocalFiles from './extension-local-files.js'
import Paragraph from '@tiptap/extension-paragraph'
import Strike from '@tiptap/extension-strike'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'

export default async ({
    customExtensionUrls,
    key,
    statePath,
    uploadingFileMessage,
    $wire,
}) => [
    Blockquote,
    Bold,
    BulletList,
    Code,
    CodeBlock,
    Document,
    Heading,
    Italic,
    Image,
    Link.configure({
        autolink: true,
        openOnClick: false,
    }),
    ListItem,
    LocalFiles.configure({
        key,
        statePath,
        uploadingMessage: uploadingFileMessage,
        $wire: () => $wire,
    }),
    OrderedList,
    Paragraph,
    Strike,
    Subscript,
    Superscript,
    Text,
    Underline,
    UndoRedo,
    ...(
        await Promise.all(
            customExtensionUrls.map(async (url) => {
                const absoluteUrlRegExp = new RegExp('^(?:[a-z+]+:)?//', 'i')

                if (!absoluteUrlRegExp.test(url)) {
                    url = new URL(url, document.baseURI).href
                }

                return (await import(url)).default
            }),
        )
    ).flat(),
]
