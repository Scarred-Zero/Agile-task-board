import {
    addTaskToDatabase,
    deleteTaskFromDatabase,
    getTasks,
    updateTaskInDatabase,
} from "../database/mockDb.js";
import { validateTaskInput } from "./validation.js";

const VALID_STATUSES = ["todo", "in_progress", "review", "done"];

const createNewTaskObj = ({
    title,
    category,
    priority,
    desc,
    assignee,
    status = "todo",
}) => {
    if (!validateTaskInput(title, category, priority, desc, assignee, status)) {
        return false;
    }

    const newTask = {
        id: crypto.randomUUID(), // Example: "3b1a8f92-5d41-4c12-98bf-123456789abc"
        title: title.trim(),
        category,
        priority,
        desc: desc.trim(),
        assignee: assignee.trim(),
        status,
        point: 0,
    };

    return addTaskToDatabase(newTask) ? newTask : false;
};

const formatTaskSumamry = (taskObj) => {
    const { title, category, priority, assignee } = taskObj;
    return `[${category.toUpperCase()}] ${title} (Priority: ${priority.toUpperCase()}) - Assigned to: ${assignee}`;
};

const getColumnNameByStatus = (statusKey) => {
    switch (statusKey) {
        case "todo":
            return "To Do";
        case "in_progress":
            return "In Progress";
        case "review":
            return "Review";
        case "done":
            return "Done";
        default:
            return "Unknown";
    }
};

const filterTasksByPriority = (tasksArray, targetPriority) =>
    tasksArray.filter((task) => task.priority === targetPriority);

const searchTasksByKeyword = (tasksArray, keyword) => {
    const normalisedKeyword = keyword.toLowerCase();
    return tasksArray.filter((task) =>
        task.title.toLowerCase().includes(normalisedKeyword),
    );
};

const updateTaskStatus = (taskId, newStatus) => VALID_STATUSES.includes(newStatus) && updateTaskInDatabase(taskId, { status: newStatus });

const exportTasksByCategory = (categoryName) => {
    const normalisedCategory = categoryName.toLowerCase();
    const filteredTasks = getTasks().filter(
        (task) => task.category.toLowerCase() === normalisedCategory,
    );
    return JSON.stringify(filteredTasks, null, 2);
};

const getCategoryTaskCounts = (tasksArray) =>
    tasksArray.reduce((counts, task) => {
        const category = task.category.toLowerCase();

        // If it exists, add 1; otherwise, start at 0 and add 1
        counts[category] = (counts[category] || 0) + 1;

        return counts;
    }, {});

const deleteTaskById = (taskId) => deleteTaskFromDatabase(taskId);

// use the .filter() method to extract tasks with a specific status from the tasksArray
const extractedTasksByStatus = (tasksArray, targetStatus) => tasksArray.filter((task) => task.status.toLowerCase() === targetStatus.toLowerCase(),);

const getTaskById = (tasksArray, taskId) => tasksArray.find((task) => task.id === taskId);

const hasUrgentPendingTasks = (tasksArray, targetStatus = "done", priority = "high") => tasksArray.some((task) => task.status !== targetStatus.toLowerCase() && task.priority.toLowerCase() ===  priority.toLowerCase());

const generateSprintSummaryReport = (tasksArray) => {
    return tasksArray.reduce(
        (total, task) => {
            total.totalTasks += 1;

            if (VALID_STATUSES.includes(task.status)) {
                total[task.status] += 1;
            }

            return total;
        },
        {
            totalTasks: 0,
            todo: 0,
            in_progress: 0,
            review: 0,
            done: 0,
        },
    );
};



export {
    createNewTaskObj,
    deleteTaskById,
    exportTasksByCategory,
    extractedTasksByStatus,
    filterTasksByPriority,
    formatTaskSumamry,
    getCategoryTaskCounts,
    getColumnNameByStatus,
    getTaskById,
    hasUrgentPendingTasks,
    searchTasksByKeyword,
    updateTaskStatus,
    generateSprintSummaryReport,
};

