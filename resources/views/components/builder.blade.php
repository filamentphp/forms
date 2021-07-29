<div class="py-6">
    @foreach ($getChildComponentContainers() as $index => $item)
        <div wire:key="{{ $item->getStatePath() }}">
            {{ $item }}
        </div>
    @endforeach

    <div>
        @foreach ($getChildComponentContainer()->getComponents() as $name => $block)
            <div>
                <button type="button" wire:click="dispatchFormEvent('builder.addItem', '{{ $getStatePath() }}', '{{ $name }}')">
                    Add {{ $name }}
                </button>
            </div>
        @endforeach
    </div>
</div>
