<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Alert;
use App\Models\Occurrence;
use App\Models\Vehicle;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function summary()
    {
        return response()->json([
            'occurrences' => [
                'total' => Occurrence::count(),
                'by_status' => $this->countByColumn('occurrences', 'status'),
                'by_priority' => $this->countByColumn('occurrences', 'ai_priority'),
                'by_type' => Occurrence::query()
                    ->join('occurrence_types', 'occurrence_types.id', '=', 'occurrences.occurrence_type_id')
                    ->select('occurrence_types.name', DB::raw('COUNT(*) as total'))
                    ->groupBy('occurrence_types.id', 'occurrence_types.name')
                    ->orderBy('occurrence_types.name')
                    ->get(),
                'by_region' => Occurrence::query()
                    ->join('regions', 'regions.id', '=', 'occurrences.region_id')
                    ->select('regions.name', DB::raw('COUNT(*) as total'))
                    ->groupBy('regions.id', 'regions.name')
                    ->orderBy('regions.name')
                    ->get(),
            ],
            'vehicles' => [
                'total' => Vehicle::count(),
                'active' => Vehicle::where('active', true)->count(),
                'by_status' => $this->countByColumn('vehicles', 'status'),
            ],
            'alerts' => [
                'total' => Alert::count(),
                'open' => Alert::where('status', 'aberto')->count(),
                'by_status' => $this->countByColumn('alerts', 'status'),
                'by_severity' => $this->countByColumn('alerts', 'severity'),
            ],
        ]);
    }

    private function countByColumn(string $table, string $column)
    {
        return DB::table($table)
            ->select($column, DB::raw('COUNT(*) as total'))
            ->whereNotNull($column)
            ->groupBy($column)
            ->orderBy($column)
            ->get();
    }
}
