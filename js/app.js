const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collections');
const clearButton = document.querySelector('.delete-all-task');
const filter = document.querySelector('#filter-text');
const taskInput = document.querySelector('#task');

loadEventListener();

function loadEventListener() {
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click', removeTask);
    clearButton.addEventListener('click', deleteAll);
    filter.addEventListener('keyup', filterTask);
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
        link.innerText = 'CLEAR';
        li.appendChild(link);    
        taskList.appendChild(li);
        taskInput.value = '';
    }
    e.preventDefault();   
}

function removeTask(e) {
    // console.log(e.target);
    if(e.target.classList.contains('delete-item')) {
       e.target.parentElement.remove();
    }
}

function deleteAll() {
    // taskList.innerHTML = '';
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
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