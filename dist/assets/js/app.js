import { getTasks, loadFromStorage } from "./database/mockDb.js";
import { calculateBoardMetrics } from "./utils/calc.js";
import {
    initializeTaskBoard,
    initializeUI,
    renderBoardColumns,
    renderDashboardMetrics,
} from "./dom/script.js";
import { createNewTaskObj } from "./utils/tasks.js";

// function startApp() {
//     loadFromStorage();
//     initializeUI();
//     initializeTaskBoard({
//         getTasks,
//         createTask: ({ title, category, priority, desc, assignee, status }) =>
//             createNewTaskObj(title, category, priority, desc, assignee, status),
//     });
// }

// if (typeof document !== "undefined") {
//     if (document.readyState === "loading") {
//         document.addEventListener("DOMContentLoaded", startApp, { once: true });
//     } else {
//         startApp();
//     }
// }

function initApp() {
    const tasks = getTasks();
    const metrics = calculateBoardMetrics(tasks);

    renderBoardColumns(tasks);
    renderDashboardMetrics(metrics);
}

// Execute when DOM tree is fully parsed
document.addEventListener('DOMContentLoaded', initApp);