// //////////////////////////////////////////////////
// 1. تصحيح مصفوفة tasks الأولية (لضمان IDs مختلفة)
// //////////////////////////////////////////////////
let tasks = [
    // تم استخدام قيم ثابتة لـ ID لتجنب تكرار Date.now()
    { "id": 1678886400001, "title": "قراءة كتاب js", "date": "15/10/2030", "isBoolean": false },
    { "id": 1678886400002, "title": "انهاء المشروع", "date": "23/1/2025", "isBoolean": false },
    { "id": 1678886400003, "title": "انهاء دورة جافاسكريبت", "date": "1/3/2025", "isBoolean": false }
];

const btnAdd = document.getElementById("button-add");
const oneTask = document.querySelector(".container-tasks");


function fillTasksOnThePage() {
    oneTask.innerHTML = "";
    let index = 0;
    for (const task of tasks) {
        const textTask = `
            <div class="content-tasks" data-task-id="${task.id}">
                <div class="one-task ${task.isBoolean ? 'done' : ''}">
                    <div class="title-task">
                        <h2>${task.title}</h2>
                        <span>${task.date}</span>
                    </div>

                    <div class="buttons-task">
                    ${task.isBoolean?`<button onClick="toggleTask(${index})" class="style-buttons button-done" type="button">
                            <span class="material-symbols-outlined">check_circle</span>
                        </button>`:`<button onClick="toggleTask(${index})" class="style-buttons button-done" type="button">
                            <span class="material-symbols-outlined">cancel</span>
                        </button>`}
                        
                        <button onClick="editTask(${index})" class="style-buttons button-edit" type="button">
                            <span class="material-symbols-outlined">edit_note</span>
                        </button>
                        <button class="style-buttons button-delete" type="button">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        oneTask.innerHTML += textTask;
        index++;
    }

}
fillTasksOnThePage();

btnAdd.addEventListener("click", function () {
    const now = new Date();
    const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const taskName = prompt("أدخل المهمة الجديدة");
    const taskObj =
    {
        "id": Date.now(),
        "title": taskName,
        "date": date,
        "isBoolean": false
    };
    tasks.push(taskObj);
    fillTasksOnThePage();
});
oneTask.addEventListener('click', (event) => {
    const deleteButton = event.target.closest('.button-delete');

    if (deleteButton) {
        const taskElement = deleteButton.closest('.content-tasks');
        const taskIdToDelete = taskElement.dataset.taskId;
        // رسالة التأكيد المحسّنة
        const taskTitle = tasks.find(t => t.id == taskIdToDelete)?.title || "هذه المهمة";
        let isConfirmed = confirm(`هل أنت متأكد من حذف مهمة: ${taskTitle}؟`);
        if (isConfirmed) {
            // 1. تحديث مصفوفة البيانات (الأهم)
            tasks = tasks.filter(task => task.id != taskIdToDelete);
            // 2. تحديث الواجهة (أداء عالٍ: حذف العنصر المحدد فقط)
            taskElement.remove();
        }
    }
});

function editTask(index) {
    let task = tasks[index];
    let newTaskTitle = prompt("ادخل اسم المهمة الجديد", task.title);
    task.title = newTaskTitle;
    fillTasksOnThePage();
}

function toggleTask(index) {
    let task = tasks[index];
    task.isBoolean = !task.isBoolean;
    fillTasksOnThePage();
}