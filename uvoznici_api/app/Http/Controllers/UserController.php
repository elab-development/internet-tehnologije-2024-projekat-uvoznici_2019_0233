<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use OpenAI;

class UserController extends ResponseController
{
    public function login(Request $request)
    {
        $creadentials = $request->only('email', 'password');

        if (auth()->attempt($creadentials)) {
            $user = auth()->user();
            $token = $user->createToken('auth_token')->plainTextToken;
            return $this->successResponse(
                [
                    'user' => new UserResource($user),
                    'token' => $token
                ],
                'User login successfully'
            );
        }

        return $this->errorResponse('Unauthorized', [], 401);
    }

    public function logout(Request $request)
    {
        if (!auth()->user()) {
            return $this->errorResponse('Unauthorized', [], 401);
        }

        $request->user()->currentAccessToken()->delete();
        return $this->successResponse([], 'User logout successfully');
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse(
                'Validation failed',
                $validator->errors(),
                422
            );
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        return $this->successResponse(
            new UserResource($user),
            'User registered successfully, please login'
        );
    }

    public function test(Request $request)
    {
        $yourApiKey = getenv('OPENAI_API_KEY');
        $client = OpenAI::client($yourApiKey);

        $result = $client->chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'user', 'content' => 'Hello! Can you tell me how much coffee is ok to dring per day?'],
            ],
        ]);

        return $this->successResponse([
            'response' => $result->choices[0]->message->content
        ], 'OpenAI chat response');
    }
}
