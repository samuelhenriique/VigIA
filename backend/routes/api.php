<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AlertController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\OccurrenceController;
use App\Http\Controllers\Api\OccurrenceTypeController;
use App\Http\Controllers\Api\RegionController;
use App\Http\Controllers\Api\VehicleController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::post('alerts/generate', [AlertController::class, 'generate']);

Route::middleware('auth:sanctum')->group(function (): void {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('dashboard/summary', [DashboardController::class, 'summary']);
    Route::get('alerts', [AlertController::class, 'index']);
    Route::post('alerts/generate', [AlertController::class, 'generate']);
    Route::get('occurrences/{occurrence}/suggest-vehicle', [OccurrenceController::class, 'suggestVehicle']);
    Route::get('vehicles/available', [VehicleController::class, 'available']);

    Route::post('occurrences/{occurrence}/predict-priority', [OccurrenceController::class, 'predictPriority']);

    Route::apiResource('occurrences', OccurrenceController::class);
    Route::apiResource('vehicles', VehicleController::class);
    Route::apiResource('regions', RegionController::class)->only(['index', 'show']);
    Route::apiResource('occurrence-types', OccurrenceTypeController::class)->only(['index', 'show']);
});
