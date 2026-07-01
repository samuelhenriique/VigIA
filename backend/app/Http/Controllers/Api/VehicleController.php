<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Models\Vehicle;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $vehicles = Vehicle::query()
            ->with('region:id,name,city,state,risk_level')
            ->when($request->filled('status'), fn ($query) => $query->where('status', $request->string('status')))
            ->when($request->filled('region_id'), fn ($query) => $query->where('region_id', $request->integer('region_id')))
            ->when($request->filled('active'), fn ($query) => $query->where('active', $request->boolean('active')))
            ->orderBy('code')
            ->get();

        return response()->json($vehicles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehicleRequest $request)
    {
        $vehicle = Vehicle::create($request->validated());

        $this->updateGeom($vehicle);

        return response()->json(
            $vehicle->refresh()->load('region'),
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $vehicle = Vehicle::with('region:id,name,city,state,risk_level')->findOrFail($id);

        return response()->json($vehicle);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehicleRequest $request, string $id)
    {
        $vehicle = Vehicle::findOrFail($id);
        $vehicle->update($request->validated());

        if ($request->has('latitude') || $request->has('longitude')) {
            $this->updateGeom($vehicle);
        }

        return response()->json(
            $vehicle->refresh()->load('region')
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $vehicle = Vehicle::findOrFail($id);

        try {
            $vehicle->delete();
        } catch (QueryException $exception) {
            if ($exception->getCode() === '23503') {
                return response()->json([
                    'message' => 'Nao foi possivel excluir a viatura porque existem registros vinculados.',
                ], 409);
            }

            throw $exception;
        }

        return response()->noContent();
    }

    private function updateGeom(Vehicle $vehicle): void
    {
        DB::statement(
            'UPDATE vehicles SET geom = ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography WHERE id = ?',
            [(float) $vehicle->longitude, (float) $vehicle->latitude, $vehicle->id]
        );
    }
}
