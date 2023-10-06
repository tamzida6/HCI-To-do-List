const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list");
const dueDate = document.getElementById("due-date");

const compltedTask = [];

function addTask() {
  if (inputBox.value === "") {
    alert("Enter a task");
  } else {
    let task = {
      description: inputBox.value,
      dueDate: dueDate.value,
    };
    compltedTask.push(task);
    let li = document.createElement("li");
    li.innerHTML = `${inputBox.value} <p class="due-date">Due: ${dueDate.value}</p>`;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  dueDate.value = "";
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("completed");

      if (e.target.className === "completed") {
        let taskDescription = e.target.firstChild.textContent.trim();
        let taskDueDate = e.target
          .querySelector(".due-date")
          .textContent.replace("Due: ", "")
          .trim();
        let taskToUpdate = {
          description: taskDescription,
          dueDate: taskDueDate,
        };
        let index = compltedTask.findIndex(
          (task) =>
            task.description === taskToUpdate.description &&
            task.dueDate === taskToUpdate.dueDate
        );
        if (index !== -1) {
          compltedTask[index].completed = !compltedTask[index].completed;
        }
      }
    } else if (e.target.tagName === "SPAN") {
      let taskDescription =
        e.target.parentElement.firstChild.textContent.trim();
      let taskDueDate = e.target.parentElement
        .querySelector(".due-date")
        .textContent.replace("Due: ", "")
        .trim();
      let taskToRemove = {
        description: taskDescription,
        dueDate: taskDueDate,
      };
      let index = compltedTask.findIndex(
        (task) =>
          task.description === taskToRemove.description &&
          task.dueDate === taskToRemove.dueDate
      );
      if (index !== -1) {
        compltedTask.splice(index, 1);
      }
      e.target.parentElement.remove();
    }
    localStorage.setItem("tasks", JSON.stringify(compltedTask));
  },
  false
);

