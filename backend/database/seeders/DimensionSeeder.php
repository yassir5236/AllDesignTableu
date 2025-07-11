<?php

use Illuminate\Database\Seeder;
use App\Models\Dimension;

class DimensionSeeder extends Seeder
{
    public function run()
    {
        $dimensions = [
            '60x60 cm',
            '45x50 cm',
            '40x40 cm',
            '80x60 cm',
            '90x90 cm',
            '30x45 cm',
            '50x50 cm',
        ];

        foreach ($dimensions as $label) {
            Dimension::firstOrCreate(['label' => $label]);
        }
    }
}
