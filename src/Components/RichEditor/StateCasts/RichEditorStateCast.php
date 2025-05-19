<?php

namespace Filament\Forms\Components\RichEditor\StateCasts;

use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\StateCasts\Contracts\StateCast;

class RichEditorStateCast implements StateCast
{
    public function __construct(
        protected RichEditor $richEditor,
    ) {}

    /**
     * @return string | array<string, mixed>
     */
    public function get(mixed $state): string | array
    {
        $editor = $this->richEditor->getTipTapEditor()
            ->setContent($state ?? [
                'type' => 'doc',
                'content' => [],
            ]);

        if ($this->richEditor->getFileAttachmentsVisibility() === 'private') {
            $editor->descendants(function (object &$node): void {
                if ($node->type !== 'image') {
                    return;
                }

                if (blank($node->attrs->{'data-id'} ?? null)) {
                    return;
                }

                if (blank($node->attrs->src ?? null)) {
                    return;
                }

                $node->attrs->src = null;
            });
        }

        return $editor->{$this->richEditor->isJson() ? 'getDocument' : 'getHtml'}();
    }

    /**
     * @return array<string, mixed>
     */
    public function set(mixed $state): array
    {
        return $this->richEditor->getTipTapEditor()
            ->setContent($state ?? [
                'type' => 'doc',
                'content' => [
                    [
                        'type' => 'paragraph',
                        'content' => [],
                    ],
                ],
            ])
            ->descendants(function (object &$node): void {
                if ($node->type !== 'image') {
                    return;
                }

                if (blank($node->attrs->{'data-id'} ?? null)) {
                    return;
                }

                $node->attrs->src = $this->richEditor->getFileAttachmentUrl($node->attrs->{'data-id'}) ?? $this->richEditor->getFileAttachmentUrlFromAnotherRecord($node->attrs->{'data-id'}) ?? $node->attrs->src ?? null;
            })
            ->getDocument();
    }
}
