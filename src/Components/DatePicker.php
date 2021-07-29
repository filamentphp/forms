<?php

namespace Filament\Forms2\Components;

class DatePicker extends Field
{
    use Concerns\HasPlaceholder;

    protected static string $view = 'forms2::components.date-time-picker';

    protected $displayFormat;

    protected $firstDayOfWeek;

    protected $format;

    protected $hasSeconds = true;

    protected $hasTime = false;

    protected $maxDate;

    protected $minDate;

    public function setUp(): void
    {
        parent::setUp();

        $this->displayFormat('F j, Y');
        $this->resetFirstDayOfWeek();
        $this->format('Y-m-d');
    }

    public function displayFormat(string | callable $format): static
    {
        $this->displayFormat = $format;

        return $this;
    }

    public function firstDayOfWeek(int | callable $day): static
    {
        if ($day < 0 || $day > 7) {
            $day = $this->getDefaultFirstDayOfWeek();
        }

        $this->firstDayOfWeek = $day;

        return $this;
    }

    public function format(string | callable $format): static
    {
        $this->format = $format;

        return $this;
    }

    public function maxDate(string | callable $date): static
    {
        $this->maxDate = $date;

        $this->addValidationRule(function () use ($date) {
            $date = $this->evaluate($date);

            return "before_or_equal:{$date}";
        }, fn (): bool => (bool) $this->evaluate($date));

        return $this;
    }

    public function minDate(string | callable $date): static
    {
        $this->minDate = $date;

        $this->addValidationRule(function () use ($date) {
            $date = $this->evaluate($date);

            return "after_or_equal:{$date}";
        }, fn (): bool => (bool) $this->evaluate($date));

        return $this;
    }

    public function resetFirstDayOfWeek(): static
    {
        $this->firstDayOfWeek($this->getDefaultFirstDayOfWeek());

        return $this;
    }

    public function weekStartsOnMonday(): static
    {
        $this->firstDayOfWeek(1);

        return $this;
    }

    public function weekStartsOnSunday(): static
    {
        $this->firstDayOfWeek(7);

        return $this;
    }

    public function getDisplayFormat(): string
    {
        return $this->evaluate($this->displayFormat);
    }

    public function getFirstDayOfWeek(): int
    {
        return $this->evaluate($this->firstDayOfWeek);
    }

    public function getFormat(): string
    {
        return $this->evaluate($this->format);
    }

    public function getMaxDate(): ?string
    {
        return $this->evaluate($this->maxDate);
    }

    public function getMinDate(): ?string
    {
        return $this->evaluate($this->minDate);
    }

    public function hasSeconds(): bool
    {
        return false;
    }

    public function hasTime(): bool
    {
        return (bool) $this->evaluate($this->hasTime);
    }

    protected function getDefaultFirstDayOfWeek(): int
    {
        return config('forms.first_day_of_week', 1);
    }
}
