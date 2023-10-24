{
    const tasks = [
        {
            content: "Odrobić lekcje",
            done: false,
        },
        {
            content: "zjeść kolacje",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li>
                    ${task.content}
                </li>
            `;
        }

        document.querySelector(".js-list").innerHTML = htmlString;
    };

    const init = () => {
        render();
    };

    init();
}