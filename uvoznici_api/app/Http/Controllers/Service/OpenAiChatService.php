<?php

namespace App\Http\Controllers\Service;

use OpenAI;

class OpenAiChatService
{
    public function estimate(string $userInput): string
    {
        $yourApiKey = getenv('OPENAI_API_KEY');
        $client = OpenAI::client($yourApiKey);

        $systemMessage = "You are an expert in estimation of estimate the importing expenses for goods entering Serbia. Based on data in JSON format, you need to estimate the total expenses for importing goods. Data provided will have name of the product, origin country and price";

        $result = $client->chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'system', 'content' => $systemMessage],
                ['role' => 'user', 'content' => $userInput],
            ],
        ]);

        return $result['choices'][0]['message']['content'];
    }
}
