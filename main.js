// 
const oneTask = document.getElementsByClassName(".container-tasks");
const contentOneTask =
    `
                <div class="content-tasks">
                    <div class="one-task">
                        <div class="title-task">
                            <h2>${tasks.title}/h2>
                            <span>${tasks.date}/span>
                        </div>

                        <div class="buttons-task">
                            <button id="button-done" class="style-buttons button-done" type="button">
                                <span class="material-symbols-outlined">
                                    check_circle
                                </span>
                            </button>
                            <button id="button-edit" class="style-buttons button-edit" type="button">
                                <span class="material-symbols-outlined">
                                    edit_note
                                </span>
                            </button>
                            <button id="button-delete" class="style-buttons button-delete" type="button">
                                <span class="material-symbols-outlined">
                                    delete
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
`;
const tasks = [
    {
        "title": "قراءة كتاب js",
        "date": "15/10/2030",
        "isBoolean": "false"
    },
    {
        "title": "انهاء المشروع",
        "date": "23/1/2025",
        "isBoolean": "false"
    },
    {
        "title": "انهاء دورة جافاسكريبت",
        "date": "1/3/2025",
        "isBoolean": "false"
    }
];

for (task of tasks) {
    oneTask.
}

