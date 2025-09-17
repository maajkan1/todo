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

// Logik för att lägga till task
const addTask = (e) => {
  e.preventDefault();

  const inputValue = taskInput.value.trim();
  //Är input = inget så avslutas det
  if (inputValue === "") return;

  //Om index inte är 0, så läggs det tasken
  //man tryckt edit på i input-field
  if (indexForBtn !== null) {
    tasks.name[indexForBtn] = inputValue;
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
  //Foreach istället för vanlig loop.
  tasks.forEach((task, i) => {
    let liElement = document.createElement("li");
    let liEdit = document.createElement("button");
    let liDelete = document.createElement("button");

    // Use textContent to add text without overwriting the buttons
    liElement.textContent = task.name;

    liEdit.innerText = "Edit";
    liDelete.innerText = "Delete";

    liElement.appendChild(liEdit);
    liElement.appendChild(liDelete);
    taskDisplay.appendChild(liElement);

    liEdit.addEventListener("click", () => {
      taskInput.value = task.name;
      indexForBtn = i;
    });

    liDelete.addEventListener("click", () => {
      tasks.splice(i, 1);
      //Sparar i localstorage precis när man tagit bort nåt.
      //Renderar sidan om igen
      localStorage.setItem("key", JSON.stringify(tasks));
      renderTask();
    });
  });
};
renderTask();
// console.table(tasks)
// console.log(tasks[0].isDone);