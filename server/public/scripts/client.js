console.log("js");

$(document).ready(onReady);

function onReady() {
  $("#createBtn").on("click", handleCreate);
  $("#displayContainer").on("click", "#completeBtn", handleComplete);
  //$("#displayContainer").on("click", "#completeBtn", handleDelete);
  getTasks();
}

function handleComplete() {
  console.log("in handle complete");
  let id = $(this).closest("tr").data("id");

  $.ajax({
    method: "PUT",
    url: `/todo/status/${id}`,
    data: {
      complete: "true",
    },
  })
    .then(function (response) {
      console.log(response);
      getTasks();
    })
    .catch(function (err) {
      console.log(err);
      alert("update failed");
    });
}

//function handleDelete() {}

function handleCreate() {
  console.log("clicked");
  let taskToSend = {};
  taskToSend.task = $("#taskIn").val();
  taskToSend.complete = false;
  console.log(taskToSend);
  addTask(taskToSend);
}

function addTask(task) {
  $.ajax({
    method: "POST",
    url: "/todo",
    data: task,
  })
    .then(function (response) {
      console.log("response from server:", response);
      getTasks();
    })
    .catch(function (err) {
      console.log("error in POST", err);
      alert("unable to add task");
    });
}

function getTasks() {
  console.log("in getTasks");
  $.ajax({
    method: "GET",
    url: "/todo",
  }).then(function (response) {
    console.log(response);
    renderTasks(response);
  });
  // .catch(function (err) {
  //   console.log("error in GET", err);
  //   alert("unable to get task");
  // });
}

function renderTasks(listOfTasks) {
  $("#displayContainer").empty();

  for (let task of listOfTasks) {
    $("#displayContainer").append(`
        <tr data-id=${task.id}>
            <td>${task.task}</td>
            <td>${task.complete}</td>
            <td><button id="completeBtn">COMPLETE</button><td>
            <td><button id="deleteBtn">DELETE</button><td>
        <tr>
        `);
  }
}
