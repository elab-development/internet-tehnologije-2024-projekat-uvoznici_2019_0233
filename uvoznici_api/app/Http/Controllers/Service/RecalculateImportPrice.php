<?php

namespace App\Http\Controllers\Service;

use App\Models\Import;

class RecalculateImportPrice
{

    public function recalculate($importId)
    {
        $import = Import::find($importId);

        if (!$import) {
            return null;
        }

        $importItems = $import->items;

        $totalValue = 0;
        foreach ($importItems as $item) {
            $totalValue += $item->quantity * $item->price;
        }

        $import->total_value = $totalValue;
        $import->save();
    }
}
