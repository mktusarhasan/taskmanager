//DEFINE UI VARs
const from = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners

loadEventListeners();

//Load all event listeners

function loadEventListeners() {
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    from.addEventListener('submit', addTask);
    // add event listener for remove task

    taskList.addEventListener('click', removeTask);

    //clear Tasks
    clearBtn.addEventListener('click', clearTasks);
    //Filter event 
    filter.addEventListener('keyup', filterTasks);
}
//Get Tasks From LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        //Create a li element
        const li = document.createElement('li');
        //Add a class
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
        //create new link element
        const link = document.createElement('a');
        //add a classfdfdg
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class= "fa fa-remove"></i>';
        //Append the link to li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);
    })
}

//Add Task
function addTask(e) {
    if (taskInput.value === '') {
        
        alert('Add a Task');

    }
    else {
        
        //Create a li element
        const li = document.createElement('li');
        //Add a class
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        //create new link element
        const link = document.createElement('a');
        //add a classfdfdg
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class= "fa fa-remove"></i>';
        //Append the link to li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);
        //Store in local storage
        storeTaskInLocalStorage(taskInput.value);
    }
    taskInput.value = '';

e.preventDefault();
}

//store tasks
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task
function removeTask (e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure!')){
            e.target.parentElement.parentElement.remove();
            //remove from LS
            removeTaskFromLocalStorage
            (e.target.parentElement.parentElement);
        }
    }
}

//remove From LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear Tasks
function clearTasks(e) {
    //taskList.innerHTML = '';

    //the faster one 
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}
//clear task from LS

function clearTasksFromLocalStorage() {
    localStorage.clear();
}
//filetrTasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}
