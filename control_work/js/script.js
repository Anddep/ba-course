const tasks = [
  { id: 1, title: "Go to the cinema", done: false },
  { id: 2, title: "Go to the theatre", done: true },
  { id: 3, title: "Learn Java Script", done: false },
  { id: 4, title: "Finish HTML project", done: false },
];

// console.log(tasks.at(-1).id);


//display tasks form data
const tasksBox = document.getElementById('tasks-box');
tasks.forEach((element) => {
  generateTask(element);
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
}



