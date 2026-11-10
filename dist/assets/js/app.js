import { getTasks } from "./database/mockDb.js";
import { calculateBoardMetrics } from "./utils/calc.js";
import {
    initializeTaskBoard,
    initializeUI,
    renderBoardColumns,
    renderDashboardMetrics,
} from "./dom/script.js";
import { createNewTaskObj } from "./utils/tasks.js";


function initApp() {
    const tasks = getTasks();
    const metrics = calculateBoardMetrics(tasks);

    const createNewTask = createNewTaskObj(tasks)

    renderBoardColumns(tasks);
    renderDashboardMetrics(metrics);
    initializeUI()
    initializeTaskBoard(tasks, createNewTask)
}

// Execute when DOM tree is fully parsed
document.addEventListener('DOMContentLoaded', initApp);