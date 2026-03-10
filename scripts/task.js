function loadTaskData() {
    data = localStorage.getItem("tasks");

    if (!data) {
        data = [];
        console.log("No localstorage data found");
    }
    else {
        data = JSON.parse(data);
        console.log("Found localstorage data");
        console.log(data);
    }

    for (i = 0; i < data.length; i++) {
        data[i] = new Proxy(data[i], handler);
    }

    return data;
}

function addTask(text, time) {
    const id = Date.now();

    let task = new Proxy({
        id: id,
        text: text,
        time: time,
        done: false
    }, handler);

    tasks.push(task);

    return id;
}

function toggleTaskDone(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.done = !(task.done);
    }
}

function removeTask(id) {
    const task = tasks.find(t => t.id === id);
    const i = tasks.indexOf(task);
    if (i > -1) {
        tasks.splice(i, 1);
    }
}

function clearTasks() {
    tasks.length = 0;
}

function isValidTaskText(text) {
    if (!text) {
        return false;
    }

    if (typeof text !== "string") {
        return false;
    }

    if (text.trim().length === 0) {
        return false;
    }

    return true;
}

function saveTasks() {
    tasks_pause_save = true;
    sortTasksByTime();
    tasks_pause_save = false;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function sortTasksByTime() {
    tasks.sort((a, b) => {
        const time1 = toMinutesNumber(a.time);
        const time2 = toMinutesNumber(b.time);

        if (time1 === null || time2 === null) {
            return 0;
        };

        return time1 - time2;
    }); 
}