<?php

namespace App\Http\Controllers\Api;

use App\Models\Vehicle;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOccurrenceRequest;
use App\Http\Requests\UpdateOccurrenceRequest;
use App\Models\Occurrence;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\AiPrediction;
use Illuminate\Support\Facades\Http;

class OccurrenceController extends Controller
{

    public function index(Request $request)
    {
        $occurrences = Occurrence::query()
            ->with(['occurrenceType:id,name,default_severity', 'region:id,name,city,state,risk_level'])
            ->when($request->filled('status'), fn ($query) => $query->where('status', $request->string('status')))
            ->when($request->filled('occurrence_type_id'), fn ($query) => $query->where('occurrence_type_id', $request->integer('occurrence_type_id')))
            ->when($request->filled('region_id'), fn ($query) => $query->where('region_id', $request->integer('region_id')))
            ->when($request->filled('ai_priority'), fn ($query) => $query->where('ai_priority', $request->string('ai_priority')))
            ->when($request->filled('date_from'), fn ($query) => $query->whereDate('occurred_at', '>=', $request->date('date_from')))
            ->when($request->filled('date_to'), fn ($query) => $query->whereDate('occurred_at', '<=', $request->date('date_to')))
            ->orderByDesc('occurred_at')
            ->get();

        return response()->json($occurrences);
    }

    public function store(StoreOccurrenceRequest $request)
    {
        $occurrence = Occurrence::create($request->validated());

        $this->updateGeom($occurrence);

        return response()->json(
            $occurrence->refresh()->load(['occurrenceType', 'region', 'createdBy']),
            201
        );
    }

    public function show(string $id)
    {
        $occurrence = Occurrence::with([
            'occurrenceType:id,name,default_severity',
            'region:id,name,city,state,risk_level',
            'createdBy:id,name,email',
            'aiPredictions' => fn ($query) => $query
                ->orderByDesc('created_at')
                ->orderByDesc('id'),
        ])->findOrFail($id);

        return response()->json($occurrence);
    }

    public function update(UpdateOccurrenceRequest $request, string $id)
    {
        $occurrence = Occurrence::findOrFail($id);
        $occurrence->update($request->validated());

        if ($request->has('latitude') || $request->has('longitude')) {
            $this->updateGeom($occurrence);
        }

        return response()->json(
            $occurrence->refresh()->load(['occurrenceType', 'region', 'createdBy'])
        );
    }

    public function destroy(string $id)
    {
        $occurrence = Occurrence::findOrFail($id);

        try {
            $occurrence->delete();
        } catch (QueryException $exception) {
            if ($exception->getCode() === '23503') {
                return response()->json([
                    'message' => 'Nao foi possivel excluir a ocorrencia porque existem registros vinculados.',
                ], 409);
            }

            throw $exception;
        }

        return response()->noContent();
    }

    public function suggestVehicle(string $id)
    {
        $occurrence = Occurrence::with([
            'occurrenceType:id,name,default_severity',
            'region:id,name,city,state,risk_level',
        ])->findOrFail($id);

        $vehicle = Vehicle::query()
            ->with('region:id,name,city,state,risk_level')
            ->where('status', 'disponivel')
            ->where('active', true)
            ->get();

        if ($vehicle->isEmpty()) {
            return response()->json([
                'message' => 'Nenhuma viatura disponível para atender a ocorrência no momento.',
                'occurrence' => $occurrence,
                'suggested_vehicle' => null,
            ], 404);
        }
    
    $suggestedVehicle = $vehicle
        ->map(function (Vehicle $vehicle) use ($occurrence) {
            $distanceKm = $this->calculateDistanceKm(
                (float) $occurrence->latitude,
                (float) $occurrence->longitude,
                (float) $vehicle->latitude,
                (float) $vehicle->longitude
            );

            $vehicle->distance_km = round($distanceKm, 2);
            $vehicle->estimated_arrival_minutes = max(1, (int) ceil(($distanceKm / 40) * 60));

            return $vehicle;
        })
        ->sortBy('distance_km')
        ->first();

        return response()->json([
            'occurrence' => $occurrence,
            'suggested_vehicle' => $suggestedVehicle,
            'criteria' => 'Viatura ativa, disponível e mais próxima da ocorrência.',
        ]);
    }

    private function calculateDistanceKm(
        float $originLatitude,
        float $originLongitude,
        float $destinationLatitude,
        float $destinationLongitude
    ): float {
        $earthRadiusKm = 6371;

        $originLatitudeRad = deg2rad($originLatitude);

        $originLatitudeRad = deg2rad($originLatitude);
        $destinationLatitudeRad = deg2rad($destinationLatitude);
        $latitudeDelta = deg2rad($destinationLatitude - $originLatitude);
        $longitudeDelta = deg2rad($destinationLongitude - $originLongitude);

        $a = sin($latitudeDelta / 2) * sin($latitudeDelta / 2)
            + cos($originLatitudeRad)
            * cos($destinationLatitudeRad)
            * sin($longitudeDelta / 2)
            * sin($longitudeDelta / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadiusKm * $c;
    }

    private function updateGeom(Occurrence $occurrence): void
    {
        if (DB::connection()->getDriverName() !== 'pgsql') {
            return;
        }

        DB::statement(
            'UPDATE occurrences SET geom = ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography WHERE id = ?',
            [
                (float) $occurrence->longitude,
                (float) $occurrence->latitude,
                $occurrence->id,
            ]
        );
    }

    public function predictPriority(string $id)
    {
        $occurrence = Occurrence::with([
            'occurrenceType:id,name,default_severity',
            'region:id,name,city,state,risk_level',
        ])->findOrFail($id);

        $response = Http::timeout(5)->post(
            config('services.ai_service.url') . '/predict-priority',
            [
                'occurrence_id' => $occurrence->id,
                'tipo_ocorrencia' => $occurrence->occurrenceType->name,
                'regiao' => $occurrence->region->name,
                'descricao' => $occurrence->description ?? $occurrence->title,
                'informed_severity' => $occurrence->informed_severity,
                'region_risk_level' => $occurrence->region->risk_level,
                'latitude' => (float) $occurrence->latitude,
                'longitude' => (float) $occurrence->longitude,
            ]
        );

        if ($response->failed()) {
            return response()->json([
                'message' => 'Nao foi possivel consultar o microservico de IA',
                'details' => $response->json(),
            ], 500);
        }

        $prediction = $response->json();
        
        $occurrence->update([
            'ai_priority' => $prediction['predicted_priority']
        ]);

        $aiPrediction = AiPrediction::create([
            'occurrence_id' => $occurrence->id,
            'model_name' => $prediction['model_name'],
            'predicted_priority' => $prediction['predicted_priority'],
            'risk_score' => $prediction['risk_score'],
            'confidence_score' => $prediction['confidence_score'],
            'input_summary' => $prediction['input_summary'],
            'explanation' => $prediction['explanation'] ?? null,
            'created_at' => now(),
        ]);

        return response()->json([
            'occurrence' => $occurrence->refresh()->load(['occurrenceType', 'region']),
            'ai_prediction' => $aiPrediction,
        ]);

    }
}
