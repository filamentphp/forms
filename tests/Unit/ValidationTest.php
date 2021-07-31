<?php

use Filament\Forms2\ComponentContainer;
use Filament\Forms2\Components\Component;
use Filament\Forms2\Components\Field;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;
use Tests\Unit\Fixtures\Livewire;

uses(TestCase::class);

test('fields can be required', function () {
    $rules = [];

    try {
        ComponentContainer::make(Livewire::make())
            ->statePath('data')
            ->components([
                $field = (new Field(Str::random()))
                    ->required(),
            ])
            ->validate();
    } catch (ValidationException $exception) {
        $rules = array_keys($exception->validator->failed()[$field->getStatePath()]);
    }

    expect($rules)
        ->toContain('Required');
});

test('fields use custom validation rules', function () {
    $rules = [];

    try {
        ComponentContainer::make(Livewire::make())
            ->statePath('data')
            ->components([
                $field = (new Field(Str::random()))
                    ->addValidationRule('email')
                    ->default(Str::random()),
            ])
            ->hydrateState()
            ->validate();
    } catch (ValidationException $exception) {
        $rules = array_keys($exception->validator->failed()[$field->getStatePath()]);
    }

    expect($rules)
        ->toContain('Email');
});

test('fields can be conditionally validated', function () {
    $rules = [];

    try {
        ComponentContainer::make(Livewire::make())
            ->statePath('data')
            ->components([
                $field = (new Field(Str::random()))
                    ->required($isRequired = rand(0, 1)),
            ])
            ->validate();
    } catch (ValidationException $exception) {
        $rules = array_keys($exception->validator->failed()[$field->getStatePath()]);
    }

    if ($isRequired) {
        expect($rules)
            ->toContain('Required');
    } else {
        expect($rules)
            ->not->toContain('Required');
    }
});