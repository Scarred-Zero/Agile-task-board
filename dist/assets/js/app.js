import { getTasks, loadFromStorage } from "./database/mockDb.js";
import { calculateBoardMetrics } from "./utils/calc.js";
import {
    initializeTaskBoard,
    initializeUI,
    renderBoardColumns,
    renderDashboardMetrics,
} from "./dom/script.js";
import { createNewTaskObj } from "./utils/tasks.js";

function initApp() {
    loadFromStorage();
    const tasks = getTasks();
    const metrics = calculateBoardMetrics(tasks);

    renderBoardColumns(tasks);
    renderDashboardMetrics(metrics);
    initializeUI();
    initializeTaskBoard(tasks, createNewTaskObj);
}

// Execute when DOM tree is fully parsed
document.addEventListener("DOMContentLoaded", initApp);
