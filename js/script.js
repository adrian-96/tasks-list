{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false },
        ];

        render();
    };

    const resetNewTask = (newTask) => {
        newTask.value = "";
        newTask.focus();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const assignAllTaskDone = () => {
        tasks = tasks.map(tasks => ({
            ...tasks,
            done: true,
        }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindEvents = () => {
        const removeTaskButtons = document.querySelectorAll(".js-removeTaskButton");

        removeTaskButtons.forEach((removeTaskButton, buttonIndex) => {
            removeTaskButton.addEventListener("click", () => {
                removeTask(buttonIndex);
            });
        });

        const doneTaskButtons = document.querySelectorAll(".js-doneTaskButton")

        doneTaskButtons.forEach((doneTaskButton, buttonIndex) => {
            doneTaskButton.addEventListener("click", () => {
                toggleTaskDone(buttonIndex);
            });
        });

        const doneAllTasksButton = document.querySelector(".js-doneAllTasksButton");

        doneAllTasksButton.addEventListener("click", () => {
            assignAllTaskDone();
        });

        const hideDoneTasksButton = document.querySelector(".js-hideDoneTasksButton");
        hideDoneTasksButton.addEventListener("click", () => {
            toggleHideDoneTasks();
            render();
        });
    };


    const renderTasks = () => {
        htmlString = ``;

        for (const task of tasks) {
            htmlString += `
            <li class="list__item js-listItem ${task.done && hideDoneTasks ? "list__item--hidden" : ""}">
                <button class="list__button js-doneTaskButton">${task.done ? "&#x2714;" : ""}</button>
                <span class="list__task${task.done ? " list__task--done" : ""}">${task.content}</span>
                <button class="list__button list__button--remove js-removeTaskButton">&#128465;</button>
            </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask")
        const newTaskContent = newTask.value.trim();

        if (newTaskContent === "") {
            resetNewTask(newTask);
            return;
        };

        addNewTask(newTaskContent);
        resetNewTask(newTask);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };


    init();
};