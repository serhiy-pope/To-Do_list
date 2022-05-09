const taskListsContainer = document.querySelector('[new-task-lists]');
const newTaskListForm = document.querySelector('[new-list-form]');
const newTaskListInput = document.querySelector('[new-list-input]');
const deleteListButton = document.querySelector('[delete-list-button]');
const tasksListDisplayContainer = document.querySelector('[tasks-list-display-container]');
const tasksListTitleElement = document.querySelector('[tasks-list-title-element]');
const tasksContainer = document.querySelector('[tasks-container]');
const taskTemplate = document.getElementById('task-template');
const newTaskForm = document.querySelector('[new-task-form]');
const newTaskInput = document.querySelector('[new-task-input]');
const deleteDoneTasksButton = document.querySelector('[delete-done-tasks-button]');

const localStorageTaskListKey = "task.taskLists";
const localStorageSelectedTaskListIDKey = "task.selectedTaskListID";

let taskLists = JSON.parse(localStorage.getItem(localStorageTaskListKey)) || [];
let selectedTaskListID = localStorage.getItem(localStorageSelectedTaskListIDKey);

let today = new Date();
let dd = String(today.getDate());
let mm = String(today.getMonth() + 1);
let yyyy = today.getFullYear();
today = yyyy + '/' + mm + '/' + dd;
document.getElementById("current-date").innerHTML = today;

taskListsContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedTaskListID = e.target.dataset.listId;
    saveAndRenderNewList();
  }
})

tasksContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'input') {
    const selectedList = taskLists.find(taskList => taskList.id === selectedTaskListID);
    const selectedTask = selectedList.tasks.find(newTask => newTask.id === e.target.id);
    selectedTask.complete = e.target.checked;
    saveNewList();
  }
})

deleteDoneTasksButton.addEventListener('click', e => {
  const selectedList = taskLists.find(taskList => taskList.id === selectedTaskListID);
  selectedList.tasks = selectedList.tasks.filter(taskList => !taskList.complete);
  saveAndRenderNewList();
})

deleteListButton.addEventListener('click', e => {
  taskLists = taskLists.filter(taskList => taskList.id !== selectedTaskListID);
  selectedTaskListID = null;
  saveAndRenderNewList();
})

newTaskListForm.addEventListener('submit', e => {
  e.preventDefault();
  const newListName = newTaskListInput.value;
  if (newListName == null || newListName === "") {
    alert("You didn't enter anything");
  } else {
  const newList = createNewList(newListName);
  newTaskListInput.value = null;
  taskLists.push(newList);
  saveAndRenderNewList();
  }
})

newTaskForm.addEventListener('submit', e => {
  e.preventDefault();
  const newTaskName = newTaskInput.value;
  if (newTaskName == null || newTaskName === "") {
    alert("You didn't enter anything");
  } else {
  const newTask = createNewTask(newTaskName);    
  newTaskInput.value = null;
  const selectedList = taskLists.find(taskList => taskList.id === selectedTaskListID);
  selectedList.tasks.push(newTask)
  saveAndRenderNewList();
  }
})

function createNewTask(name) {
    return { 
    id: Date.now().toString(), 
    name: name, 
    complete: false 
  }
}

function createNewList(name) {
  return { 
    id: Date.now().toString(), 
    name: name, 
    tasks: [] 
  }
}

function saveNewList() {
  localStorage.setItem(localStorageTaskListKey, JSON.stringify(taskLists));
  localStorage.setItem(localStorageSelectedTaskListIDKey, selectedTaskListID);
}

function saveAndRenderNewList() {
  generalRenderFunc();
  saveNewList();
}

function generalRenderFunc() {
  clearElement (taskListsContainer);
  renderNewList();

  const selectedList = taskLists.find(taskList => taskList.id === selectedTaskListID);
  if (selectedTaskListID == null) {
    tasksListDisplayContainer.style.display = "none";
  } else {
    tasksListDisplayContainer.style.display = "";
    tasksListTitleElement.innerText = 'My ' + selectedList.name + "'s Tasks";
    clearElement(tasksContainer);
    renderNewTask(selectedList);
  }
}

function renderNewTask(selectedList) {
  selectedList.tasks.forEach(task => {
    const newTaskElement = document.importNode(taskTemplate.content, true);
    const checkbox = newTaskElement.querySelector('input');
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = newTaskElement.querySelector('label');
    label.htmlFor = task.id;
    label.append(task.name);
    tasksContainer.appendChild(newTaskElement)
  })
}

function renderNewList() {
    taskLists.forEach(taskList => {
    const taskListElement = document.createElement('li');
    taskListElement.classList.add("task-list-name");
    taskListElement.innerText = taskList.name;
    taskListElement.dataset.listId = taskList.id;
    if (taskList.id === selectedTaskListID) {
      taskListElement.classList.add("selected-list");
    };
    taskListsContainer.appendChild(taskListElement);
  })
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

generalRenderFunc();