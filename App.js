document.getElementById("addTaskButton").addEventListener("click", addTask);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value.trim();
  if (taskName !== "") {
    const taskBlock = document.createElement("div");
    taskBlock.className = "task-block";
    
    const taskNameBlock = document.createElement("div");
    taskNameBlock.className = "task-name";
    taskNameBlock.textContent = taskName;
    taskNameBlock.draggable = true;
    taskNameBlock.addEventListener("dragstart", handleDragStart);
    taskNameBlock.innerHTML += '<button class="delete-button">Delete</button>';

    const taskDescriptionBlock = document.createElement("div");
    taskDescriptionBlock.className = "task-description";

    taskBlock.appendChild(taskNameBlock);
    taskBlock.appendChild(taskDescriptionBlock);

    document.getElementById("taskList").appendChild(taskBlock);
    taskInput.value = "";

    
    const deleteButton = taskNameBlock.querySelector(".delete-button");
    deleteButton.addEventListener("click", function () {
      taskBlock.remove();
    });

    taskNameBlock.addEventListener("click", function () {
      openModal(taskDescriptionBlock);
    });
  }
}

function openModal(descriptionBlock) {
  const modal = document.getElementById("taskModal");
  const closeModalButton = document.getElementById("closeModal");
  const descriptionTextarea = document.getElementById("descriptionTextarea");
  const saveDescriptionButton = document.getElementById(
    "saveDescriptionButton"
  );

  descriptionTextarea.value = descriptionBlock.textContent;

  modal.style.display = "flex";

  closeModalButton.onclick = function () {
    modal.style.display = "none";
  };

  saveDescriptionButton.onclick = function () {
    descriptionBlock.textContent = descriptionTextarea.value;
    modal.style.display = "none";
  }; 
}

function handleDragStart(e) {
  console.log(e.target.parentElement);
  e.dataTransfer.setData("text/html", e.target.outerHTML);
  e.target.classList.add("dragged");
}

function allowDrop(ev) {
  ev.preventDefault();
}

function handleDrop(ev, targetCardId) {
  ev.preventDefault();
  const taskText = ev.dataTransfer.getData("text/plain");
  const targetCard = document.getElementById(targetCardId);
  const test = document.createElement("div");
  test.classList.add("task-block");
  if (targetCard) {
    console.log(targetCard);

    const taskBlock = document.querySelector(".dragged");
    const parentElement = taskBlock.parentElement;
    if (parentElement.classList.contains("task-block")) {
      parentElement.classList.remove("task-block");
    }
    taskBlock.classList.remove("dragged");
    taskBlock.classList.remove("task-block");
    targetCard.classList.add("task-block");
    targetCard.appendChild(test);
    test.appendChild(taskBlock);
  }
}