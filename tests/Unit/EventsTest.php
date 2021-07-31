<?php

use Filament\Forms2\ComponentContainer;
use Filament\Forms2\Components\Component;
use Illuminate\Support\Str;
use Tests\TestCase;
use Tests\Unit\Fixtures\Livewire;

uses(TestCase::class);

test('registered event listeners are executed', function () {
    $event = Str::random();

    $this->expectExceptionMessage($event);

    ComponentContainer::make(Livewire::make())
        ->components([
            (new Component())
                ->registerListeners([
                    $event => [
                        fn () => throw new Exception($event),
                    ],
                ]),
        ])
        ->dispatchEvent($event);
});
