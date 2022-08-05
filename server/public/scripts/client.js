console.log("js");

$(document).ready(onReady);

function onReady() {
  getTasks();
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
