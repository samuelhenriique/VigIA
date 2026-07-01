<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOccurrenceRequest;
use App\Http\Requests\UpdateOccurrenceRequest;
use App\Models\Occurrence;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OccurrenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOccurrenceRequest $request)
    {
        $occurrence = Occurrence::create($request->validated());

        $this->updateGeom($occurrence);

        return response()->json(
            $occurrence->refresh()->load(['occurrenceType', 'region', 'createdBy']),
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $occurrence = Occurrence::with([
            'occurrenceType:id,name,default_severity',
            'region:id,name,city,state,risk_level',
            'createdBy:id,name,email',
        ])->findOrFail($id);

        return response()->json($occurrence);
    }

    /**
     * Update the specified resource in storage.
     */
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

    /**
     * Remove the specified resource from storage.
     */
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

    private function updateGeom(Occurrence $occurrence): void
    {
        DB::statement(
            'UPDATE occurrences SET geom = ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography WHERE id = ?',
            [(float) $occurrence->longitude, (float) $occurrence->latitude, $occurrence->id]
        );
    }
}
