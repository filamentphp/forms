<?php

use Filament\Forms2\ComponentContainer;
use Filament\Forms2\Components\Component;
use Illuminate\Support\Str;
use Tests\TestCase;
use Tests\Unit\Fixtures\Livewire;

uses(TestCase::class);

it('belongs to container', function () {
    expect((new Component()))
        ->container($container = ComponentContainer::make(Livewire::make()))
        ->getContainer()->toBe($container);
});

it('can access container\'s Livewire component', function () {
    expect(new Component())
        ->container(ComponentContainer::make($livewire = Livewire::make()))
        ->getLivewire()->toBe($livewire);
});

it('can be hidden', function () {
    expect(new Component())
        ->container(ComponentContainer::make(Livewire::make()))
        ->hidden()
        ->isHidden()->toBeTrue();
});

it('has child components', function () {
    $components = [];

    foreach (range(1, $count = 5) as $i) {
        $components[] = new Component();
    }

    expect($parentComponent = new Component())
        ->container(ComponentContainer::make(Livewire::make()))
        ->childComponents($components)
        ->getChildComponentContainer()
        ->getComponents()
        ->toHaveCount($count)
        ->each(
            fn ($component) => $component
                ->toBeInstanceOf(Component::class)
                ->getContainer()->getParentComponent()->toBe($parentComponent),
        );
});

it('has hidden child components', function () {
    $components = [];

    foreach (range(1, $visibleCount = 5) as $i) {
        $components[] = new Component();
    }

    foreach (range(1, 5) as $i) {
        $components[] = (new Component())->hidden();
    }

    expect($parentComponent = new Component())
        ->container(ComponentContainer::make(Livewire::make()))
        ->childComponents($components)
        ->getChildComponentContainer()
        ->getComponents()
        ->toHaveCount($visibleCount)
        ->each(
            fn ($component) => $component
                ->toBeInstanceOf(Component::class)
                ->isHidden()->toBeFalse()
                ->getContainer()->getParentComponent()->toBe($parentComponent),
        );
});

it('has extra attributes', function () {
    $attributes = [];

    foreach (range(1, $count = 5) as $i) {
        $attributes[Str::random()] = Str::random();
    }

    expect(new Component())
        ->container(ComponentContainer::make(Livewire::make()))
        ->extraAttributes($attributes)
        ->getExtraAttributes()
        ->toBe($attributes);
});
