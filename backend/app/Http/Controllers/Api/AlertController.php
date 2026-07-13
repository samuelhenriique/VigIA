<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Alert;
use App\Services\AlertGenerationService;
use Illuminate\Http\Request;

class AlertController extends Controller
{
    public function index(Request $request)
    {
        $alerts = Alert::query()
            ->with([
                'occurrence:id,code,title,status,ai_priority,region_id,occurrence_type_id',
                'occurrence.occurrenceType:id,name,default_severity',
                'occurrence.region:id,name,city,state,risk_level',
            ])
            ->when($request->filled('status'), fn ($query) => $query->where('status', $request->string('status')))
            ->when($request->filled('severity'), fn ($query) => $query->where('severity', $request->string('severity')))
            ->when($request->filled('type'), fn ($query) => $query->where('type', $request->string('type')))
            ->orderByRaw("CASE status WHEN 'aberto' THEN 1 WHEN 'visualizado' THEN 2 WHEN 'resolvido' THEN 3 ELSE 4 END")
            ->orderByDesc('created_at')
            ->get();

        return response()->json($alerts);
    }

    public function generate(AlertGenerationService $service)
    {
        $similarAlerts = $service->generateSimilarOccurrenceAlerts();
        $criticalAlerts = $service->generateCriticalWithoutDispatchAlerts();

        $alerts = $service->generateSimilarOccurrenceAlerts();

        return response()->json([
            'created' => count($alerts),
            'alerts' => $alerts,
        ]);
    }
}
