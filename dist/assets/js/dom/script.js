import { calculateBoardMetrics } from "../utils/calc.js";

// const BOARD_COLUMNS = [
//     { status: "todo", title: "To Do", elementId: "todo-task-cards" },
//     {
//         status: "in_progress",
//         title: "In Progress",
//         elementId: "inProgress-task-cards",
//     },
//     { status: "review", title: "Review", elementId: "review-task-cards" },
//     { status: "done", title: "Done", elementId: "done-task-cards" },
// ];

function createTaskCardElement(task) {
    const card = document.createElement("article");
    card.className = ".task-card";
    card.dataset.id = task.id;

    const priorityIndicator = document.createElement("div");
    priorityIndicator.className = `priority-indicator ${task.priority.toLowerCase()}`;
    priorityIndicator.textContent = task.priority.toUpperCase();

    const header = document.createElement("h1");
    header.className = "task-card-header";

    const span = document.createElement("span");
    span.className = "category-tag";
    span.textContent = `${task.category.toLowerCase()}`;

    const optionsBtn = document.createElement("button");
    optionsBtn.className = "btn-icon";
    optionsBtn.setAttribute("aria-label", "Task options");
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

    footer.appendChild(assigneeSpan);

    card.appendChild(priorityIndicator);
    card.appendChild(header);
    card.appendChild(titleHeading);
    card.appendChild(taskDesc);
    card.appendChild(footer);

    return card;
}

function renderBoard(tasks, documentRef = document) {
    for (const column of BOARD_COLUMNS) {
        const element = documentRef.getElementById(column.elementId);
        if (!element) {
            throw new Error(`Missing board column: ${column.elementId}`);
        }

        const columnTasks = tasks.filter(
            (task) => task.status === column.status,
        );
        const cards = columnTasks.map(renderTaskCardTemplate).join("");
        element.innerHTML = `
            <header class="column-header"><h2>${column.title}</h2></header>
            ${cards || '<p class="empty-column">No tasks</p>'}
        `;
    }

    const metrics = calculateBoardMetrics(tasks);
    const metricElements = {
        total: "metric-total",
        inProgress: "metric-in-progress",
        highPriority: "metric-high-priority",
        completed: "metric-completed",
    };

    for (const [metric, elementId] of Object.entries(metricElements)) {
        const element = documentRef.getElementById(elementId);
        if (!element) {
            throw new Error(`Missing board metric: ${elementId}`);
        }
        element.textContent = String(metrics[metric]);
    }

    return metrics;
}

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
    const themeToggle = documentRef.getElementById("theme-toggle-btn");
    const activityDrawer = documentRef.getElementById("activity-drawer");
    const modal = documentRef.getElementById("task-modal");
    const board = documentRef.querySelector(".board-columns-container");

    themeInitialiser(documentRef);

    themeToggle?.addEventListener("click", () => {
        const isDark = htmlRoot.getAttribute("data-theme") === "dark";
        if (isDark) {
            htmlRoot.removeAttribute("data-theme");
        } else {
            htmlRoot.setAttribute("data-theme", "dark");
        }
        try {
            localStorage.setItem("theme", isDark ? "light" : "dark");
        } catch (error) {
            console.error("[Theme] Unable to save the selected theme.", error);
        }
    });

    documentRef
        .getElementById("hamburgerMenu")
        ?.addEventListener("click", () => {
            documentRef.getElementById("navbar")?.classList.toggle("show");
        });

    const closeModal = () => {
        if (modal) modal.style.display = "none";
    };
    documentRef
        .getElementById("open-modal-btn")
        ?.addEventListener("click", () => {
            if (modal) modal.style.display = "flex";
        });
    documentRef
        .getElementById("modal-close-btn")
        ?.addEventListener("click", closeModal);
    documentRef
        .getElementById("modal-cancel")
        ?.addEventListener("click", closeModal);
    modal?.addEventListener("click", (event) => {
        if (event.target === modal) closeModal();
    });

    documentRef
        .getElementById("drawer-btn-close")
        ?.addEventListener("click", () => {
            activityDrawer?.classList.remove("is-open");
            activityDrawer?.setAttribute("aria-hidden", "true");
        });

    board?.addEventListener("click", (event) => {
        const card = event.target.closest(".task-card");
        if (!card || !board.contains(card)) return;
        activityDrawer?.classList.add("is-open");
        activityDrawer?.setAttribute("aria-hidden", "false");
    });

    board?.addEventListener("keydown", (event) => {
        if (
            (event.key === "Enter" || event.key === " ") &&
            event.target.matches(".task-card")
        ) {
            event.preventDefault();
            activityDrawer?.classList.add("is-open");
            activityDrawer?.setAttribute("aria-hidden", "false");
        }
    });

    documentRef.addEventListener("click", (event) => {
        if (
            activityDrawer?.classList.contains("is-open") &&
            !activityDrawer.contains(event.target) &&
            !board?.contains(event.target)
        ) {
            activityDrawer.classList.remove("is-open");
            activityDrawer.setAttribute("aria-hidden", "true");
        }
    });
}

function initializeTaskBoard({ getTasks, createTask }, documentRef = document) {
    const board = documentRef.querySelector(".board-columns-container");
    const form = documentRef.getElementById("task-form");
    const errorMessage = documentRef.getElementById("task-form-error");

    renderBoard(getTasks(), documentRef);

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const task = createTask({
                title: formData.get("title"),
                category: formData.get("category"),
                priority: formData.get("priority"),
                desc: formData.get("description"),
                assignee: "Unassigned",
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
            documentRef.getElementById("task-modal").style.display = "none";
            renderBoard(getTasks(), documentRef);
        });
    }

    return board;
}

function renderBoardColumns(tasks) {
    const statuses = ["todo", "in_progress", "review", "done"];

    statuses.forEach((stat) => {
        const columnContainer = document.querySelector(
            `#${stat.toLowerCase()}-task-cards`,
        );

        if (!columnContainer) {
            // NOT Operator
            console.warn(
                `Render warning: Column container for status '${stat}' not found.`,
            );
            return;
        }

        const matchingTasks = tasks.filter((task) => task.status.toLowerCase() === stat.toLowerCase());

        const fragment = document.createDocumentFragment();

        matchingTasks.forEach((task) => {
            const cardElement = createTaskCardElement(task);
            fragment.appendChild(cardElement);
        });

        // Reset container contents safely and append fragment
        columnContainer.replaceChildren(fragment);
    });
}

export {
    createTaskCardElement,
    initializeTaskBoard,
    initializeUI,
    renderBoard,
    themeInitialiser,
};
