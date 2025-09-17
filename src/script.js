let tasks = []; //Array
let indexForBtn = null; //Null för inget

let retString = localStorage.getItem("key");
if (retString) {
  tasks = JSON.parse(retString);
}

//Metod för att komma åt olika delar av html-strukturen
let taskInput = document.querySelector("#todo-task");
const taskbutton = document.querySelector("#todo-button");
const taskDisplay = document.querySelector("#task-display");
const taskDoneDisplay = document.querySelector("#completed");

// Logik för att lägga till task
const addTask = (e) => {
  e.preventDefault();

  const inputValue = taskInput.value.trim();
  //Är input = inget så avslutas det
  if (inputValue === "") return;

  //Om index inte är 0, så läggs det tasken
  //man tryckt edit på i input-field
  if (indexForBtn !== null) {
    tasks[indexForBtn].name = inputValue;
    indexForBtn = null;
  } else {
    //annars pushar man in input i arrayen
    tasks.push({
      name: inputValue,
      isDone: false,
    });
  }
  //återställer input-fielden
  taskInput.value = "";
  //renderar om task
  localStorage.setItem("key", JSON.stringify(tasks));
  renderTask();
};
//Lägger till funktionen till knappen "Skicka"
taskbutton.addEventListener("click", addTask);

const renderTask = () => {
  taskDisplay.innerHTML = "";
  taskDoneDisplay.innerHTML = ""; 

  tasks.forEach((task, i) => {
    let liElement = document.createElement("li");
    let liEdit = document.createElement("button");
    let liDelete = document.createElement("button");
    let liCompleted = document.createElement("button");

    liElement.textContent = task.name;
    liEdit.innerText = "Edit";
    liDelete.innerText = "Delete";
    liCompleted.innerText = "Klar";

    
    const liClone = liElement.cloneNode(true);

    if (task.isDone) {
      // Append to the completed tasks display
      liClone.appendChild(liDelete);
      taskDoneDisplay.appendChild(liClone);
    } else {
      
      liElement.appendChild(liEdit);
      liElement.appendChild(liDelete);
      liElement.appendChild(liCompleted);
      taskDisplay.appendChild(liElement);
    }

    
    liEdit.addEventListener("click", () => {
      taskInput.value = task.name;
      indexForBtn = i;
    });

    
    liCompleted.addEventListener("click", () => {
      task.isDone = true;
      localStorage.setItem("key", JSON.stringify(tasks));
      renderTask();
    });

    // Delete button functionality
    liDelete.addEventListener("click", () => {
      tasks.splice(i, 1);
      localStorage.setItem("key", JSON.stringify(tasks));
      renderTask();
    });
  });
};

console.table(tasks);
