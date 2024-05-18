const taskList = document.getElementById("task-list");
const newTaskForm = document.getElementById("new-task");
const timeField = document.getElementById("time");
const clearAll = document.getElementById("clear-task");
const errorElement = document.querySelector(".error-message");

let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];

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
    }
  } else {
    showError("Not allowed to add more than 4 tasks");
  }
});

function formValidator(task, priority) {
  if (task === "") {
    showError("Task description is required");
    return false;
  }
  if (isNaN(priority) || priority < 1 || priority > 4) {
    showError("Invalid priority");
    return false;
  }
  return true;
}

function addTaskToDOM(task) {
  const newTaskElement = document.createElement("li");
  newTaskElement.innerHTML = `
    <span>${task}</span> <input type="checkbox" value="done" />
  `;
  taskList.appendChild(newTaskElement);
}

function saveTask(task, priority) {
  taskArray.push({ task, priority, status: "unchecked" });
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
        <span>${taskObject.task}</span> <input type="checkbox" value="done" />
      `;
      taskList.appendChild(newTaskElement);
    });
}

// updating the stutus of task whose checkbox is checked

document.getElementById("updatetasklist").addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(
    '#task-list li input[type="checkbox"]'
  );

  checkboxes.forEach((box) => {
    if (box.checked) {
      const taskText = box.previousElementSibling.textContent.trim();
      const index = taskArray.findIndex((task) => task.task === taskText);

      if (index !== -1) {
        taskArray[index].status = "checked";
      }
    }
  });

  localStorage.setItem("tasks", JSON.stringify(taskArray));
  RefreshTaskList();
});

function RefreshTaskList() {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Filter out tasks with the status "checked"
  taskArray = savedTasks.filter(
    (task) => task !== null && task.status !== "checked"
  );

  // Save the updated task array back to localStorage
  localStorage.setItem("tasks", JSON.stringify(taskArray));

  // Re-populate the task list with the updated tasks
  populateTaskList();
}

// function form download file

document.querySelector(".download").addEventListener("click", () => {
  const zipUrl = "EisenHower-Box.zip";

  const downloadLink = document.createElement("a");
  downloadLink.href = zipUrl;
  downloadLink.setAttribute("download", "EisenHower-Box");

  downloadLink.click();

  downloadLink.remove();
});

function showError(msg) {
  errorElement.textContent = msg;
  errorElement.style.visibility = "visible";
  setTimeout(() => {
    errorElement.style.visibility = "hidden";
  }, 2000);
}
