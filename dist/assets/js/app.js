import { getTasks, loadFromStorage } from "./database/mockDb.js";
import {
    initializeTaskBoard,
    initializeUI,
} from "./dom/script.js";
import { createNewTaskObj, refreshDashboard } from "./utils/tasks.js";

function initApp() {
    loadFromStorage();
    const tasks = getTasks();
    const documentRef = document;
    refreshDashboard(tasks, documentRef);
    initializeUI(documentRef);
    initializeTaskBoard(tasks, createNewTaskObj, documentRef);
}

// Execute when DOM tree is fully parsed
document.addEventListener("DOMContentLoaded", initApp);
