<div
    x-data="{

        tab: null,

        init: function () {
            this.$watch('tab', () => this.updateQueryString())

            this.tab = this.getTabs()[@js($getActiveTab()) - 1]
        },

        getTabs: function () {
            return JSON.parse(this.$refs.tabsData.value)
        },

        updateQueryString: function () {
            if (! @js($isTabPersistedInQueryString())) {
                return
            }

            const url = new URL(window.location.href)
            url.searchParams.set(@js($getTabQueryStringKey()), this.tab)

            history.pushState(null, document.title, url.toString())
        },

    }"
    x-cloak
    {!! $getId() ? "id=\"{$getId()}\"" : null !!}
    {{ $attributes->merge($getExtraAttributes())->class([
        'filament-forms-tabs-component rounded-xl shadow-sm border border-gray-300 bg-white',
        'dark:bg-gray-800 dark:border-gray-700' => config('forms.dark_mode'),
    ]) }}
    {{ $getExtraAlpineAttributeBag() }}
    wire:key="{{ $this->id }}.{{ $getStatePath() }}.{{ \Filament\Forms\Components\Tabs::class }}.container"
>
    <input
        type="hidden"
        value='{{
            collect($getChildComponentContainer()->getComponents())
                ->filter(static fn (\Filament\Forms\Components\Tabs\Tab $tab): bool => ! $tab->isHidden())
                ->map(static fn (\Filament\Forms\Components\Tabs\Tab $tab) => $tab->getId())
                ->values()
                ->toJson()
        }}'
        x-ref="tabsData"
    />

    <div
        {!! $getLabel() ? 'aria-label="' . $getLabel() . '"' : null !!}
        role="tablist"
        @class([
            'filament-forms-tabs-component-header rounded-t-xl flex overflow-y-auto bg-gray-100',
            'dark:bg-gray-700' => config('forms.dark_mode'),
        ])
    >
        @foreach ($getChildComponentContainer()->getComponents() as $tab)
            @php
                $icon = $tab->getIcon();
                $iconPosition = $tab->getIconPosition();
                $iconColor = $tab->getIconColor();

                $iconColorClasses = match ($iconColor) {
                    'danger' => \Illuminate\Support\Arr::toCssClasses(['text-danger-700', 'dark:text-danger-500' => config('tables.dark_mode')]),
                    'primary' => \Illuminate\Support\Arr::toCssClasses(['text-primary-700', 'dark:text-primary-500' => config('tables.dark_mode')]),
                    'success' => \Illuminate\Support\Arr::toCssClasses(['text-success-700', 'dark:text-success-500' => config('tables.dark_mode')]),
                    'warning' => \Illuminate\Support\Arr::toCssClasses(['text-warning-700', 'dark:text-warning-500' => config('tables.dark_mode')]),
                    'secondary' => \Illuminate\Support\Arr::toCssClasses(['text-gray-700', 'dark:text-gray-300' => config('tables.dark_mode')]),
                    default => $iconColor,
                };
            @endphp
            
            <button
                type="button"
                aria-controls="{{ $tab->getId() }}"
                x-bind:aria-selected="tab === '{{ $tab->getId() }}'"
                x-on:click="tab = '{{ $tab->getId() }}'"
                role="tab"
                x-bind:tabindex="tab === '{{ $tab->getId() }}' ? 0 : -1"
                class="filament-forms-tabs-component-button flex items-center gap-2 shrink-0 p-3 text-sm font-medium"
                x-bind:class="{
                    'text-gray-500 hover:text-gray-800 focus:text-primary-600 @if (config('forms.dark_mode')) dark:text-gray-400 dark:hover:text-gray-200 dark:focus:text-primary-600 @endif': tab !== '{{ $tab->getId() }}',
                    'filament-forms-tabs-component-button-active bg-white text-primary-600 @if (config('forms.dark_mode')) dark:bg-gray-800 @endif': tab === '{{ $tab->getId() }}',
                }"
            >
                @if ($icon && $iconPosition === 'before')
                    <x-dynamic-component
                        :component="$icon"
                        @class([
                            'w-4 h-4',
                            $iconColorClasses,
                        ])
                    />
                @endif

                <span>{{ $tab->getLabel() }}</span>

                @if ($icon && $iconPosition === 'after')
                    <x-dynamic-component
                        :component="$icon"
                        @class([
                            'w-4 h-4',
                            $iconColorClasses,
                        ])
                    />
                @endif

                @if ($badge = $tab->getBadge())
                    <span
                        class="inline-flex items-center justify-center ml-auto rtl:ml-0 rtl:mr-auto min-h-4 px-2 py-0.5 text-xs font-medium tracking-tight rounded-xl whitespace-normal"
                        x-bind:class="{
                            'bg-gray-200 @if (config('forms.dark_mode')) dark:bg-gray-600 @endif': tab !== '{{ $tab->getId() }}',
                            'bg-primary-500/10 font-medium': tab === '{{ $tab->getId() }}',
                        }"
                    >
                        {{ $badge }}
                    </span>
                @endif
            </button>
        @endforeach
    </div>

    @foreach ($getChildComponentContainer()->getComponents() as $tab)
        {{ $tab }}
    @endforeach
</div>
