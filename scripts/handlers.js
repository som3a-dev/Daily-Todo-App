function onAddTaskClick(button) {
    const popup = document.getElementById("add-task-popup");

    flipElementWithAnimation(popup);

    temporaryDisable(button, 300);
}

function onAddTaskFormSubmit(form) {
    if (!form || !form instanceof HTMLFormElement) {
        console.error("Form is invalid or missing");
        return;
    }
    const name_input = form.elements["name"];
    if (!name_input || typeof name_input.value !== "string") {
        console.error("Task name not found or invalid");
        return;
    }
    const name = name_input.value.trim();
    if (name.length === 0) {
        // TODO(omar): tell the user this is invalid
        return;
    }

    const time_input = form.elements["due-time"];
    if (!time_input || typeof time_input.value !== "string") {
        console.error("Task due time not found or invalid");
        return;
    }
    const time = time_input.value.trim();
    if (time.length === 0) {
        // TODO(omar): tell the user this is invalid
        return;
    }
    console.log(time);

    addTask(name, time);

    form.reset();
    const popup = document.getElementById("add-task-popup");
    flipElementWithAnimation(popup);

    render();
}

function onTaskCheckboxClicked(checkbox, task) {
    if (!checkbox || !checkbox instanceof HTMLInputElement || checkbox.type != "checkbox") {
        console.error("Checkbox is invalid or missing");
    }

    // TODO(omar): check beyond task simply being truthy
    if (!task) {
        console.error("Task is invalid or missing");
    }

    toggleTaskDone(task.id);
    render();
}

function onTaskRemoveClicked(button, task) {
    if (!button|| !button instanceof HTMLInputElement || button.type != "button") {
        console.error("Checkbox is invalid or missing");
    }

    // TODO(omar): check beyond task simply being truthy
    if (!task) {
        console.error("Task is invalid or missing");
    }

    removeTask(task.id);
    render();
}

function onClearTaskListClick(button) {
    if (!button) {
        console.error("Button is invalid or missing");
    }

    clearTasks();
    render();
}
