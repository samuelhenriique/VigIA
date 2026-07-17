<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_active_user_can_login(): void
    {
        $user = User::factory()->create([
            'email' => 'admin@vigia.local',
            'password' => 'password',
            'active' => true,
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'admin@vigia.local',
            'password' => 'password',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('token_type', 'Bearer')
            ->assertJsonPath('user.id', $user->id)
            ->assertJsonPath('user.email', 'admin@vigia.local')
            ->assertJsonStructure([
                'token',
                'token_type',
                'user',
            ]);

        $this->assertDatabaseHas('personal_access_tokens', [
            'tokenable_type' => User::class,
            'tokenable_id' => $user->id,
            'name' => 'api-token',
        ]);
    }

    public function test_invalid_credentials_are_rejected(): void
    {
        User::factory()->create([
            'email' => 'admin@vigia.local',
            'password' => 'password',
            'active' => true,
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'admin@vigia.local',
            'password' => 'senha-incorreta',
        ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['email']);

        $this->assertDatabaseCount('personal_access_tokens', 0);
    }

    public function test_inactive_user_cannot_login(): void
    {
        User::factory()->create([
            'email' => 'inativo@vigia.local',
            'password' => 'password',
            'active' => false,
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'inativo@vigia.local',
            'password' => 'password',
        ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['email']);

        $this->assertDatabaseCount('personal_access_tokens', 0);
    }

    public function test_protected_route_rejects_unauthenticated_request(): void
    {
        $this->getJson('/api/me')->assertUnauthorized();
    }

    public function test_authenticated_user_can_access_profile(): void
    {
        $user = User::factory()->create([
            'active' => true,
        ]);

        Sanctum::actingAs($user);

        $this->getJson('/api/me')
            ->assertOk()
            ->assertJsonPath('id', $user->id)
            ->assertJsonPath('email', $user->email)
            ->assertJsonPath('role.id', $user->role_id);
    }

    public function test_logout_revokes_current_access_token(): void
    {
        $user = User::factory()->create([
            'email' => 'admin@vigia.local',
            'password' => 'password',
            'active' => true,
        ]);

        $loginResponse = $this->postJson('/api/login', [
            'email' => 'admin@vigia.local',
            'password' => 'password',
        ]);

        $token = $loginResponse->json('token');

        $this->withToken($token)
            ->postJson('/api/logout')
            ->assertNoContent();

        $this->assertDatabaseCount('personal_access_tokens', 0);

        Auth::forgetGuards();

        $this->withToken($token)
            ->getJson('/api/me')
            ->assertUnauthorized();
    }
}
