document.addEventListener("DOMContentLoaded", function (event) {
    editDeleteEvents();
    var openCreateFormButton = document.getElementById("open_create_form");
    openCreateFormButton.addEventListener('click',openCreateForm);
});

function editDeleteEvents() {
    var deleteButtons = document.getElementsByClassName("task_delete");
    for (var i = 0; i < deleteButtons.length; i++) {
        var delBut = deleteButtons[i];
        delBut.addEventListener('click', confirmDeleteTask);
    }
    var editButtons = document.getElementsByClassName("task_edit");
    for (i = 0; i < editButtons.length; i++) {
        var edBut = editButtons[i];
        edBut.addEventListener('click', editTask);
    }
}

function confirmDeleteTask() {
    var div = document.createElement('div');
    div.id = 'confirm_delete';
    div.innerHTML =
        '<div class="back_layout"></div>' +
        '<div class="accept_dialog">' +
        '<span class="title">Are you sure?</span>' +
        '<div>' +
        '<button data-answer="n" class="button">No</button>' +
        '<button data-answer="y" class="button">Yes</button>' +
        '</div>' +
        '</div>';
    document.body.appendChild(div);
    var noButton = document.querySelector('[data-answer="n"]');
    noButton.addEventListener('click', function () {
        var confirmModal = document.getElementById('confirm_delete');
        confirmModal.parentNode.removeChild(confirmModal);
    });
    var yesButton = document.querySelector('[data-answer="y"]');
    yesButton.dataset.id = this.dataset.id;
    yesButton.dataset.token = this.dataset.token;
    yesButton.addEventListener('click', deleteTask);

    function deleteTask() {
        var confirmModal = document.getElementById('confirm_delete'),
            deleteData = this.dataset,
            xhr = new XMLHttpRequest();
        confirmModal.parentNode.removeChild(confirmModal);
        xhr.open('DELETE', 'tasks/' + deleteData.id);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('X-CSRF-TOKEN', deleteData.token);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var deletedElement = document.getElementById(xhr.responseText);
                deletedElement.parentNode.removeChild(deletedElement);
            }
        };
    }
}

function editTask() {
    var thisElement = this,
        thisTaskNameElement = thisElement.parentNode.previousElementSibling;
        formPreviousSibling = thisElement.parentNode;
    var deletedElement = document.getElementById('edit');
    if (formPreviousSibling.nextSibling !== null && formPreviousSibling.nextSibling.id === 'edit') {
        deletedElement.parentNode.removeChild(deletedElement);
    } else {
        if (deletedElement)
            deletedElement.parentNode.removeChild(deletedElement);
        var editData = thisElement.dataset,
            xhr = new XMLHttpRequest();
        xhr.open('GET', 'tasks/' + editData.id + '/edit');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('X-CSRF-TOKEN', editData.token);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText),
                    form = document.createElement('form');
                form.id = 'edit';
                form.innerHTML =
                    '<div class="form-group">' +
                    '<label for="name">Name</label>' +
                    '<input name="name" type="text" class="form-control" id="name" value="' + data.name + '">' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<textarea name="description" class="form-control" rows="5">' + data.description + '</textarea>' +
                    '</div>' +
                    '<button name="submit" id="submit_edit" type="submit" class="btn btn-default right">Submit</button>'+
                    '<button name="reset" id="reset_edit" type="reset" class="btn btn-default left">Reset</button>'+
                    '<button name="cancel" id="cancel_edit" type="button" class="btn btn-default left">Cancel</button>';
                formPreviousSibling.parentNode.insertBefore(form, formPreviousSibling.nextSibling);
                document.getElementById('cancel_edit').addEventListener('click',function(){
                    form.remove();
                });
                form.addEventListener('submit', submitEditForm);
                function submitEditForm(e) {
                    e.preventDefault();
                    var formData = new FormData(this);
                    var formDataObject = {};
                    for (var val of formData.keys()) {
                        formDataObject[val] = formData.get(val);
                    }
                    xhr = new XMLHttpRequest();
                    xhr.open('PUT', 'tasks/' + editData.id);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('X-CSRF-TOKEN', editData.token);
                    xhr.send(JSON.stringify(formDataObject));
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            data = JSON.parse(xhr.responseText);
                            thisTaskNameElement.textContent = data.name;
                            form.parentNode.removeChild(form);
                        }
                    }
                }
            }
        }
    }
}

function openCreateForm () {
    var createButton = this;
    var formDiv = document.createElement('div');
    formDiv.innerHTML =
        '<div class="back_layout"></div>' +
        '<form id="create">' +
        '<div class="form-group">' +
        '<input name="name" type="text" class="form-control" id="name" placeholder="Name">' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea name="description" class="form-control" id="description" rows="5" placeholder="Description"></textarea>' +
        '</div>' +
        '<button name="submit" id="submit_create" type="submit" class="btn btn-default right">Submit</button>' +
        '<button name="reset" id="reset_create" type="reset" class="btn btn-default left">Reset</button>' +
        '<button name="cancel" id="cancel_create" type="button" class="btn btn-default left">Cancel</button>' +
        '</form>';
    this.parentNode.insertBefore(formDiv,createButton.nextSibling);
    createButton.style.display = 'none';
    form = document.getElementById('create');
    form.addEventListener('submit', submitCreateForm);
    var buttonData = createButton.dataset;
    document.getElementById('cancel_create').addEventListener('click', function() {
        formDiv.remove();
        createButton.style.display = 'inline-block';
    });
    function submitCreateForm (e) {
        e.preventDefault();
        var formData = new FormData(this);
        var formDataObject = {};
        for (var val of formData.keys()) {
            formDataObject[val] = formData.get(val);
        }
        xhr = new XMLHttpRequest();
        xhr.open('POST', 'tasks');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-CSRF-TOKEN', buttonData.token);
        xhr.send(JSON.stringify(formDataObject));
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                var newTaskElement = document.createElement('li');
                newTaskElement.id = data.id;
                newTaskElement.className = 'list-group-item';
                newTaskElement.innerHTML =
                    '<span class="task_name">' + data.name + '</span>' +
                    '<span class="manage_buttons">' +
                    '<span class="glyphicon glyphicon-edit button task_edit" data-id="' + data.id + '" data-token="' + data.token + '" style="margin-right: 3px;"></span>' +
                    '<span class="glyphicon glyphicon-remove-circle button task_delete" data-id="' + data.id + '" data-token="' + data.token + '"></span>' +
                    '</span>';
                var tasksUl = document.getElementById('task_list');
                tasksUl.insertBefore(newTaskElement,tasksUl.firstChild);
                formDiv.remove();
                createButton.style.display = 'inline-block';
                editDeleteEvents();
            }
        }
    }
}




