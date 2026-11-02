import { syncToStorage, taskBoardDatabase } from "../mockDb.js";
import { validateTaskInput } from "./validation.js";

function createNewTaskObj(title, category, priority, desc, assignee, status) {
    const generateID = Date.now();

    // FIX: Aligned arguments to match the parameter definition of validateTaskInput below
    const validationCheck = validateTaskInput(
        title,
        category,
        priority,
        desc,
        assignee,
        status,
    );

    if (!validationCheck) {
        console.error("❌ Task creation halted due to validation failure.");
        return;
    }

    console.log(
        "%c✓ Task Validation Passed Successfully!",
        "color: #10b981; font-weight: bold;",
    );

    const newTask = {
        id: generateID,
        title: title,
        category: category,
        priority: priority,
        desc: desc,
        assignee: assignee,
        status: status,
    };

    taskBoardDatabase.push(newTask);
    syncToStorage();
    return newTask;
}

function formatTaskSumamry(taskObj) {
    const { title, category, priority, assignee } = taskObj;

    const formattedCategory = category.toUpperCase();
    const formattedPriority = priority.toUpperCase();

    // console.log(
    //     `[${formattedCategory}] ${title} (Priority: ${formattedPriority}) - Assigned to: ${assignee}`,
    // );
    return `[${formattedCategory}] ${title} (Priority: ${formattedPriority}) - Assigned to: ${assignee}`;
}

function getColumnNameByStatus(statusKey) {
    switch (statusKey) {
        case "todo":
            return "To Do";
        case "in_progress":
            return "In Progress";
        case "review":
            return "Review";
        default:
            return "Backlog";
    }
}

const filterTasksByPriority = (tasksArray, targetPriority) => {
    const filteredResults = [];

    for (const task of tasksArray) {
        if (task.priority === targetPriority) {
            filteredResults.push(task);
        }
    }
    return filteredResults;
};

const searchTasksByKeyword = (taskArray, keyword) => {
    const results = [];

    const normalisedKeyword = keyword;

    for (const task of taskArray) {
        const normalisedTitle = task.title.toLowerCase();

        if (normalisedTitle.includes(normalisedKeyword)) {
            results.push(task);
        }
    }

    return results;
};

const updateTaskStatus = (taskId, newStatus) => {
    const taskIndex = taskBoardDatabase.findIndex((task) => task.id === taskId)
    if (taskIndex !== -1) {
        // If found, update its status property to newStatus
        taskBoardDatabase[taskIndex].status = newStatus;
        // Call this.syncToStorage(). 
        syncToStorage();
        return true;
    }
};


const exportTasksByCategory = (categoryName) => {
    const normalisedCategory = categoryName.toLowerCase();
    // The function must filter all tasks matching the specified category
    const filteredTasks = taskBoardDatabase.filter(task => task.category.toLowerCase() === normalisedCategory);
    // and return a pretty-printed JSON string (using `JSON.stringify(filteredArray, null, 2)`).
    const jsonString = JSON.stringify(filteredTasks, null, 2);
    return jsonString;
}

const getCategoryTaskCounts = (tasksArray) => {
    const frontendCategory = [];
    const backendCategory = [];
    const databaseCategory = [];
    const devopsCategory = [];

    for (const task of tasksArray) {
        const normalisedCategory = task.category.toLowerCase();
        switch (normalisedCategory) {
            case "frontend":
                frontendCategory.push(task);
                break;
            case "backend":
                backendCategory.push(task);
                break;
            case "database":
                databaseCategory.push(task);
                break;
            case "devops":
                devopsCategory.push(task);
                break;
            default:
                console.log(
                    "The category " +
                        `'${normalisedCategory}'` +
                        " does not match any category.",
                );
                break;
        }
    }

    const categoryObj = {
        frontend: frontendCategory.length,
        backend: backendCategory.length,
        database: databaseCategory.length,
        devops: devopsCategory.length,
    };
    return categoryObj;
};

function deleteTaskById(taskId) {
    const index = taskBoardDatabase.findIndex((task) => task.id === taskId);
    if (index !== -1) {
        const removedTask = taskBoardDatabase.splice(index, 1)[0];
        console.log(
            `%c[Deleted] Task removed: "${removedTask.title}"`,
            "color: #ef4444; font-weight: bold;",
        );
        syncToStorage();
        return true;
    }

    console.warn(`[Warning] Task ID ${taskId} not found for deletion.`);
    return false;
}

export {
    searchTasksByKeyword,
    createNewTaskObj,
    formatTaskSumamry,
    getColumnNameByStatus,
    filterTasksByPriority,
    updateTaskStatus,
    exportTasksByCategory,
    getCategoryTaskCounts,
    deleteTaskById
};
