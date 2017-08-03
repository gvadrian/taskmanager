@extends('layout/layout')
@section('main')
    <h1>All tasks</h1>
    <ul class="list-group" id="task_list">
        @foreach($tasks as $task)
            <li id="{{ $task->id }}" class="list-group-item">
                <span class="task_name">{{ $task->name }}</span>
                <span class="manage_buttons">
                    <span class="glyphicon glyphicon-edit button task_edit" data-id="{{ $task->id }}" data-token="{{ csrf_token() }}"></span>
                    <span class="glyphicon glyphicon-remove-circle button task_delete" data-id="{{ $task->id }}" data-token="{{ csrf_token() }}"></span>
                </span>
            </li>
        @endforeach
    </ul>
    {{ $tasks->links() }}
    <button id="open_create_form" class="btn btn-primary btn-lg" data-token="{{ csrf_token() }}">New task</button>
@endsection