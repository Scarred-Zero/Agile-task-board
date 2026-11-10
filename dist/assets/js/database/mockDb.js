const STORAGE_KEY = "kanban_tasks_backup";
const VALID_STATUSES = ["todo", "in_progress", "review", "done"];
const VALID_CATEGORIES = ["frontend", "backend", "database", "devops"];
const VALID_PRIORITIES = ["low", "medium", "high"];

let tasks = [
    {
        id: 201,
        title: "Design ERD Schema",
        category: "database",
        priority: "high",
        desc: "This is a Mock Description for this task",
        assignee: "Xero Bot",
        status: "todo",
        point: 5,
    },
    {
        id: 202,
        title: "Configure FastAPI Router",
        category: "backend",
        priority: "medium",
        desc: "This is a Mock Description for this task",
        assignee: "Xero Bot",
        status: "in_progress",
        point: 3,
    },
    {
        id: 203,
        title: "Configure FastAPI Router",
        category: "backend",
        priority: "medium",
        desc: "This is a Mock Description for this task",
        assignee: "Xero Bot",
        status: "in_progress",
        point: 3,
    },
    {
        id: 204,
        title: "Build Flexbox Navbar",
        category: "frontend",
        priority: "low",
        desc: "This is a Mock Description for this task",
        assignee: "Marcus Brit",
        status: "done",
        point: 2,
    },
    {
        id: 205,
        title: "Setup Netlify CI/CD",
        category: "devops",
        priority: "high",
        desc: "This is a Mock Description for this task",
        assignee: "Xero Bot",
        status: "done",
        point: 5,
    },
    {
        id: 206,
        title: "Write Pydantic Schemas",
        category: "backend",
        priority: "high",
        desc: "This is a Mock Description for this task",
        assignee: "Xero Bot",
        status: "todo",
        point: 5,
    },
    {
        id: 207,
        title: "Zoe's Brain Reconfiguration",
        category: "backend",
        priority: "high",
        desc: "Reconfigure, Implement and deploy Zoe2.4 to Zoe2.6",
        assignee: "Xero Bot",
        status: "todo",
        point: 8,
    },
    // {
    //     id: 208,
    //     title: "Add New Feature to Zoe2.6",
    //     category: "backend",
    //     priority: "high",
    //     desc: "Implement a new feature to Zoe2.6 that allows it to learn from user interactions and adapt its responses accordingly.",
    //     assignee: "Xero Bot",
    //     status: "review",
    //     point: 10,
    // },
];

const isValidTask = (task) => {
    return (
        task !== null &&
        typeof task === "object" &&
        typeof task.id === "string" &&
        typeof task.title === "string" &&
        VALID_CATEGORIES.includes(task.category) &&
        VALID_PRIORITIES.includes(task.priority) &&
        typeof task.desc === "string" &&
        typeof task.assignee === "string" &&
        VALID_STATUSES.includes(task.status) &&
        Number.isFinite(task.point)
    );
};

function getTasks() {
    return tasks.map((task) => ({ ...task }));
}

function syncToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error("[Storage] Unable to save task board state.", error);
    }
}

function loadFromStorage() {
    // 1. Get the raw text from the browser's storage
    let rawData = localStorage.getItem(STORAGE_KEY);

    // 2. If nothing was saved yet, just exit and return the default tasks
    if (rawData === null) {
        return getTasks();
    }

    try {
        // 3. Convert the text back into a usable JavaScript list/array
        let savedTasks = JSON.parse(rawData);

        // 4. Clear out the old tasks list and copy everything from storage into it
        tasks = [];
        for (let currentTask of savedTasks) {
            let taskCopy = Object.assign({}, currentTask);
            tasks.push(taskCopy);
        }

        // 5. Return the newly loaded tasks
        return getTasks();
    } catch (error) {
        // If the saved data was broken or corrupted, log an error and give defaults
        console.error("[Storage] Could not load tasks.", error);
        return getTasks();
    }
}

function addTaskToDatabase(task) {
    // 1. Check if the task isn't valid and if ANY existing task has the same ID, then stop right here
    if (
        !isValidTask(task) ||
        tasks.some((existing) => existing.id === task.id)
    ) {
        return false;
    }

    // 2. Make a fresh copy of the task and add it to our list
    let taskCopy = Object.assign({}, task);
    tasks.push(taskCopy);

    // 3. Save to storage
    syncToStorage();
    return true;
}

function updateTaskInDatabase(taskId, changes) {
    // 1. Find the specific task that matches the ID
    const task = tasks.find((currentTask) => currentTask.id === taskId);

    // 2. If no task was found, stop right here
    if (!task) {
        return false;
    }

    // 3. Blend the existing task and changes together to test if it's still valid
    let updatedTest = Object.assign({}, task, changes);
    if (!isValidTask(updatedTest)) {
        return false;
    }

    // 4. If valid, officially apply the changes to the real task object
    Object.assign(task, changes);

    // 5. Save to storage
    syncToStorage();
    return true;
}

function deleteTaskFromDatabase(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
        return false;
    }

    tasks.splice(taskIndex, 1);
    syncToStorage();
    return true;
}

export {
    addTaskToDatabase,
    deleteTaskFromDatabase,
    getTasks,
    loadFromStorage,
    syncToStorage,
    updateTaskInDatabase,
};
