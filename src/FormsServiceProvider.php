<?php

namespace Filament\Forms2;

use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class FormsServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package
            ->name('forms2')
            ->hasConfigFile()
            ->hasViews();
    }
}
