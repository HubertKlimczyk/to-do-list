{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent }
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1)
        ];
        render();
    };

    const hideShowDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const allDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                <li class="list__task js-task ${task.done && hideDoneTasks ? "list__task--hidden" : ""}">                                  
                    <button class="list__button list__button--done js-done">${task.done ? "✔" : ""}</button>                   
                    <span class="list__content ${task.done ? "list__content--done" : ""}">${task.content}</span>                   
                    <button class="list__button list__button--remove js-remove">🗑</button>                  
                </li>
            `;
        }

        document.querySelector(".js-list").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-newButtons");
        if (tasks.length > 0) {
            buttonsElement.innerHTML = `
            <button class="list__otherButtons js-toggleDoneTasks">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="list__otherButtons list__markAllDoneButton js-markAllDone"
                ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button>`;
        } else {
            buttonsElement.innerHTML = ``;
        }
    };

    const bindButtonEvents = () => {
        const toggleDoneTasks = document.querySelector(".js-toggleDoneTasks");
        if (toggleDoneTasks) {
            toggleDoneTasks.addEventListener("click", hideShowDoneTasks);
        }

        const markAllDone = document.querySelector(".js-markAllDone");
        if (markAllDone) {
            markAllDone.addEventListener("click", allDone);
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}