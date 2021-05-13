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

    const render = () => {
        htmlString = ``;

        for (task of tasks) {
            htmlString += `
            <li class="list__item">
                <button class="list__button"></button>
                <span class="list__task">${task.content}</span>
                <button class="list__button list__button--remove">&#128465;</button>
            </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };


    const init = () => {
        render();
    };

    init();
};