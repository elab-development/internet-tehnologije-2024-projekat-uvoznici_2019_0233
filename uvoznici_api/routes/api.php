<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/login', [\App\Http\Controllers\UserController::class, 'login']);
Route::post('/register', [\App\Http\Controllers\UserController::class, 'register']);

Route::get('/suppliers', [\App\Http\Controllers\SupplierController::class, 'index']);
Route::resource('/imports', \App\Http\Controllers\ImportController::class)->only(['index', 'show']);
Route::get('/products', [\App\Http\Controllers\ProductController::class, 'index']);

Route::get('/products-per-category', [\App\Http\Controllers\ProductController::class, 'productsPerCategoryGrouped']);
Route::get('/imports-per-status', [\App\Http\Controllers\ImportController::class, 'importsPerStatusGrouped']);
Route::get('/suppliers/search', [\App\Http\Controllers\SupplierController::class, 'search']);
Route::get('/products/categories', [\App\Http\Controllers\ProductController::class, 'getCategories']);
Route::get('/products/search', [\App\Http\Controllers\ProductController::class, 'searchByCategory']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/logout', [\App\Http\Controllers\UserController::class, 'logout']);

    Route::resource('/imports', \App\Http\Controllers\ImportController::class)->only(['store', 'destroy']);
    Route::resource('/import-items', \App\Http\Controllers\ImportItemController::class)->only(['store']);
    Route::delete('/import-items/{id}', [\App\Http\Controllers\ImportItemController::class, 'destroy'])->middleware(\App\Http\Middleware\AdminMiddleware::class);
    Route::post('/products', [\App\Http\Controllers\ProductController::class, 'store']);
    Route::post('/estimate', [\App\Http\Controllers\AiController::class, 'estimate']);

    Route::post('/documents', [\App\Http\Controllers\DocumentController::class, 'store']);
    Route::get('/users/{id}/imports', [\App\Http\Controllers\ImportController::class, 'findByUser']);
    Route::get('/import-items', [\App\Http\Controllers\ImportItemController::class, 'index']);
    Route::get('/import-items/{id}', [\App\Http\Controllers\ImportItemController::class, 'show']);
    Route::get('/paginate', [\App\Http\Controllers\ImportItemController::class, 'paginateImportItems']);
    Route::get('/imports/{import_id}/import-items', [\App\Http\Controllers\ImportItemController::class, 'findByImport']);
    Route::get('/imports/{id}/documents', [\App\Http\Controllers\DocumentController::class, 'findByImport']);

});
