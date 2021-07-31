<?php

namespace Tests;

use Filament\Forms2\FormsServiceProvider;
use Orchestra\Testbench\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function getPackageProviders($app)
    {
        return [
            FormsServiceProvider::class,
        ];
    }
}
