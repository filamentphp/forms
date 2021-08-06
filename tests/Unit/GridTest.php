<?php

use Filament\Forms2\ComponentContainer;
use Filament\Forms2\Components\Component;
use Tests\TestCase;
use Tests\Unit\Fixtures\Livewire;

uses(TestCase::class);

test('can get number of container columns at all breakpoints', function () {
    $container = ComponentContainer::make(Livewire::make())
        ->columns([
            '2xl' => $columnsAt2xl = rand(1, 12),
        ]);

    expect($container)
        ->getColumns()
            ->toHaveKey('default')
            ->toHaveKey('sm')
            ->toHaveKey('md')
            ->toHaveKey('lg')
            ->toHaveKey('xl')
            ->toHaveKey('2xl', $columnsAt2xl);
});

test('can get number of container columns at one breakpoint', function () {
    $container = ComponentContainer::make(Livewire::make())
        ->columns([
            '2xl' => $columnsAt2xl = rand(1, 12),
        ]);

    expect($container)
        ->getColumns('2xl')->toBe($columnsAt2xl);
});

test('can set number of container columns at `lg` breakpoint', function () {
    $container = ComponentContainer::make(Livewire::make())
        ->columns($columns = rand(1, 12));

    expect($container)
        ->getColumns('lg')->toBe($columns);
});

test('can get component column span at all breakpoints', function () {
    $component = ((new Component()))
        ->container(ComponentContainer::make(Livewire::make()))
        ->columnSpan([
            '2xl' => $spanAt2xl = rand(1, 12),
        ]);

    expect($component)
        ->getColumnSpan()
            ->toHaveKey('default')
            ->toHaveKey('sm')
            ->toHaveKey('md')
            ->toHaveKey('lg')
            ->toHaveKey('xl')
            ->toHaveKey('2xl', $spanAt2xl);
});

test('can get component column span at one breakpoint', function () {
    $component = ((new Component()))
        ->container(ComponentContainer::make(Livewire::make()))
        ->columnSpan([
            '2xl' => $spanAt2xl = rand(1, 12),
        ]);

    expect($component)
        ->getColumnSpan('2xl')->toBe($spanAt2xl);
});

test('can set component column span at `default` breakpoint', function () {
    $component = ((new Component()))
        ->container(ComponentContainer::make(Livewire::make()))
        ->columnSpan($span = rand(1, 12));

    expect($component)
        ->getColumnSpan('default')->toBe($span);
});
