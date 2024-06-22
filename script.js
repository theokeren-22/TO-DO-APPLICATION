let todoItemsContainer=document.getElementById('todoItemsContainer');
let addButton=document.querySelector('.add-todo-button');
let inputElement=document.querySelector('#todosUserInput');
let saveTodoButton=document.getElementById("saveButton");
// let todoList=[
//     {
//         text:"Learn HTML",
//         uniqueNo:1
//     },
//     {
//         text:"Learn CSS",
//         uniqueNo:2
//     },
//     {
//         text:"Learn JS",
//         uniqueNo:3
//     }
// ];
function getTodolistFromLocalStorage(){
    let stringifiedTodoList=localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if(parsedTodoList===null){
        return [];
    }
    else{
        return parsedTodoList;
    }

}

let todoList=getTodolistFromLocalStorage();

function createAndAppendTodo(newTodo){

}
function onTodoStatusChange(checkboxId,labelId,todoId){
    let checkboxElement=document.getElementById(checkboxId);
    let labelElement=document.getElementById(labelId);
    labelElement.classList.toggle('checked');
    let todoObjectIndex=todoList.findIndex((eachTodo)=>{
        let eachTodoId='todo'+eachTodo.uniqueNo;
        if(eachTodoId===todoId){
            return true;
        }
        else{
            return false;
        }
    });
    let todoObject=todoList[todoObjectIndex];
    if(todoObject.isChecked===true){
        todoObject.isChecked=false;
    }
    else{
        todoObject.isChecked=true;
    }
}
function deleteTodoItem(todoId){
    let todoElement=document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let todoIndex=todoList.findIndex((todoItem)=>{
        todoItemId='todo'+todoItem.uniqueNo;
        if(todoId===todoItemId){
            return true;
        }
        else{
            return false;
        }
    });
    removedItem=todoList.splice(todoIndex,1);
    console.log(removeItem);
}
function createNewItem(task) {
    let checkboxId = 'checkbox' + task.uniqueNo;
    let labelId = 'label' + task.uniqueNo;
    let todoId='todo'+task.uniqueNo;
    let todoElement = document.createElement('li');
    todoElement.classList.add('todo-item-container', 'd-flex', 'flex-row');
    todoElement.id=todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement('input');
    inputElement.type = 'checkbox';
    inputElement.id = checkboxId;
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId,todoId);
    }
    inputElement.classList.add('checkbox-input');
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement('div');
    labelContainer.classList.add('label-container', 'd-flex', 'flex-row');
    todoElement.appendChild(labelContainer);

    let inputLabel = document.createElement('label');
    inputLabel.classList.add('checkbox-label');
    inputLabel.setAttribute('for',checkboxId);  // Fix: ensure the 'for' attribute matches the checkbox ID
    inputLabel.id = labelId;
    inputLabel.textContent = task.text;
    labelContainer.appendChild(inputLabel);

    let deleteContainer = document.createElement('div');
    deleteContainer.classList.add('delete-icon-container');
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
    deleteIcon.onclick=function(){
        deleteTodoItem(todoId);
    }
    deleteContainer.appendChild(deleteIcon);
    if(task.isChecked===true){
        inputElement.checked=true;
        inputLabel.classList.add("checked");
    }
    else{
        inputElement.checked=false;
        inputLabel.classList.remove("checked");
    }
}

for(let task of todoList){
    createNewItem(task);
}
addButton.addEventListener('click',()=>{
    let taskName=inputElement.value;
    if(taskName===""){
        alert("enter valid text");
        return;
    }
    todosCount=todoList.length+1;
    let newTodo={
        text:taskName,
        uniqueNo:todosCount,
        isChecked:false
    };
    todoList.push(newTodo);
    createNewItem(newTodo);
    inputElement.value="";
});

saveTodoButton.addEventListener('click',()=>{
    localStorage.setItem("todoList",JSON.stringify(todoList));
})