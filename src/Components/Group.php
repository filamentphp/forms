<?php

namespace Filament\Forms2\Components;

class Group extends Component
{
    protected string $view = 'forms2::components.group';

    final public function __construct(array $schema = [])
    {
        $this->schema($schema);
    }

    public static function make(array $schema = []): static
    {
        return new static($schema);
    }
}
