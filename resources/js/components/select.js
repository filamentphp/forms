export default (Alpine) => {
    Alpine.data('selectFormComponent', ({
        getSearchResultsUsing,
        isAutofocused,
        options,
        selectedOptionLabel,
        state,
        statePath,
    }) => {
        return {
            displayText: selectedOptionLabel,

            focusedOptionIndex: null,

            isAutofocused,

            isLoading: false,

            isOpen: false,

            options,

            search: '',

            state,

            init: function () {
                if (this.isAutofocused) this.openListbox()

                this.$watch('search', () => {
                    if (! this.isOpen || this.search === '' || this.search === null) {
                        this.options = options
                        this.focusedOptionIndex = 0

                        return
                    }

                    if (Object.keys(options).length) {
                        this.options = {}

                        let search = this.search.trim().toLowerCase()

                        for (let key in options) {
                            if (options[key].trim().toLowerCase().includes(search)) {
                                this.options[key] = options[key]
                            }
                        }

                        this.focusedOptionIndex = 0
                    } else {
                        this.isLoading = true

                        getSearchResultsUsing(statePath, this.search).then((options) => {
                            this.options = options
                            this.focusedOptionIndex = 0
                            this.isLoading = false
                        })
                    }
                })

                this.$watch('state', () => {
                    if (this.state in this.options) {
                        this.displayText = this.options[this.state]
                    } else if (! this.state) {
                        this.clearValue()
                    }
                })
            },

            clearValue: function () {
                this.state = null
                this.displayText = null

                this.closeListbox()
            },

            closeListbox: function () {
                this.isOpen = false

                this.focusedOptionIndex = null

                this.search = ''
            },

            evaluatePosition: function () {
                let availableHeight = window.innerHeight - this.$refs.button.offsetHeight

                let element = this.$refs.button

                while (element) {
                    availableHeight -= element.offsetTop

                    element = element.offsetParent
                }

                if (this.$refs.listbox.offsetHeight <= availableHeight) {
                    this.$refs.listbox.style.bottom = 'auto'

                    return
                }

                this.$refs.listbox.style.bottom = `${this.$refs.button.offsetHeight}px`
            },

            focusNextOption: function () {
                if (this.focusedOptionIndex === null) {
                    this.focusedOptionIndex = Object.keys(this.options).length - 1

                    return
                }

                if (this.focusedOptionIndex + 1 >= Object.keys(this.options).length) return

                this.focusedOptionIndex++

                this.$refs.listboxOptionsList.children[this.focusedOptionIndex].scrollIntoView({
                    block: 'center',
                })
            },

            focusPreviousOption: function () {
                if (this.focusedOptionIndex === null) {
                    this.focusedOptionIndex = 0

                    return
                }

                if (this.focusedOptionIndex <= 0) return

                this.focusedOptionIndex--

                this.$refs.listboxOptionsList.children[this.focusedOptionIndex].scrollIntoView({
                    block: 'center',
                })
            },

            openListbox: function () {
                this.focusedOptionIndex = Object.keys(this.options).indexOf(this.state)

                if (this.focusedOptionIndex < 0) this.focusedOptionIndex = 0

                this.isOpen = true

                this.$nextTick(() => {
                    this.$refs.search.focus()

                    this.evaluatePosition()

                    this.$refs.listboxOptionsList.children[this.focusedOptionIndex].scrollIntoView({
                        block: 'center'
                    })
                })
            },

            selectOption: function (index = null) {
                if (! this.isOpen) {
                    this.closeListbox()

                    return
                }

                this.state = Object.keys(this.options)[index ?? this.focusedOptionIndex]
                this.displayText = this.options[this.state]

                this.closeListbox()
            },

            toggleListboxVisibility: function () {
                if (this.isOpen) {
                    this.closeListbox()

                    return
                }

                this.openListbox()
            },
        }
    })
}