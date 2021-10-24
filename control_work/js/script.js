const tasks = [
  // { id: 1, title: "Go to the cinema", done: false },
  // { id: 2, title: "Go to the theatre", done: true },
  // { id: 3, title: "Learn Java Script", done: false },
  { id: 4, title: "Finish HTML project", done: false },
];

// console.log(tasks.at(-1).id);


//display tasks form data
const tasksBox = document.getElementById('tasks-box');

const showAllTasks = new Promise((resolve, reject) => {
  tasks.forEach((element) => {
    generateTask(element);
  });
  resolve();
});

showAllTasks.then(() => {
  updateCount();
});


function generateTask (task) {
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex');
  const span = document.createElement('span');
  if (task.done) {
    span.classList.add('done')
  }
  span.textContent = task.title;
  //control DIV
  const controlDiv = document.createElement('div');
  controlDiv.classList.add('icons-box', 'ml-auto');
  const ckechIcon = document.createElement('div');
  ckechIcon.classList.add('fa', 'fa-check', 'mr-3');
  if (task.done) {
    ckechIcon.classList.add('red')
  }
  const removeIcon = document.createElement('div');
  removeIcon.classList.add('fa', 'fa-trash');

  controlDiv.appendChild(ckechIcon);
  controlDiv.appendChild(removeIcon);

  li.appendChild(span);
  li.appendChild(controlDiv);

  tasksBox.appendChild(li);
}

//click on Done btn
document.addEventListener('click', handleDoneTask);

function handleDoneTask(e) {
  if (!e.target.classList.contains('fa-check')) {
    return
  }
  e.target.classList.toggle('red');
  const listItem = e.target.closest('li');
  listItem.firstElementChild.classList.toggle('done');

  //change ib obj
  const textValue = e.target.closest('li').firstElementChild.textContent;
  let indexInTasks = tasks.findIndex(el => el.title === textValue);
  tasks[indexInTasks].done = !tasks[indexInTasks].done;

  updateCount();
}


//add task form
document.addEventListener('submit', handleAddTask);

function handleAddTask(e) {
  e.preventDefault();
  if (!e.target.id == 'task-form') {
    return;
  }
  const textInput = e.target.title;

  if (textInput.value.trim().length < 5 ) {
    alert('Need fill at least 5 characters');
    return;
  }

  let id = 1;
  if (tasks.at(-1) !== undefined && tasks.at(-1).id) {
    id = tasks.at(-1).id + 1
  }
  const newTask = {
    id: id,
    title: textInput.value,
    done: false
  }
  tasks.push(newTask);
  generateTask(newTask);
  textInput.value = '';

  console.log(newTask);

  updateCount();
}


//delete task
document.addEventListener('click', handleDeleteTask);

function handleDeleteTask(e) {
  if (!e.target.classList.contains('fa-trash')) {
    return ;
  }
  if (!confirm('Are you sure ?')) {
    return;
  }
  const parentLi = e.target.closest('li');
  parentLi.parentNode.removeChild(parentLi);
  const textValue = e.target.closest('li').firstElementChild.textContent;

  let indexInTasks = tasks.findIndex(el => el.title === textValue);
  tasks.splice(indexInTasks, 1);
  updateCount();
}


//Info block
function updateCount () {
  const infoBlock = document.getElementById('tasks-info');
  const total = document.getElementById('tasks-total');
  const done = document.getElementById('tasks-done');
  const remain = document.getElementById('tasks-remain');
  if (tasks.length === 0) {
    infoBlock.style.display = "none";
  } else {
    infoBlock.style.display = "block";
  }
  total.textContent = tasks.length;
  done.textContent = tasks.filter((task) => {
    return task.done === true;
  }).length;
  remain.textContent = tasks.filter((task) => {
    return task.done === false;
  }).length;

}
