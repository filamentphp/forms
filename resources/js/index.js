import DateTimePickerFormComponentAlpinePlugin from './components/date-time-picker'
import FileUploadFormComponentAlpinePlugin from './components/file-upload'
import SelectFormComponentAlpinePlugin from './components/select'

export default (Alpine) => {
    Alpine.plugin(DateTimePickerFormComponentAlpinePlugin)
    Alpine.plugin(FileUploadFormComponentAlpinePlugin)
    Alpine.plugin(SelectFormComponentAlpinePlugin)
}
