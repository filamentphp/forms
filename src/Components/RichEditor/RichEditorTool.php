<?php

namespace Filament\Forms\Components\RichEditor;

use Closure;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Concerns\HasLabel;
use Filament\Schemas\Components\Concerns\HasName;
use Filament\Support\Components\Contracts\HasEmbeddedView;
use Filament\Support\Components\ViewComponent;
use Filament\Support\Concerns\HasExtraAttributes;
use Filament\Support\Concerns\HasIcon;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Support\Js;

use function Filament\Support\generate_icon_html;

class RichEditorTool extends ViewComponent implements HasEmbeddedView
{
    use HasExtraAttributes;
    use HasIcon;
    use HasLabel {
        getLabel as getBaseLabel;
    }
    use HasName;

    /**
     * @var array<string, mixed> | Closure
     */
    protected array | Closure $activeOptions = [];

    protected string | Closure | null $iconAlias = null;

    protected string | Closure | null $activeKey = null;

    protected string | Closure | null $javaScriptHandler = null;

    protected RichEditor $editor;

    protected string $evaluationIdentifier = 'tool';

    protected string $viewIdentifier = 'tool';

    final public function __construct(string $name)
    {
        $this->name($name);
    }

    public static function make(string $name): static
    {
        $static = app(static::class, ['name' => $name]);

        $static->configure();

        return $static;
    }

    public function editor(RichEditor $editor): static
    {
        $this->editor = $editor;

        return $this;
    }

    public function getEditor(): RichEditor
    {
        return $this->editor;
    }

    /**
     * @param  array<string, mixed> | Closure  $options
     */
    public function activeOptions(array | Closure $options): static
    {
        $this->activeOptions = $options;

        return $this;
    }

    /**
     * @return array<string, mixed>
     */
    public function getActiveOptions(): array
    {
        return $this->evaluate($this->activeOptions);
    }

    public function iconAlias(string | Closure | null $alias): static
    {
        $this->iconAlias = $alias;

        return $this;
    }

    public function getIconAlias(): ?string
    {
        return $this->evaluate($this->iconAlias);
    }

    public function action(string | Closure | null $action = null, string | Closure | null $arguments = null): static
    {
        $this->javaScriptHandler(fn (RichEditorTool $tool): string => '$wire.mountAction(\'' . ($tool->evaluate($action) ?? $tool->getName()) . '\', { editorSelection, ...' . ($tool->evaluate($arguments) ?? '{}') . ' }, ' . Js::from(['schemaComponent' => $tool->getEditor()->getKey()]) . ')');

        return $this;
    }

    public function javaScriptHandler(string | Closure | null $handler): static
    {
        $this->javaScriptHandler = $handler;

        return $this;
    }

    public function getJavaScriptHandler(): ?string
    {
        return $this->evaluate($this->javaScriptHandler);
    }

    public function activeKey(string | Closure | null $key): static
    {
        $this->activeKey = $key;

        return $this;
    }

    public function getActiveKey(): string
    {
        return $this->evaluate($this->activeKey) ?? $this->getName();
    }

    public function getLabel(): string | Htmlable | null
    {
        if (filled($label = $this->getBaseLabel())) {
            return $label;
        }

        $label = (string) str($this->getName())
            ->afterLast('.')
            ->kebab()
            ->replace(['-', '_'], ' ')
            ->ucfirst();

        return $this->shouldTranslateLabel ? __($label) : $label;
    }

    public function toEmbeddedHtml(): string
    {
        $attributes = $this->getExtraAttributeBag()
            ->merge([
                'tabindex' => -1,
                'title' => $this->getLabel(),
                'type' => 'button',
                'x-on:click' => $this->getJavaScriptHandler(),
            ], escape: false)
            ->class(['fi-fo-rich-editor-tool']);

        ob_start(); ?>

        <button
            x-bind:class="{
                'fi-active': editorUpdatedAt && $getEditor()?.isActive(<?= Js::from($this->getActiveKey())->toHtml() ?>, <?= Js::from($this->getActiveOptions())->toHtml() ?>),
            }"
            <?= $attributes->toHtml() ?>
        >
            <?= generate_icon_html($this->getIcon(), alias: $this->getIconAlias())->toHtml() ?>
        </button>

        <?php return ob_get_clean();
    }
}
