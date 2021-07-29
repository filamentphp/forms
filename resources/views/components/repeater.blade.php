<div class="py-6">
    @foreach ($getChildComponentContainers() as $index => $item)
        <div wire:key="{{ $item->getStatePath() }}">
            {{ $item }}
        </div>
    @endforeach

    <div>
        <button type="button" wire:click="dispatchFormEvent('repeater.addItem', '{{ $getStatePath() }}')">
            Add item to {{ $getName() }}
        </button>
    </div>
</div>
