<?php

use Filament\Forms2\ComponentContainer;
use Filament\Forms2\Components\Component;
use Illuminate\Support\Str;
use Tests\TestCase;
use Tests\Unit\Fixtures\Livewire;

uses(TestCase::class);

test('container has state path', function () {
    $container = ComponentContainer::make(Livewire::make())
        ->statePath($containerStatePath = Str::random());

    expect($container)
        ->getStatePath()->toBe($containerStatePath);
});

test('container has state path and inherits state path from parent component', function () {
    $container = ComponentContainer::make(Livewire::make())
        ->parentComponent(
            (new Component())
                ->container(ComponentContainer::make(Livewire::make()))
                ->statePath($parentComponentStatePath = Str::random()),
        )
        ->statePath($containerStatePath = Str::random());

    expect($container)
        ->getStatePath()->toBe("{$parentComponentStatePath}.{$containerStatePath}");
});

test('component has state path', function () {
    $component = (new Component())
        ->container(ComponentContainer::make(Livewire::make()))
        ->statePath($componentStatePath = Str::random());

    expect($component)
        ->getStatePath()->toBe($componentStatePath);
});

test('component inherits state path from container', function () {
    $component = (new Component())
        ->container(
            ComponentContainer::make(Livewire::make())
                ->statePath($containerStatePath = Str::random()),
        );

    expect($component)
        ->getStatePath()->toBe($containerStatePath);
});

test('component has state path and inherits state path from container', function () {
    $component = (new Component())
        ->container(
            ComponentContainer::make(Livewire::make())
                ->statePath($containerStatePath = Str::random()),
        )
        ->statePath($componentStatePath = Str::random());

    expect($component)
        ->getStatePath()->toBe("{$containerStatePath}.{$componentStatePath}");
});

test('state can be hydrated from array', function () {
    ComponentContainer::make($livewire = Livewire::make())
        ->statePath('data')
        ->components([
            (new Component())
                ->statePath($statePath = Str::random()),
        ])
        ->hydrateState([$statePath => ($state = Str::random())]);

    expect($livewire)
        ->getData()->toBe([$statePath => $state]);
});

test('state can be hydrated from defaults', function () {
    ComponentContainer::make($livewire = Livewire::make())
        ->statePath('data')
        ->components([
            (new Component())
                ->statePath($statePath = Str::random())
                ->default($state = Str::random()),
        ])
        ->hydrateState();

    expect($livewire)
        ->getData()->toBe([$statePath => $state]);
});

test('state can be hydrated using custom logic', function () {
    ComponentContainer::make($livewire = Livewire::make())
        ->statePath('data')
        ->components([
            (new Component())
                ->statePath($statePath = Str::random())
                ->hydrateStateUsing(fn ($state) => strrev($state)),
        ])
        ->hydrateState([$statePath => ($value = Str::random())]);

    expect($livewire)
        ->getData()->toBe([$statePath => strrev($value)]);
});

test('custom logic can be executed after state is updated', function () {
    ComponentContainer::make($livewire = Livewire::make())
        ->statePath('data')
        ->components([
            ($component = new Component())
                ->statePath($statePath = Str::random())
                ->afterStateUpdated(fn (callable $set, $state) => $set($component, strval($state))),
        ])
        ->hydrateState([$statePath => ($state = Str::random())])
        ->callAfterStateUpdated($statePath);

    expect($livewire)
        ->getData()->toBe([$statePath => strval($state)]);
});
