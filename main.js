window.addEventListener('load', () => {
  // Selecting necessary DOM elements
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const dueDateInput = document.querySelector("#new-task-due-date");
  const categorySelect = document.querySelector("#new-task-category");
  const list_el = document.querySelector("#tasks");


  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Retrieve task and due date values from the input fields
    const task = input.value;
    const dueDate = dueDateInput.value;
    

    // Validation checks
    if (task.trim() === "") {
      alert("Task cannot be empty");
      return;
    }

    if (task.length > 30) {
      alert("Task cannot exceed 30 characters");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(dueDate);

    if (selectedDate < today) {
      alert("Due date can't be prior to today");
      return;
    }


    // Create task elements
    const task_el = document.createElement('div');
    task_el.classList.add('task');

    const task_number_el = document.createElement('span');
     task_number_el.classList.add('task-number');

     task_el.appendChild(task_number_el);

    const task_content_el = document.createElement('div');
    task_content_el.classList.add('content');

    task_el.appendChild(task_content_el);

  

    const task_input_el = document.createElement('input');
    task_input_el.classList.add('text');
    task_input_el.type = 'text';
    task_input_el.value = task;
    task_input_el.setAttribute('readonly', 'readonly');

    const task_due_date_el = document.createElement('input');
    task_due_date_el.classList.add('due-date');
    task_due_date_el.type = 'text';
    task_due_date_el.value = dueDate;
    task_due_date_el.setAttribute('readonly', 'readonly');

    task_content_el.appendChild(task_input_el);
    task_content_el.appendChild(task_due_date_el);

    const task_actions_el = document.createElement('div');
    task_actions_el.classList.add('actions');

  

    const task_move_up_el = document.createElement('button');
    task_move_up_el.classList.add('move-up');
    task_move_up_el.innerText = 'Move Up';

    const task_move_down_el = document.createElement('button');
    task_move_down_el.classList.add('move-down');
    task_move_down_el.innerText = 'Move Down';


    const task_delete_el = document.createElement('button');
    task_delete_el.classList.add('delete');
    task_delete_el.innerText = 'Delete';

    const task_done_el = document.createElement('button');
    task_done_el.classList.add('done');
    task_done_el.innerText = 'Done';


    const important_button = document.createElement('button');
    important_button.classList.add('important');
    important_button.textContent = "Important";
    important_button.addEventListener('click', () => {
      important_button.classList.toggle('active');
     
    });

   

    task_actions_el.appendChild(task_move_up_el);
    task_actions_el.appendChild(task_move_down_el);
    task_actions_el.appendChild(task_delete_el);
    task_actions_el.appendChild(task_done_el);
    task_actions_el.appendChild(important_button);
    

    task_el.appendChild(task_actions_el);

    list_el.appendChild(task_el);

    updateTaskNumbers();

    input.value = '';
    dueDateInput.value = '';

    

    // Event listener for the "Delete" button
    task_delete_el.addEventListener('click', () => {
      const confirmation = confirm("Are you sure you want to delete this task?");
      if (confirmation) {
        list_el.removeChild(task_el);
        updateTaskNumbers();
      }
    });

    // Event listener for the "Move Up" button
    task_move_up_el.addEventListener('click', () => {
      const prevTask = task_el.previousElementSibling;
      if (prevTask) {
        list_el.insertBefore(task_el, prevTask);
        updateTaskNumbers();
      }
    });

    // Event listener for the "Move Down" button
    task_move_down_el.addEventListener('click', () => {
      const nextTask = task_el.nextElementSibling;
      if (nextTask) {
        list_el.insertBefore(nextTask, task_el);
        updateTaskNumbers();
      }
    });

   /// Event listener for the "Done" button
   task_done_el.addEventListener('click', () => {
     if (task_done_el.textContent === 'Done') {
       task_done_el.textContent = 'Renew';
       task_el.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
     } else if (task_done_el.textContent === 'Renew') {
       task_done_el.textContent = 'Done';
       task_el.style.backgroundColor = 'rgba(17, 24, 39, 0.5)';
     }
   });



   function updateTaskNumbers() {
     const taskElements = document.getElementsByClassName('task');
   
     // Iterate through each task element and update its task number
     for (let i = 0; i < taskElements.length; i++) {
       const taskNumberEl = taskElements[i].querySelector('.task-number');
       taskNumberEl.textContent = i + 1;
       
     }
   }

           const task_category_el = document.createElement('p');
           task_category_el.classList.add('category');

           let categoryValue = categorySelect.value;
           if (categoryValue === "Other") {
                categoryValue = "Other";
             
           }

           task_category_el.textContent = `Category: ${categoryValue}`;
           task_content_el.appendChild(task_category_el);



   



});
});


