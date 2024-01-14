<?php

namespace App\Enums;

enum Category: string
{
    case LAND = "land";
    case AIR = "air";
    case WATER = "water";

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}