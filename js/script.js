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

    const toggleDoneTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const markAllTasksDone = () => {
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
        const removeTaskButtons = document.querySelectorAll(".js-removeTaskButtons");

        removeTaskButtons.forEach((removeTaskButton, buttonIndex) => {
            removeTaskButton.addEventListener("click", () => {
                removeTask(buttonIndex);
            });
        });

        const doneTaskButtons = document.querySelectorAll(".js-doneTaskButtons")

        doneTaskButtons.forEach((doneTaskButton, buttonIndex) => {
            doneTaskButton.addEventListener("click", () => {
                toggleDoneTask(buttonIndex);
            });
        });

        const doneAllTasksButton = document.querySelector(".js-doneAllTasksButton");
        const hideDoneTasksButton = document.querySelector(".js-hideDoneTasksButton");

        if (doneAllTasksButton, hideDoneTasksButton) {

            doneAllTasksButton.addEventListener("click", () => {
                markAllTasksDone();
            });

            hideDoneTasksButton.addEventListener("click", () => {
                toggleHideDoneTasks();
            });
        };
    };

    const renderTasks = () => {
        htmlString = ``;

        for (const task of tasks) {
            htmlString += `
            <li class="list__item js-listItem ${task.done && hideDoneTasks ? "list__item--hidden" : ""}">
                <button class="list__button js-doneTaskButtons">
                    ${task.done ? "&#x2714;" : ""}
                </button>
                <span class="list__task${task.done ? " list__task--done" : ""}">
                    ${task.content}
                </span>
                <button class="list__button list__button--remove js-removeTaskButtons">
                    &#128465;
                </button>
            </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        if (tasks.length > 0) {
            htmlString = ``;

            htmlString += `
            <button class="section__button js-hideDoneTasksButton">
                ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
            </button>
            <button class="section__button js-doneAllTasksButton"${tasks.every((task => task.done)) ? " disabled" : ""}>
                Ukończ wszystkie
            </button>
        `;

        } else {
            htmlString = ``;
        };
        document.querySelector(".js-buttons").innerHTML = htmlString;
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