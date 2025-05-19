---
title: Rich editor
---
import Aside from "@components/Aside.astro"
import AutoScreenshot from "@components/AutoScreenshot.astro"
import UtilityInjection from "@components/UtilityInjection.astro"

## Introduction

The rich editor allows you to edit and preview HTML content, as well as upload images. It uses [TipTap](https://tiptap.dev) as the underlying editor.

```php
use Filament\Forms\Components\RichEditor;

RichEditor::make('content')
```

<AutoScreenshot name="forms/fields/rich-editor/simple" alt="Rich editor" version="4.x" />

## Storing content as JSON

By default, the rich editor stores content as HTML. If you would like to store the content as JSON instead, you can use the `json()` method:

```php
use Filament\Forms\Components\RichEditor;

RichEditor::make('content')
    ->json()
```

The JSON is in [TipTap's](https://tiptap.dev) format, which is a structured representation of the content.

If you're saving the JSON tags using Eloquent, you should be sure to add an `array` [cast](https://laravel.com/docs/eloquent-mutators#array-and-json-casting) to the model property:

```php
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $casts = [
        'content' => 'array',
    ];

    // ...
}
```

## Customizing the toolbar buttons

You may set the toolbar buttons for the editor using the `toolbarButtons()` method. The options shown here are the defaults. In addition to these, `'h1'` is also available:

```php
use Filament\Forms\Components\RichEditor;

RichEditor::make('content')
    ->toolbarButtons([
        ['bold', 'italic', 'underline', 'strike', 'subscript', 'superscript', 'link'],
        ['h2', 'h3'],
        ['blockquote', 'codeBlock', 'bulletList', 'orderedList'],
        ['attachFiles'],
        ['undo', 'redo'],
    ])
```

Each nested array in the main array represents a group of buttons in the toolbar.

<UtilityInjection set="formFields" version="4.x">As well as allowing a static value, the `toolbarButtons()` method also accepts a function to dynamically calculate it. You can inject various utilities into the function as parameters.</UtilityInjection>

## Rendering rich content

If you're [storing content as JSON](#storing-content-as-json) instead of HTML, or your content requires processing to inject [private image URLs](#using-private-images-in-the-editor) or similar, you'll need to use the `RichContentRenderer` tool in Filament to output HTML:

```php
use Filament\Forms\Components\RichEditor\RichContentRenderer;

RichContentRenderer::make($record->content)->toHtml()
```

The `toHtml()` method returns a string. If you would like to output HTML in a Blade view without escaping the HTML, you can echo the `RichContentRender` object without calling `toHtml()`:

```blade
{{ \Filament\Forms\Components\RichEditor\RichContentRenderer::make($record->content) }}
```

If you have configured the [file attachments behaviour](#uploading-images-to-the-editor) of the editor to change the disk or visibility of the uploaded files, you must also pass these settings to the renderer to ensure that the correct URLs are generated:

```php
use Filament\Forms\Components\RichEditor\RichContentRenderer;

RichContentRenderer::make($record->content)
    ->fileAttachmentsDisk('s3')
    ->fileAttachmentsVisibility('private')
    ->toHtml()
```

## Security

By default, the editor outputs raw HTML, and sends it to the backend. Attackers are able to intercept the value of the component and send a different raw HTML string to the backend. As such, it is important that when outputting the HTML from a rich editor, it is sanitized; otherwise your site may be exposed to Cross-Site Scripting (XSS) vulnerabilities.

When Filament outputs raw HTML from the database in components such as `TextColumn` and `TextEntry`, it sanitizes it to remove any dangerous JavaScript. However, if you are outputting the HTML from a rich editor in your own Blade view, this is your responsibility. One option is to use Filament's `sanitizeHtml()` helper to do this, which is the same tool we use to sanitize HTML in the components mentioned above:

```blade
{!! str($record->content)->sanitizeHtml() !!}
```

If you're [storing content as JSON](#storing-content-as-json) instead of HTML, or your content requires processing to inject [private image URLs](#using-private-images-in-the-editor) or similar, you can use the [content renderer](#rendering-rich-content) to output HTML. This will automatically sanitize the HTML for you, so you don't need to worry about it.

## Uploading images to the editor

By default, uploaded images are stored publicly on your storage disk, so that the rich content stored in the database can be output easily anywhere. You may customize how images are uploaded using configuration methods:

```php
use Filament\Forms\Components\RichEditor;

RichEditor::make('content')
    ->fileAttachmentsDisk('s3')
    ->fileAttachmentsDirectory('attachments')
    ->fileAttachmentsVisibility('private')
```

<UtilityInjection set="formFields" version="4.x">As well as allowing static values, the `fileAttachmentsDisk()`, `fileAttachmentsDirectory()`, and `fileAttachmentsVisibility()` methods also accept functions to dynamically calculate them. You can inject various utilities into the function as parameters.</UtilityInjection>

<Aside variant="tip">
    Filament also supports [`spatie/laravel-medialibrary`](https://github.com/spatie/laravel-medialibrary) for storing rich editor file attachments. See our [plugin documentation](/plugins/filament-spatie-media-library#using-media-library-for-rich-editor-file-attachments) for more information.
</Aside>

### Using private images in the editor

Using private images in the editor adds a layer of complexity to the process, since private images cannot be accessed directly via a permanent URL. Each time the editor is loaded or its content is rendered, temporary URLs need to be generated for each image, which are never stored in the database. Instead, Filament adds a `data-id` attribute to the image tags, which contains an identifier for the image in the storage disk, so that a temporary URL can be generated on demand.

When rendering the content using private images, ensure that you are using the [`RichContentRenderer` tool](#rendering-rich-content) in Filament to output HTML:

```php
use Filament\Forms\Components\RichEditor\RichContentRenderer;

RichContentRenderer::make($record->content)
    ->fileAttachmentsDisk('s3')
    ->fileAttachmentsVisibility('private')
    ->toHtml()
```

## Registering rich content attributes

There are elements of the rich editor configuration that apply to both the editor and the renderer. For example, if you are using [private images](#using-private-images-in-the-editor) or [plugins](#extending-the-rich-editor), you need to ensure that the same configuration is used in both places. To do this, Filament provides you with a way to register rich content attributes that can be used in both the editor and the renderer.

To register rich content attributes on an Eloquent model, you should use the `InteractsWithRichContent` trait and implement the `HasRichContent` interface. This allows you to register the attributes in the `setUpRichContent()` method:

```php
use Filament\Forms\Components\RichEditor\Models\Concerns\InteractsWithRichContent;
use Filament\Forms\Components\RichEditor\Models\Contracts\HasRichContent;
use Illuminate\Database\Eloquent\Model;

class Post extends Model implements HasRichContent
{
    use InteractsWithRichContent;

    public function setUpRichContent(): void
    {
        $this->registerRichContent('content')
            ->fileAttachmentsDisk('s3')
            ->fileAttachmentsVisibility('private')
            ->plugins([
                HighlightRichContentPlugin::make(),
            ]);
    }
}
```

Whenever you use the `RichEditor` component, the configuration registered for the corresponding attribute will be used:

```php
use Filament\Forms\Components\RichEditor;

RichEditor::make('content')
```

To easily render the rich content HTML from a model with the given configuration, you can call the `renderRichContent()` method on the model, passing the name of the attribute:

```blade
{!! $record->renderRichContent('content') !!}
```

Alternatively, you can get an `Htmlable` object to render without escaping the HTML:

```blade
{{ $record->getRichContentAttribute('content') }}
```

When using a [text column](../tables/columns/text) in a table or a [text entry](../infolists/text-entry) in an infolist, you don't need to manually render the rich content. Filament will do this for you automatically:

```php
use Filament\Infolists\Components\TextEntry;
use Filament\Tables\Columns\TextColumn;

TextColumn::make('content')

TextEntry::make('content')
```

## Extending the rich editor

You can create plugins for the rich editor, which allow you to add custom TipTap extensions to the editor and renderer, as well as custom toolbar buttons. Create a new class that implements the `RichContentPlugin` interface:

```php
use Filament\Actions\Action;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\RichEditor\EditorCommand;
use Filament\Forms\Components\RichEditor\Plugins\Contracts\RichContentPlugin;
use Filament\Forms\Components\RichEditor\RichEditorTool;
use Filament\Support\Enums\Width;
use Filament\Support\Facades\FilamentAsset;
use Filament\Support\Icons\Heroicon;
use Tiptap\Core\Extension;
use Tiptap\Marks\Highlight;

class HighlightRichContentPlugin implements RichContentPlugin
{
    public static function make(): static
    {
        return app(static::class);
    }

    /**
     * @return array<Extension>
     */
    public function getTipTapPhpExtensions(): array
    {
        // This method should return an array of PHP TipTap extension objects.
        // See: https://github.com/ueberdosis/tiptap-php
    
        return [
            app(Highlight::class, [
                'options' => ['multicolor' => true],
            ]),
        ];
    }

    /**
     * @return array<string>
     */
    public function getTipTapJsExtensions(): array
    {
        // This method should return an array of URLs to JavaScript files containing
        // TipTap extensions that should be asynchronously loaded into the editor
        // when the plugin is used.
    
        return [
            FilamentAsset::getScriptSrc('rich-content-plugins/highlight'),
        ];
    }

    /**
     * @return array<RichEditorTool>
     */
    public function getEditorTools(): array
    {
        // This method should return an array of `RichEditorTool` objects, which can then be
        // used in the `toolbarButtons()` of the editor.
        
        // The `javaScriptHandler()` method allows you to access the TipTap editor instance
        // through `$getEditor()`, and `chain()` any TipTap commands to it.
        // See: https://tiptap.dev/docs/editor/api/commands
        
        // The `action()` method allows you to run an action (registered in the `getEditorActions()`
        // method) when the toolbar button is clicked. This allows you to open a modal to
        // collect additional information from the user before running a command.
    
        return [
            RichEditorTool::make('highlight')
                ->javaScriptHandler('$getEditor()?.chain().focus().toggleHighlight().run()')
                ->icon(Heroicon::CursorArrowRays),
            RichEditorTool::make('highlightWithCustomColor')
                ->action(arguments: '{ color: $getEditor().getAttributes(\'mark\')?.data-color }')
                ->icon(Heroicon::CursorArrowRipple),
        ];
    }

    /**
     * @return array<Action>
     */
    public function getEditorActions(): array
    {
        // This method should return an array of `Action` objects, which can be used by the tools
        // registered in the `getEditorTools()` method. The name of the action should match
        // the name of the tool that uses it.
        
        // The `runCommands()` method allows you to run TipTap commands on the editor instance.
        // It accepts an array of `EditorCommand` objects that define the command to run,
        // as well as any arguments to pass to the command. You should also pass in the
        // `editorSelection` argument, which is the current selection in the editor
        // to apply the commands to.
    
        return [
            Action::make('highlightWithCustomColor')
                ->modalWidth(Width::Large)
                ->fillForm(fn (array $arguments): array => [
                    'color' => $arguments['color'] ?? null,
                ])
                ->schema([
                    ColorPicker::make('color'),
                ])
                ->action(function (array $arguments, array $data, RichEditor $component): void {
                    $component->runCommands(
                        [
                            EditorCommand::make(
                                'toggleHighlight',
                                arguments: [[
                                    'color' => $data['color'],
                                ]],
                            ),
                        ],
                        editorSelection: $arguments['editorSelection'],
                    );
                }),
        ];
    }
}
```

You can use the `plugins()` method to register your plugin with the rich editor and [rich content renderer](#rendering-rich-content):

```php
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\RichEditor\RichContentRenderer;

RichEditor::make('content')
    ->toolbarButtons([
        ['bold', 'highlight', 'highlightWithCustomColor'],
        ['h2', 'h3'],
        ['bulletList', 'orderedList'],
    ])
    ->plugins([
        HighlightRichContentPlugin::make(),
    ])

RichContentRenderer::make($record->content)
    ->plugins([
        HighlightRichContentPlugin::make(),
    ])
```

### Setting up a TipTap JavaScript extension

Filament is able to asynchronously load JavaScript extensions for TipTap. To do this, you need to create a JavaScript file that contains the extension, and register it in the `getTipTapJsExtensions()` method of your [plugin](#extending-the-rich-editor).

For instance, if you wanted to use the [TipTap highlight extension](https://tiptap.dev/docs/editor/extensions/marks/highlight), make sure it is installed first:

```bash
npm install @tiptap/extension-highlight --save-dev
```

Then, create a JavaScript file that imports the extension. In this example, create a file called `highlight.js` in the `resources/js/filament/rich-content-plugins` directory, and add the following code to it:

```javascript
import Highlight from '@tiptap/extension-highlight'

export default Highlight.configure({
    multicolor: true,
})
```

One way to compile this file is to use [esbuild](https://esbuild.github.io). You can install it using `npm`:

```bash
npm install esbuild --save-dev
```

You must create an [esbuild](https://esbuild.github.io) script to compile the file. You can put this anywhere, for example `bin/build.js`:

```js
import * as esbuild from 'esbuild'

async function compile(options) {
    const context = await esbuild.context(options)

    await context.rebuild()
    await context.dispose()
}

compile({
    define: {
        'process.env.NODE_ENV': `'production'`,
    },
    bundle: true,
    mainFields: ['module', 'main'],
    platform: 'neutral',
    sourcemap: false,
    sourcesContent: false,
    treeShaking: true,
    target: ['es2020'],
    minify: true,
    entryPoints: ['./resources/js/filament/rich-content-plugins/highlight.js'],
    outfile: './resources/js/dist/filament/rich-content-plugins/highlight.js',
})
```

As you can see at the bottom of the script, we are compiling a file called `resources/js/filament/rich-content-plugins/highlight.js` into `resources/js/dist/filament/rich-content-plugins/highlight.js`. You can change these paths to suit your needs. You can compile as many files as you want.

To run the script and compile this file into `resources/js/dist/filament/rich-content-plugins/highlight.js` run the following command:

```bash
node bin/build.js
```

You should register it in the `boot()` method of a service provider, like `AppServiceProvider`, and use `loadedOnRequest()` so that it is not downloaded until the rich editor is loaded on a page:

```php
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;

FilamentAsset::register([
    Js::make('rich-content-plugins/highlight', __DIR__ . '/../../resources/js/dist/filament/rich-content-plugins/highlight.js')->loadedOnRequest(),
]);
```

To publish this new JavaScript file into the `/public` directory of your app so that it can be served, you can use the `filament:assets` command:

```bash
php artisan filament:assets
```

In the [plugin object](#extending-the-rich-editor), the `getTipTapJsExtensions()` method should return the path to the JavaScript file you just created. Now that it's registered with `FilamentAsset`, you can use the `getScriptSrc()` method to get the URL to the file:

```php
use Filament\Support\Facades\FilamentAsset;

/**
 * @return array<string>
 */
public function getTipTapJsExtensions(): array
{
    return [
        FilamentAsset::getScriptSrc('rich-content-plugins/highlight'),
    ];
}
```
