import {
    deleteTaskFromDatabase,
    getTasks,
    syncToStorage,
} from "../database/mockDb.js";
import { calculateBoardMetrics } from "../utils/calc.js";

function themeInitialiser(documentRef = document) {
    const root = documentRef.documentElement;
    try {
        if (localStorage.getItem("theme") === "dark") {
            root.setAttribute("data-theme", "dark");
        }
    } catch (error) {
        console.error("[Theme] Unable to restore the saved theme.", error);
    }
}

function initializeUI(documentRef = document) {
    const htmlRoot = documentRef.documentElement;
    const themeToggle = documentRef.querySelector("#theme-toggle-btn");
    const activityDrawer = documentRef.querySelector("#activity-drawer");
    const modal = documentRef.querySelector("#task-modal");
    const board = documentRef.querySelector(".board-columns-container");

    themeInitialiser(documentRef);

    themeToggle?.addEventListener("click", () => {
        // 1. Determine the new theme state
        const isDark = htmlRoot.getAttribute("data-theme") === "dark";
        const nextTheme = isDark ? "light" : "dark";

        // 2. Update the DOM attribute
        if (nextTheme === "dark") {
            htmlRoot.setAttribute("data-theme", "dark");
        } else {
            htmlRoot.removeAttribute("data-theme");
        }

        // 3. Persist the change
        try {
            localStorage.setItem("theme", nextTheme);
        } catch (error) {
            console.error("[Theme] Unable to save the selected theme.", error);
        }
    });

    documentRef
        .querySelector("#hamburgerMenu")
        ?.addEventListener("click", () => {
            documentRef.querySelector("#navbar")?.classList.toggle("show");
        });

    const closeModal = () => {
        if (modal) modal.style.display = "none";
    };

    documentRef
        .querySelector("#open-modal-btn")
        ?.addEventListener("click", () => {
            if (modal) modal.style.display = "flex";
        });

    documentRef
        .querySelector("#modal-close-btn")
        ?.addEventListener("click", closeModal);

    documentRef
        .querySelector("#modal-cancel")
        ?.addEventListener("click", closeModal);

    modal?.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    board?.addEventListener("click", (event) => {
        // 1. Check action buttons first (most specific first)
        const deleteBtn = event.target.closest(".delete-task-btn");
        const optionBtn = event.target.closest(".btn-icon");
        const activeBtn = deleteBtn || optionBtn;

        if (activeBtn && board.contains(activeBtn)) {
            const card = activeBtn.closest(".task-card");
            const taskId = card ? card.dataset.id : null;

            if (deleteBtn) {
                if (!deleteTaskFromDatabase(taskId)) {
                    console.error(
                        `[Delete Task] Unable to delete task with ID: ${taskId}`,
                    );
                    return;
                }

                const tasks = getTasks();
                renderBoardColumns(tasks, documentRef);
                renderDashboardMetrics(
                    calculateBoardMetrics(tasks),
                    documentRef,
                );
                console.log(
                    `[Delete Task] Action triggered for Task ID: ${taskId}`,
                );
                return; // Exits the function so the drawer doesn't open
            }

            if (optionBtn) {
                console.log(
                    `[Task Options] Action triggered for Task ID: ${taskId}`,
                );
                // Your options menu logic here
                return; // Exits the function so the drawer doesn't open
            }
        }

        // 2. Fallback: If neither button was clicked, check if a task card was clicked
        const card = event.target.closest(".task-card");
        if (!card || !board.contains(card)) return;

        activityDrawer?.classList.add("is-open");
        activityDrawer?.setAttribute("aria-hidden", "false");
    });

    documentRef
        .querySelector("#drawer-btn-close")
        ?.addEventListener("click", () => {
            activityDrawer?.classList.remove("is-open");
            activityDrawer?.setAttribute("aria-hidden", "true");
        });
}

function initializeTaskBoard(tasks, createTask, documentRef = document) {
    const board = documentRef.querySelector(".board-columns-container");
    const form = documentRef.querySelector("#task-form");
    const errorMessage = documentRef.querySelector("#task-form-error");

    renderBoardColumns(tasks, documentRef);

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const task = createTask({
                title: formData.get("title"),
                category: formData.get("category"),
                priority: formData.get("priority"),
                desc: formData.get("description"),
                assignee: formData.get("assignee") || "Unassigned",
                status: "todo",
            });

            if (!task) {
                if (errorMessage) {
                    errorMessage.textContent =
                        "Please enter valid task details.";
                }
                return;
            }

            if (errorMessage) errorMessage.textContent = "";
            form.reset();
            documentRef.querySelector(".task-modal").style.display = "none";
            const updatedTasks = getTasks();
            renderBoardColumns(updatedTasks, documentRef);
            renderDashboardMetrics(
                calculateBoardMetrics(updatedTasks),
                documentRef,
            );
        });
    }

    return board;
}

