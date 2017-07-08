//var arrayOfTasks = [];

$(document).ready(function(){
  console.log('jQuery sourced.');

  getTasks();
  //appendToDom();

  $('#addTask').on('click', function(){
    console.log('in arrayOfTasks on click');
    // get user input and put in an object
    // using a test object
    var taskToAdd = {
      task: $('#inputField').val(),
    };
    // call addTask with the new task
   addTask(taskToAdd);
 }); //end addTask on click
  $('#taskList').on('click', '.deleteBtn', function(){
    var taskId = $(this).data('taskid');
    console.log($(this));
    deleteTask(taskId);
  });
  // $('#viewKoalas').on('click', '.transferBtn', function(){
  //   var koalaId = $(this).data('koalaid');
  //   console.log($(this));
  //   transferKoala(koalaId);
  // });
});




function getTasks(){
  $('#taskList').empty();
  console.log('got tasks');
  // ajax call to server to get tasks
  $.ajax({
    url: '/toDo',
    type: 'GET',
    success: function(response){
      console.log( 'got some tasks: ', response);
      appendToDom(response.arrayOfTasks);
    } // end success
  }); //end ajax
} // end getTasks

function addTask(newTask){
  console.log('in arrayOfTasks', newTask);
  // ajax call to server to get koalas
  $.ajax({
    url: '/toDo',
    type: 'POST',
    data: newTask,
    success: function( response ){
      console.log('added a task: ', response );
      getTasks();
    } // end success
  }); //end ajax
}

function deleteTask(taskId){
    console.log( 'in deleteKoalas' );
    // ajax call to server to get koalas
    $.ajax({
      url: '/toDo/' + taskId,
      type: 'DELETE',
      success: function(response){
        console.log(response);
        getTasks();
      } // end success
    }); //end ajax
    // display on DOM with buttons that allow edit of each
  } // end getKoalas


function appendToDom(arrayOfTasks) {
  //$('#taskList').empty();
  //loop through array and add rows of tasks to DOM
  for(var i = 0; i < arrayOfTasks.length; i += 1) {
    var eachTask = arrayOfTasks[i];
    // For each task, append a new row to our table
    $tr = $('<tr></tr>');
    $tr.data('nameOfDataAttribute', eachTask);
    $tr.append('<td>' + eachTask.task + '</td>');
    // $tr.append('<td><button class="editBtn">Edit</button></td>');
    $tr.append('<td><button class="deleteBtn" data-taskid="' + eachTask.id + '">Delete</button></td>');
    $('#taskList').append($tr);
  }
}
