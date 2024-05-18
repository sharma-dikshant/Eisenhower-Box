const taskList = document.getElementById("task-list");
const newTask = document.getElementById("new-task");
const timeField = document.getElementById("time");

let taskArray = [
  {
    task: "task 1",
    priority: 1,
  },
  {
    task: "task 2",
    priority: 2,
  },
  {
    task: "task 3",
    priority: 3,
  },
  {
    task: "task 4",
    priority: 4,
  },
];

console.log(taskList);

// function to update time

window.addEventListener(
  "DOMContentLoaded",
  (async function () {
    setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      timeField.textContent = currentTime;
    }, 1000);
  })()
);

newTask.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let taskCount = taskArray.length + 1;
  if (taskCount <= 4) {
    let task = document.querySelector(`.new-task input[name = "task"]`).value;
    let priority = document.querySelector(
      `.new-task input[name="priority"]`
    ).value;

    if (formValidator(task, priority)) {
      taskArray.push({ task: task, priority: priority });
      console.log(taskArray);
    }
  } else {
    alert("Not allowed to add more than 4 task");
  }
});

function formValidator(task, priority) {
  if (task === "") {
    alert("task description is gitrequired");
    return false;
  }
  if (isNaN(priority) || priority < 1 || priority > 4) {
    alert("invalid priority");
    return false;
  } else {
    return true;
  }
}

// populating tasks

taskArray.forEach((task) => {
  const newTaskElement = document.createElement("li");
  newTaskElement.innerHTML = `
    ${task.task} <input type="checkbox" value="done" />
    `;
  taskList.appendChild(newTaskElement);
});
