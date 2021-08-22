<?php

namespace Filament\Forms\Components;

class MarkdownEditor extends Field implements Contracts\HasFileAttachments
{
    use Concerns\HasFileAttachments;
    use Concerns\HasPlaceholder;
    use Concerns\InteractsWithToolbarButtons;

    protected string $view = 'forms::components.markdown-editor';

    protected $toolbarButtons = [
        'attachFiles',
        'bold',
        'bullet',
        'code',
        'italic',
        'link',
        'number',
        'preview',
        'strike',
        'write',
    ];
}