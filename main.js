// //////////////////////////////////////////////////
// 1. تعريف المتغيرات والمصفوفة (استخدام 'let' لتمكين التحديث)
// //////////////////////////////////////////////////
const btnAdd = document.getElementById("button-add");
const oneTask = document.querySelector(".container-tasks");
let tasks = [
    // IDs ثابتة مختلفة للمهام الأولية (للتشغيل الأول فقط)
    { "id": 1678886400001, "title": "قراءة كتاب js", "date": "15/10/2030", "isBoolean": false },
    { "id": 1678886400002, "title": "انهاء المشروع", "date": "23/1/2025", "isBoolean": false },
    { "id": 1678886400003, "title": "انهاء دورة جافاسكريبت", "date": "1/3/2025", "isBoolean": false }
];

// //////////////////////////////////////////////////
// 2. دوال التخزين والاسترجاع (LocalStorage)
// //////////////////////////////////////////////////

function storageTasks() {
    // يحفظ المصفوفة الحالية كـ JSON
    let taskString = JSON.stringify(tasks);
    localStorage.setItem("tasks", taskString);
}

function getTasksFromStorage() {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
        try {
            const parsedTasks = JSON.parse(storedTasks);

            if (Array.isArray(parsedTasks)) {
                // تحديث مصفوفة 'tasks' بالبيانات المخزنة
                tasks = parsedTasks.map(task => ({
                    ...task,
                    // ضمان أن الـ ID رقم للمقارنة
                    id: Number(task.id)
                }));
            }
        } catch (e) {
            console.error("خطأ في تحليل المهام المخزّنة:", e);
        }
    }
}

// //////////////////////////////////////////////////
// 3. دالة إنشاء وعرض المهام (Renderer)
// //////////////////////////////////////////////////

function fillTasksOnThePage() {
    oneTask.innerHTML = "";
    for (const task of tasks) {
        // تم تصحيح بناء data-task-id وإزالة الـ IDs المكررة
        const textTask = `
            <div class="content-tasks" data-task-id="${task.id}">
                <div class="one-task ${task.isBoolean ? 'done' : ''}">
                    <div class="title-task">
                        <h2>${task.title}</h2>
                        <span>${task.date}</span>
                    </div>

                    <div class="buttons-task">
                        ${task.isBoolean ?
                `<button class="style-buttons button-done" data-action="toggle" type="button">
                                <span class="material-symbols-outlined">check_circle</span>
                            </button>` :
                `<button class="style-buttons button-done" data-action="toggle" type="button">
                                <span class="material-symbols-outlined">cancel</span>
                            </button>`}
                        
                        <button class="style-buttons button-edit" data-action="edit" type="button">
                            <span class="material-symbols-outlined">edit_note</span>
                        </button>
                        <button class="style-buttons button-delete" data-action="delete" type="button">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        oneTask.innerHTML += textTask;
    }
}

// //////////////////////////////////////////////////
// 4. منطق الإضافة (Add)
// //////////////////////////////////////////////////

btnAdd.addEventListener("click", function () {
    const now = new Date();
    const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const taskName = prompt("أدخل المهمة الجديدة");

    if (!taskName || taskName.trim() === "") return;

    const taskObj = {
        "id": Number(Date.now()), // ID فريد ومضمون أن يكون رقماً
        "title": taskName.trim(),
        "date": date,
        "isBoolean": false
    };

    tasks.push(taskObj);
    storageTasks();
    fillTasksOnThePage();
});

// //////////////////////////////////////////////////
// 5. دوال التحكم (Edit & Toggle) - تستخدم ID الآن
// //////////////////////////////////////////////////

function editTask(id, taskElement) {
    let task = tasks.find(t => t.id === Number(id));

    if (task) {
        let newTaskTitle = prompt("ادخل اسم المهمة الجديد", task.title);

        if (newTaskTitle !== null && newTaskTitle.trim() !== "") {
            task.title = newTaskTitle.trim();
            storageTasks();
            // تحديث العنصر المحدد فقط بدلاً من إعادة عرض القائمة بالكامل (أداء أفضل)
            // نجد عنوان المهمة ونقوم بتحديثه
            const titleElement = taskElement.querySelector('.title-task h2');
            if (titleElement) {
                titleElement.textContent = task.title;
            }
        }
    }
}

function toggleTask(id) {
    let task = tasks.find(t => t.id === Number(id));

    if (task) {
        task.isBoolean = !task.isBoolean;
        storageTasks();
        // هنا يجب إعادة عرض القائمة بالكامل لتحديث أيقونة زر الإنجاز والتنسيق
        fillTasksOnThePage();
    }
}

// //////////////////////////////////////////////////
// 6. مُستمع الحدث الموحد (Event Delegation)
// //////////////////////////////////////////////////

oneTask.addEventListener('click', (event) => {
    // تحديد الزر الذي تم النقر عليه
    const controlButton = event.target.closest('.button-done, .button-edit, .button-delete');

    if (controlButton) {
        const taskElement = controlButton.closest('.content-tasks');
        const taskId = taskElement.dataset.taskId;

        if (controlButton.classList.contains('button-delete')) {
            // منطق الحذف
            const taskTitle = tasks.find(t => t.id === Number(taskId))?.title || "هذه المهمة";
            let isConfirmed = confirm(`هل أنت متأكد من حذف مهمة: ${taskTitle}؟`);

            if (isConfirmed) {
                tasks = tasks.filter(task => task.id !== Number(taskId));
                taskElement.remove(); // حذف العنصر مباشرة من DOM
                storageTasks();
            }
        } else if (controlButton.classList.contains('button-edit')) {
            // استدعاء دالة التعديل
            editTask(taskId, taskElement);
        } else if (controlButton.classList.contains('button-done')) {
            // استدعاء دالة التبديل
            toggleTask(taskId);
        }
    }
});


// //////////////////////////////////////////////////
// 7. تسلسل بدء تشغيل التطبيق (الترتيب الصحيح)
// //////////////////////////////////////////////////

// 1. استرداد المهام المخزنة (إذا وجدت، سيتم تحديث مصفوفة 'tasks')
getTasksFromStorage();

// 2. عرض المهام الموجودة (سواء كانت مخزنة أو أولية)
fillTasksOnThePage();