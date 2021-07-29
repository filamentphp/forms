<?php

return [

    'date_picker' => [
        'first_day_of_week' => 1, // 0 to 7 are accepted values, with Monday as 1 and Sunday as 7 or 0.
        'icon' => 'heroicon-o-calendar',
    ],

    'default_filesystem_disk' => env('FILAMENT_FILESYSTEM_DRIVER', 'public'),

];
