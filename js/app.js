const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collections');
const clearButton = document.querySelector('.delete-all-task');
const filter = document.querySelector('#filter-text');
const taskInput = document.querySelector('#task');

loadEventListener();

function loadEventListener() {
    document.addEventListener('DOMContentLoaded', loadTask);
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click', removeTask);
    clearButton.addEventListener('click', deleteAll);
    filter.addEventListener('keyup', filterTask);
}
function loadTask() {
    let todoList = [];
    if(localStorage.getItem('todoList') !== null) {
        todoList = JSON.parse(localStorage.getItem('todoList'));
    }
    todoList.forEach(function(todo) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(todo));
        const link = document.createElement('a');
        link.className = 'delete-item';
        link.innerHTML = '<i class="fa fa-times"></i>';
        li.appendChild(link);    
        taskList.appendChild(li);
    });
}

function addTask(e) {
    if(taskInput.value === '') {
        alert("Please add the task");
    } else {
        
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement('a');
        link.className = 'delete-item';
        link.innerHTML = '<i class="fas fa-times"></i>';
        li.appendChild(link);    
        taskList.appendChild(li);
        storeTodos(taskInput.value);
        taskInput.value = '';
    }
    e.preventDefault();   
    
}
function storeTodos(value) {
    let todos = [];
    if(localStorage.getItem('todoList') !== null) {
        todos = JSON.parse(localStorage.getItem('todoList'));
    }
    todos.push(value);
    console.log(todos);
    localStorage.setItem('todoList', JSON.stringify(todos));
}
function removeTask(e) {
    // console.log(e.target);
    if(e.target.parentElement.classList.contains('delete-item')) {
       let todoList = JSON.parse(localStorage.getItem('todoList'));
       let todo = [];
        todoList.forEach((todos) => {
            if(todos !== e.target.parentElement.parentElement.textContent) {
                todo.push(todos);
            }
        });
        
        localStorage.setItem('todoList', JSON.stringify(todo));
       e.target.parentElement.parentElement.remove();
    }
}

function deleteAll() {
    // taskList.innerHTML = '';
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.removeItem('todoList');
}

function filterTask(e) {
    // console.log(e.target.value)
    const text = e.target.value.toLowerCase();
    const collectionList = Array.from(document.getElementsByClassName('collection-item'));
    collectionList.forEach(task => {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}