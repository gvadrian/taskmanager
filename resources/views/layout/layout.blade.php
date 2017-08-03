<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Task Manager</title>

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/starter-template.css') }}" rel="stylesheet">
    {{--<script src="{{ asset('js/all.js') }}"></script>--}}
    <script src="{{ asset('js/main.js') }}"></script>
</head>

<body>

@section('menu')
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                        aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/tasks">Task manager</a>
            </div>
{{--            <div id="navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="/tasks">Task manager</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>--}}
        </div>
    </nav>
@show

<div class="container">
    <div class="starter-template">
        @section('main')
            <h1>Bootstrap starter template</h1>
            <p class="lead">Use this document as a way to quickly start any new project.<br> All you get is this text
                and a mostly barebones HTML document.</p>
        @show
    </div>
</div>

{{--@section('accept_dialog')
    <div>
    <div class="back_layout">
    </div>
    <div class="accept_dialog">
        <span class="title">Вы уверены?</span>
        <div>
            <button class="button">Нет</button>
            <button class="button">Да</button>
        </div>
    </div>
    </div>
@show--}}


<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
