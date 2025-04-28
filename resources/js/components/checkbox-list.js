export default function checkboxListFormComponent({ livewireId }) {
    return {
        areAllCheckboxesChecked: false,

        checkboxListOptions: [],

        search: '',

        visibleCheckboxListOptions: [],

        init: function () {
            this.checkboxListOptions = Array.from(
                this.$root.querySelectorAll('.fi-fo-checkbox-list-option'),
            )

            this.updateVisibleCheckboxListOptions()

            this.$nextTick(() => {
                this.checkIfAllCheckboxesAreChecked()
            })

            Livewire.hook(
                'commit',
                ({ component, commit, succeed, fail, respond }) => {
                    succeed(({ snapshot, effect }) => {
                        this.$nextTick(() => {
                            if (component.id !== livewireId) {
                                return
                            }

                            this.checkboxListOptions = Array.from(
                                this.$root.querySelectorAll(
                                    '.fi-fo-checkbox-list-option',
                                ),
                            )

                            this.updateVisibleCheckboxListOptions()

                            this.checkIfAllCheckboxesAreChecked()
                        })
                    })
                },
            )

            this.$watch('search', () => {
                this.updateVisibleCheckboxListOptions()
                this.checkIfAllCheckboxesAreChecked()
            })
        },

        checkIfAllCheckboxesAreChecked: function () {
            this.areAllCheckboxesChecked =
                this.visibleCheckboxListOptions.length ===
                this.visibleCheckboxListOptions.filter((checkboxLabel) =>
                    checkboxLabel.querySelector('input[type=checkbox]:checked'),
                ).length
        },

        toggleAllCheckboxes: function () {
            this.checkIfAllCheckboxesAreChecked()

            const inverseAreAllCheckboxesChecked = !this.areAllCheckboxesChecked

            this.visibleCheckboxListOptions.forEach((checkboxLabel) => {
                const checkbox = checkboxLabel.querySelector(
                    'input[type=checkbox]',
                )

                if (checkbox.disabled) {
                    return
                }

                checkbox.checked = inverseAreAllCheckboxesChecked
                checkbox.dispatchEvent(new Event('change'))
            })

            this.areAllCheckboxesChecked = inverseAreAllCheckboxesChecked
        },

        updateVisibleCheckboxListOptions: function () {
            this.visibleCheckboxListOptions = this.checkboxListOptions.filter(
                (checkboxListItem) => {
                    if (['', null, undefined].includes(this.search)) {
                        return true
                    }

                    if (
                        checkboxListItem
                            .querySelector('.fi-fo-checkbox-list-option-label')
                            ?.innerText.toLowerCase()
                            .includes(this.search.toLowerCase())
                    ) {
                        return true
                    }

                    return checkboxListItem
                        .querySelector(
                            '.fi-fo-checkbox-list-option-description',
                        )
                        ?.innerText.toLowerCase()
                        .includes(this.search.toLowerCase())
                },
            )
        },
    }
}
