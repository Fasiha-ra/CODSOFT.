const addTask = document.getElementById('addTask');
const btnText = addTask.innerText;
const enterTask = document.getElementById('enterTask');
const display = document.getElementById('display');
let taskArray=[];
let edit_id = null;
let objstr= localStorage.getItem('tasks');
if(objstr != null){
  taskArray = JSON.parse(objstr);
}
 displayTask();

addTask.onclick=()=>{
  let task = enterTask.value;
  if(edit_id != null){
  taskArray.splice(edit_id, 1,{'task': task} )
  edit_id = null;
  }else{
    
 taskArray.push({'task': task});
  }
 
 saveTask(taskArray);
 enterTask.value='';
 displayTask();
 addTask.innerText = btnText;
}

function saveTask(taskArray){
  let str = JSON.stringify(taskArray);
  localStorage.setItem('tasks', str );
}

function displayTask(){
let statement = '';
taskArray.forEach((task,i) =>{
  statement += ` <tr>
  <th scope="row">${i+1}</th>
    <td>${task.task}</td>
    <td><i class="btn text-white fa fa-edit btn-info mx-3" onclick=editTask(${i})></i>
    <i class="btn btn-danger text-white fa fa-trash-o" onclick=deleteTask(${i})></i></td>
</tr>`;
});
display.innerHTML = statement;
}

function editTask(id){
edit_id = id;
enterTask.value = taskArray[id].task;
addTask.innerText = 'Edit Task';
}

function deleteTask(id){
taskArray.splice(id, 1);
saveTask(taskArray);
displayTask();
}