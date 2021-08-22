import DateTimePickerFormComponentAlpinePlugin from './components/date-time-picker'
import FileUploadFormComponentAlpinePlugin from './components/file-upload'
import RichEditorFormComponentAlpinePlugin from './components/rich-editor'
import SelectFormComponentAlpinePlugin from './components/select'

export default (Alpine) => {
    Alpine.plugin(DateTimePickerFormComponentAlpinePlugin)
    Alpine.plugin(FileUploadFormComponentAlpinePlugin)
    Alpine.plugin(RichEditorFormComponentAlpinePlugin)
    Alpine.plugin(SelectFormComponentAlpinePlugin)
}
