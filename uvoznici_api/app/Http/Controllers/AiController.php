<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Service\OpenAiChatService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AiController extends ResponseController
{
      public function __construct(private readonly OpenAiChatService $openAiChatService)
      {
      }

    public function estimate(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'product_name' => 'required|string',
            'origin_country' => 'required|string',
            'price' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse(
                'Validation failed',
                $validator->errors(),
                422
            );
        }

        $message = json_encode([
            'product_name' => $request->product_name,
            'origin_country' => $request->origin_country,
            'price' => $request->price
        ]);
        $response = $this->openAiChatService->estimate($message);
        return $this->successResponse([
            'ai_response' => $response
        ], 'Estimation done successfully');
    }
}
