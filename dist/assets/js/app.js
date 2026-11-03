import { getTasks, loadFromStorage } from "./database/mockDb.js";
import {
    initializeTaskBoard,
    initializeUI,
} from "./dom/script.js";
import { createNewTaskObj } from "./utils/tasks.js";

function startApp() {
    loadFromStorage();
    initializeUI();
    initializeTaskBoard({
        getTasks,
        createTask: ({ title, category, priority, desc, assignee, status }) =>
            createNewTaskObj(
                title,
                category,
                priority,
                desc,
                assignee,
                status,
            ),
    });
}

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startApp, { once: true });
    } else {
        startApp();
    }
}
