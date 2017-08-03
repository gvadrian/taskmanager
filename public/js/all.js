document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("task_delete").click();
    var deleteButton = document.getElementById("task_delete");
    deleteButton.addEventListener('click', function() {
        var deleteData = deleteButton.dataset;
        deleteTask(deleteData.id,deleteData.token);
    });
});
function deleteTask (id,token) {
    var xhr = new XMLHttpRequest();
    var body = '_token='+token+'&_method='+'DELETE'+'&id='+id;
    xhr.open('POST','tasks/'+id);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);
    alert(xhr.responseText);
}