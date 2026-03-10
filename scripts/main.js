
let tasks = null;
let tasks_pause_save = false;

const handler = {
    set: function(target, property, value, reciever) {
        target[property] = value;

        if (!tasks_pause_save) {
            saveTasks();
            render();
        }

        return true;
    }
};

initApp();

function initApp() {
    const add_task_button = document.getElementById("add-task-button");
    add_task_button.addEventListener('click', (e) => {
        e.preventDefault();
        onAddTaskClick(e.currentTarget);   
    });

    const add_task_form = document.getElementById("add-task-form");
    add_task_form.addEventListener('submit', (e) => {
        e.preventDefault();
        onAddTaskFormSubmit(e.currentTarget);   
    });

    const clear_list_button = document.getElementById("clear-list-button");
    clear_list_button.addEventListener('click', (e) => {
        e.preventDefault();
        onClearTaskListClick(e.currentTarget);
    });

    data = loadTaskData();
    tasks = new Proxy(data, handler);

    doMissedReset();

    scheduleReset();

    render();
}

function render() {
    const list = document.getElementById("task-list");
    list.innerHTML = "";

    for (const task of tasks)
    {
        const li = document.createElement("li");
        list.appendChild(li);

        const div = document.createElement("div");
        div.classList.add("task");
        li.appendChild(div);

        const buttons_div = document.createElement("div");
        buttons_div.classList.add("task-buttons");
        div.appendChild(buttons_div);

        const checkbox_label = document.createElement("label");
        checkbox_label.classList.add("task-checkbox");
        buttons_div.appendChild(checkbox_label);

        const checkbox_input = document.createElement("input");
        checkbox_input.type = "checkbox";
        checkbox_input.addEventListener("click", (e) => {
            onTaskCheckboxClicked(e.currentTarget, task);
        });
        checkbox_input.checked = task.done;
        checkbox_label.appendChild(checkbox_input);

        const checkbox_shape = document.createElement("span");
        checkbox_shape.classList.add("task-checkbox-shape");
        checkbox_label.appendChild(checkbox_shape);

        const remove_label = document.createElement("label");
        remove_label.classList.add("task-remove");
        buttons_div.appendChild(remove_label);

        const remove_button = document.createElement("input");
        remove_button.type = "button";
        remove_button.addEventListener("click", (e) => {
            onTaskRemoveClicked(e.currentTarget, task);
        });
        remove_label.appendChild(remove_button);

        const task_text_div = document.createElement("div");
        task_text_div.classList.add("task-text");
        div.appendChild(task_text_div);

        const task_title = document.createElement("p");
        task_title.classList.add("task-title");
        task_title.textContent = task.text;
        task_text_div.appendChild(task_title);

        const task_due_date = document.createElement("p");
        task_due_date.classList.add("task-due-date");
        task_due_date.textContent = toTwelveTime(task.time);
        task_text_div.appendChild(task_due_date);
    }
}