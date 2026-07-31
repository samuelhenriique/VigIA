<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ConfirmDispatchRequest;
use App\Models\Dispatch;
use App\Models\Occurrence;
use App\Models\Vehicle;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class DispatchController extends Controller
{
    public function store(
        ConfirmDispatchRequest $request,
        Occurrence $occurrence
    ): JsonResponse {
        $vehicleId = (int) $request->validated('vehicle_id');

        $dispatch = DB::transaction(
            function () use (
                $request,
                $occurrence,
                $vehicleId
            ): Dispatch {
                $lockedOccurrence = Occurrence::query()
                    ->lockForUpdate()
                    ->findOrFail($occurrence->id);

                $vehicle = Vehicle::query()
                    ->lockForUpdate()
                    ->findOrFail($vehicleId);

                $alreadyDispatched = $lockedOccurrence
                    ->dispatches()
                    ->where('status', 'confirmado')
                    ->exists();

                if ($alreadyDispatched) {
                    $this->throwConflict(
                        'Esta ocorrencia ja possui um despacho confirmado.',
                    );
                }

                if (
                    ! $vehicle->active ||
                    $vehicle->status !== 'disponivel'
                ) {
                    $this->throwConflict(
                        'A viatura selecionada nao esta disponivel.',
                    );
                }

                $vehicleAlreadyDispatched = Dispatch::query()
                    ->where('vehicle_id', $vehicle->id)
                    ->where('status', 'confirmado')
                    ->exists();

                if ($vehicleAlreadyDispatched) {
                    $this->throwConflict(
                        'A viatura selecionada ja possui um despacho confirmado.',
                    );
                }

                $distanceKm = $this->calculateDistanceKm(
                    (float) $lockedOccurrence->latitude,
                    (float) $lockedOccurrence->longitude,
                    (float) $vehicle->latitude,
                    (float) $vehicle->longitude,
                );

                $estimatedArrivalMinutes = max(
                    1,
                    (int) ceil(($distanceKm / 40) * 60),
                );

                $dispatch = Dispatch::create([
                    'occurrence_id' => $lockedOccurrence->id,
                    'vehicle_id' => $vehicle->id,
                    'assigned_by' => $request->user()->id,
                    'status' => 'confirmado',
                    'distance_km' => round($distanceKm, 2),
                    'estimated_arrival_minutes' =>
                        $estimatedArrivalMinutes,
                    'assigned_at' => now(),
                    'completed_at' => null,
                ]);

                $lockedOccurrence->update([
                    'status' => 'em_atendimento',
                ]);

                $vehicle->update([
                    'status' => 'em_atendimento',
                ]);

                return $dispatch;
            },
        );

        return response()->json([
            'message' => 'Despacho confirmado com sucesso.',
            'dispatch' => $dispatch->load([
                'occurrence:id,code,title,status',
                'vehicle:id,code,team_name,status,active',
            ]),
        ], 201);
    }

    private function calculateDistanceKm(
        float $originLatitude,
        float $originLongitude,
        float $destinationLatitude,
        float $destinationLongitude
    ): float {
        $earthRadiusKm = 6371;

        $originLatitudeRad = deg2rad($originLatitude);
        $destinationLatitudeRad = deg2rad(
            $destinationLatitude,
        );

        $latitudeDelta = deg2rad(
            $destinationLatitude - $originLatitude,
        );

        $longitudeDelta = deg2rad(
            $destinationLongitude - $originLongitude,
        );

        $a = sin($latitudeDelta / 2)
            * sin($latitudeDelta / 2)
            + cos($originLatitudeRad)
            * cos($destinationLatitudeRad)
            * sin($longitudeDelta / 2)
            * sin($longitudeDelta / 2);

        $c = 2 * atan2(
            sqrt($a),
            sqrt(1 - $a),
        );

        return $earthRadiusKm * $c;
    }

    private function throwConflict(string $message): never
    {
        throw new HttpResponseException(
            response()->json([
                'message' => $message,
            ], 409),
        );
    }
}
