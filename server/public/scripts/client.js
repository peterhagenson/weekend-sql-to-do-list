console.log("js");

$(document).ready(onReady);

function onReady() {
  $("#createBtn").on("click", handleCreate);
  getTasks();
}

function handleCreate() {
  console.log("clicked");
  let taskToSend = {};
  taskToSend.task = $("#taskIn").val();
  taskToSend.status = "incomplete";
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
    .catch(function (error) {
      console.log("error in POST", error);
      alert("unable to add task");
    });
}

function getTasks() {
  console.log("in getTasks");
  $.ajax({
    method: "GET",
    url: "/todo",
  })
    .then(function (response) {
      console.log(response);
      renderTasks(response);
    })
    .catch(function (error) {
      console.log("error in GET", error);
      alert("unable to add task");
    });
  // .catch(function (error) {
  //   console.log("error in getTasks");
  // });
}

function renderTasks(listOfTasks) {
  $("#displayContainer").empty();

  for (let task of listOfTasks) {
    $("#displayContainer").append(`
        <tr>
            <td>${task.task}</td>
            <td>${task.status}</td>
        <tr>
        `);
  }
}
