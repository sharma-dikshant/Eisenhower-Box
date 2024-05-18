const taskList = document.getElementById("task-list");
const newTaskForm = document.getElementById("new-task");
const timeField = document.getElementById("time");
const clearAll = document.getElementById("clear-task");

let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(taskList);

// Function to update time
window.addEventListener("DOMContentLoaded", () => {
  setInterval(() => {
    const currentTime = new Date().toLocaleTimeString();
    timeField.textContent = currentTime;
  }, 1000);

  populateTaskList();
});

// clearing all tasks

clearAll.addEventListener("click", () => {
  localStorage.clear();
  taskList.innerHTML = "";
});

newTaskForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (taskArray.length < 4) {
    let task = document.querySelector(".new-task input[name='task']").value;
    let priority = document.querySelector(
      ".new-task input[name='priority']"
    ).value;

    if (formValidator(task, priority)) {
      saveTask(task, priority);
      addTaskToDOM(task);
      console.log(taskArray);
    }
  } else {
    alert("Not allowed to add more than 4 tasks");
  }
});

function formValidator(task, priority) {
  if (task === "") {
    alert("Task description is required");
    return false;
  }
  if (isNaN(priority) || priority < 1 || priority > 4) {
    alert("Invalid priority");
    return false;
  }
  return true;
}

function addTaskToDOM(task) {
  const newTaskElement = document.createElement("li");
  newTaskElement.innerHTML = `
    ${task} <input type="checkbox" value="done" />
  `;
  taskList.appendChild(newTaskElement);
}

function saveTask(task, priority) {
  taskArray.push({ task, priority });
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

function populateTaskList() {
  taskList.innerHTML = "";
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks
    .sort((a, b) => a.priority - b.priority)
    .forEach((taskObject) => {
      const newTaskElement = document.createElement("li");
      newTaskElement.innerHTML = `
        ${taskObject.task} <input type="checkbox" value="done" />
      `;
      taskList.appendChild(newTaskElement);
    });
}
