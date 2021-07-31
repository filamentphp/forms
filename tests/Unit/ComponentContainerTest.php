<?php

use Filament\Forms2\ComponentContainer;
use Filament\Forms2\Components\Component;
use Illuminate\Support\Str;
use Tests\Unit\Fixtures\Livewire;
use Tests\TestCase;

uses(TestCase::class);

it('belongs to Livewire component', function () {
    expect(ComponentContainer::make($livewire = Livewire::make()))
        ->toBeInstanceOf(ComponentContainer::class)
        ->getLivewire()->toBe($livewire);
});

it('belongs to parent component', function () {
    expect(ComponentContainer::make(Livewire::make()))
        ->parentComponent($component = new Component())
        ->getParentComponent()->toBe($component);
});

it('has components', function () {
    $components = [];

    foreach (range(1, $count = 5) as $i) {
        $components[] = new Component();
    }

    expect($container = ComponentContainer::make(Livewire::make()))
        ->components($components)
        ->getComponents()
            ->toHaveCount($count)
            ->each(
                fn ($component) => $component
                    ->toBeInstanceOf(Component::class)
                    ->getContainer()->toBe($container),
            );
});

it('has hidden components', function () {
    $components = [];

    foreach (range(1, $visibleCount = 5) as $i) {
        $components[] = new Component();
    }

    foreach (range(1, 5) as $i) {
        $components[] = (new Component())->hidden();
    }

    expect($container = ComponentContainer::make(Livewire::make()))
        ->components($components)
        ->getComponents()
        ->toHaveCount($visibleCount)
        ->each(
            fn ($component) => $component
                ->toBeInstanceOf(Component::class)
                ->isHidden()->toBeFalse()
                ->getContainer()->toBe($container),
        );
});

it('has state path', function () {
    expect(ComponentContainer::make(Livewire::make()))
        ->statePath($statePath = Str::random())
        ->getStatePath()->toBe($statePath);
});

it('inherits state path from parent component', function () {
    $parentComponent = (new Component())
        ->container(ComponentContainer::make(Livewire::make()))
        ->statePath($statePath = Str::random());

    expect(ComponentContainer::make(Livewire::make()))
        ->parentComponent($parentComponent)
        ->getStatePath()->toBe($statePath);
});

it('has state path and inherits state path from parent component', function () {
    $parentComponent = (new Component())
        ->container(ComponentContainer::make(Livewire::make()))
        ->statePath($parentComponentStatePath = Str::random());

    expect(ComponentContainer::make(Livewire::make()))
        ->parentComponent($parentComponent)
        ->statePath($statePath = Str::random())
        ->getStatePath()->toBe("{$parentComponentStatePath}.{$statePath}");
});