function createTaskCardElement(task) {
    const card = document.createElement("article");
    card.className = "task-card";
    card.dataset.id = task.id;

    const priorityIndicator = document.createElement("div");
    priorityIndicator.className = `priority-indicator ${task.priority.toLowerCase()}`;
    priorityIndicator.textContent = task.priority.toUpperCase();

    const header = document.createElement("header");
    header.className = "task-card-header";

    const span = document.createElement("span");
    span.className = "category-tag";
    span.textContent = `${task.category.toLowerCase()}`;

    const optionsBtn = document.createElement("button");
    optionsBtn.className = "btn-icon";
    optionsBtn.setAttribute("aria-label", "Task options");
    optionsBtn.setAttribute("type", "button");
    optionsBtn.textContent = "⋮";

    header.appendChild(span);
    header.appendChild(optionsBtn);

    const titleHeading = document.createElement("h3");
    titleHeading.className = "task-title";
    titleHeading.textContent = task.title;

    const taskDesc = document.createElement("p");
    taskDesc.className = "task-desc";
    taskDesc.textContent = task.desc;

    const footer = document.createElement("footer");
    footer.className = "task-card-footer";

    const assigneeSpan = document.createElement("span");
    assigneeSpan.className = "task-assignee";
    assigneeSpan.textContent = `Assignee: ${task.assignee ? task.assignee : "Unassigned"}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-task-btn btn-small";
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "bx bx-trash";
    deleteBtn.setAttribute("type", "button");
    deleteBtn.appendChild(deleteIcon);

    footer.appendChild(assigneeSpan);
    footer.appendChild(deleteBtn);

    card.appendChild(priorityIndicator);
    card.appendChild(header);
    card.appendChild(titleHeading);
    card.appendChild(taskDesc);
    card.appendChild(footer);

    return card;
}

function renderBoardColumns(tasks, documentRef = document) {
    const statuses = ["todo", "in_progress", "review", "done"];

    statuses.forEach((stat) => {
        const columnContainer = documentRef.querySelector(
            `#${stat.toLowerCase()}-task-cards`,
        );

        if (!columnContainer) {
            // NOT Operator
            console.warn(
                `Render warning: Column container for status '${stat}' not found.`,
            );
            return;
        }

        const columnTitleCont = documentRef.createElement("header");
        columnTitleCont.className = "column-header";

        const columnTitle = documentRef.createElement("h2");
        columnTitle.className = "column-title";
        columnTitle.textContent = stat.replace("_", " ").toUpperCase();

        columnTitleCont.appendChild(columnTitle);

        const matchingTasks = tasks.filter(
            (task) => task.status.toLowerCase() === stat.toLowerCase(),
        );

        const fragment = documentRef.createDocumentFragment();

        if (matchingTasks.length === 0) {
            const emptyColumn = documentRef.createElement("div");
            emptyColumn.className = "empty-column-message";
            emptyColumn.textContent = "No tasks in this column.🥲";
            fragment.appendChild(emptyColumn);
        } else {
            matchingTasks.forEach((task) => {
                const cardElement = createTaskCardElement(task);
                fragment.appendChild(cardElement);
            });
        }

        // Reset container contents safely and append fragment
        columnContainer.replaceChildren(columnTitleCont, fragment);
    });
}

function renderDashboardMetrics(metrics, documentRef = document) {
    const totalElem = documentRef.querySelector("#metric-total");
    const todoElem = documentRef.querySelector("#metric-in-todo");
    const highPriorityElem = documentRef.querySelector("#metric-high-priority");
    const inProgressElem = documentRef.querySelector("#metric-in-progress");
    const reviewElem = documentRef.querySelector("#metric-review");
    const doneElem = documentRef.querySelector("#metric-done");

    if (totalElem) totalElem.textContent = metrics.total;
    if (todoElem) todoElem.textContent = metrics.todo;
    if (highPriorityElem) highPriorityElem.textContent = metrics.highPriority;
    if (inProgressElem) inProgressElem.textContent = metrics.inProgress;
    if (reviewElem) reviewElem.textContent = metrics.review;
    if (doneElem) doneElem.textContent = metrics.done;
}

function highlightOverdueTasks(overdueTaskIds) {
    const cardElems = document.querySelectorAll(".task-card");
    cardElems.forEach((cardElem) => {
        const taskId = cardElem.dataset.taskId;
        if (overdueTaskIds.includes(taskId)) {
            cardElem.classList.add("overdue");
        } else {
            cardElem.classList.remove("overdue");
        }
    });
}

export {
    initializeTaskBoard,
    initializeUI,
    themeInitialiser,
    createTaskCardElement,
    renderBoardColumns,
    renderDashboardMetrics,
    highlightOverdueTasks,
};
