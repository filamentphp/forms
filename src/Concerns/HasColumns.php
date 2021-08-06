<?php

namespace Filament\Forms2\Concerns;

use Filament\Forms2\ComponentContainer;

trait HasColumns
{
    protected array $columns = [
        'default' => 1,
        'sm' => null,
        'md' => null,
        'lg' => 2,
        'xl' => null,
        '2xl' => null,
    ];

    public function columns(array | int | null $columns): static
    {
        if (! is_array($columns)) {
            $columns = [
                'lg' => $columns,
            ];
        }

        $this->columns = array_merge($this->columns, $columns);

        return $this;
    }

    public function getColumns($breakpoint = null): array | int | null
    {
        if ($this instanceof ComponentContainer && ($this->getParentComponent() !== null)) {
            $columns = $this->getParentComponent()->getColumns($breakpoint);
        } else {
            $columns = $this->columns;
        }

        if ($breakpoint !== null) {
            $columns = $columns[$breakpoint] ?? null;
        }

        return $columns;
    }
}
