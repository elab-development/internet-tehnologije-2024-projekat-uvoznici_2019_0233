<?php

namespace App\Http\Controllers;

class ResponseController extends Controller
{

    public function successResponse($data, $message = ''): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ]);
    }

    public function errorResponse($message = '', $errors = [], $code = 404): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], $code);
    }
}
