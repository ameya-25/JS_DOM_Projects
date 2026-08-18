document.addEventListener('DOMContentLoaded', () => {     
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const ulElement = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];     // parse() : JSON formatted String to JS original object
  tasks.forEach((item) => {     //if there is task display it
    renderDisplayTask(item);
  })

  addTaskButton.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    if (taskText === "")
      return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    };
    tasks.push(newTask);
    saveTaskLocal();
    renderDisplayTask(newTask);         

    todoInput.value = "";     // clearing input updating after pushing task
    console.log(tasks);
    
})

function renderDisplayTask(task) {
  console.log(task);
  const li = document.createElement('li');
  li.setAttribute("data-id", task.id);
  if (task.completed){              
    li.classList.add("completed-task");           
  }

  li.innerHTML = `
  <span>${task.text}</span> 
  <button>delete</button>
  `;
  
  ulElement.append(li);

  li.addEventListener('click', (e) => {
    if(e.target.tagName === "BUTTON")     return;
    task.completed = !(task.completed);
    li.classList.toggle("completed-task");  

    saveTaskLocal();
  })

  //For removing tasks
  const deleteButton = li.querySelector("button");
    deleteButton.addEventListener('click', (e) => {
    e.stopPropagation();             
    tasks = tasks.filter((t) => t.id !== task.id)           // tasks --> array
    li.remove();              // now remove

    saveTaskLocal();
  })
  
}


function saveTaskLocal() {
  localStorage.setItem("Tasks" , JSON.stringify(tasks));    // stringify() : JS Object to JSON formatted String
}

})
// whenever manupilation anything in array, call saveTaskLocal() for local Storage