{
    const tasks = [
        {
            content: "zadanie 1",
            done: true,
        },

        {
            content: "zadanie 2",
            done: false,
        }
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push(
            {
                content: newTaskContent,
            }
        );

        render();
    };

    const render = () => {
        htmlString = ``;

        for (task of tasks) {
            htmlString += `
            <li class="list__item">
                <button class="list__button">${task.done ? "&#x2714;" : ""}</button>
                <span class="list__task${task.done ? " list__task--done" : ""}">${task.content}</span>
                <button class="list__button list__button--remove">&#128465;</button>
            </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

            const newTaskContent = document.querySelector(".js-newTask").value.trim();

            if (newTaskContent === "") {
                return;
            };

            addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };


    init();
};