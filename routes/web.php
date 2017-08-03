<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {
    return view('welcome');
});*/

Route::resource('/tasks','TasksController',[
    'names' => [
        'index'   => 'index',
        'edit'    => 'edit',
        'destroy' => 'destroy'
    ]
]);
Route::get('/',function(){
    return redirect('tasks');
});







/*Route::get('/test',function(){


//////////////////////////////////////////////////////
    echo '<br>';
    echo '<br>';
    echo 'foreach';
    $ar0 = range(0,5000);
    $f0 = microtime(true);
    foreach ($ar0 as &$item) {
        $item++;
    }
    $l0 = microtime(true);
    echo '<br>';
    echo ($l0-$f0);
    //dump($ar0);
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
    echo '<br>';
    echo '<br>';
    echo 'array_walk ( function outside )';
    $ar1 = range(0,5000);
    $f1 = microtime(true);
    function us1 (&$item) {
        $item++;
    }
    array_walk($ar1,'us1');
    $l1 = microtime(true);
    echo '<br>';
    echo ($l1-$f1);
    //dump($ar1);
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
    echo '<br>';
    echo '<br>';
    echo 'array_walk ( function inside )';
    $ar2 = range(0,5000);
    $f2 = microtime(true);
    array_walk($ar2,function(&$item){$item++;});
    $l2 = microtime(true);
    echo '<br>';
    echo ($l2-$f2);
    //dump($ar1);
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
    echo '<br>';
    echo '<br>';
    echo 'array_map ( function outside )';
    $ar3 = range(0,5000);
    $f3 = microtime(true);
    function us3 (&$item) {
        $item++;
    }
    $fa = array_map('us3',$ar3);
    $l3 = microtime(true);
    echo '<br>';
    echo ($l3-$f3);
    //dump($ar1);
//////////////////////////////////////////////////////


});*/
