import { calculateBoardMetrics } from "../utils/calc.js";

const BOARD_COLUMNS = [
    { status: "todo", title: "To Do", elementId: "todo-task-cards" },
    {
        status: "in_progress",
        title: "In Progress",
        elementId: "inProgress-task-cards",
    },
    { status: "review", title: "Review", elementId: "review-task-cards" },
    { status: "done", title: "Done", elementId: "done-task-cards" },
];

const escapeHtml = (value) =>
    String(value).replace(/[&<>"']/g, (character) => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        };
        return entities[character];
    });

const renderTaskCardTemplate = (task) => `
    <article
        class="task-card"
        id="task-card-${escapeHtml(task.id)}"
        data-id="${escapeHtml(task.id)}"
        tabindex="0"
        role="button"
        aria-label="Open activity for ${escapeHtml(task.title)}"
    >
        <div class="priority-indicator ${escapeHtml(task.priority)}">${escapeHtml(task.priority)}</div>
        <header class="task-card-header">
            <span class="category-tag">${escapeHtml(task.category)}</span>
        </header>
        <h3 class="task-title">${escapeHtml(task.title)}</h3>
        <p class="task-list">${escapeHtml(task.desc)}</p>
        <footer class="task-card-footer">
            <span class="task-assignee"><strong>Assignee: </strong>${escapeHtml(task.assignee)}</span>
            <span class="task-point"><strong>Points: </strong>${escapeHtml(task.point ?? 0)}</span>
        </footer>
    </article>
`;

function renderBoard(tasks, documentRef = document) {
    for (const column of BOARD_COLUMNS) {
        const element = documentRef.getElementById(column.elementId);
        if (!element) {
            throw new Error(`Missing board column: ${column.elementId}`);
        }

        const columnTasks = tasks.filter((task) => task.status === column.status);
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

    documentRef.getElementById("hamburgerMenu")?.addEventListener("click", () => {
        documentRef.getElementById("navbar")?.classList.toggle("show");
    });

    const closeModal = () => {
        if (modal) modal.style.display = "none";
    };
    documentRef.getElementById("open-modal-btn")?.addEventListener("click", () => {
        if (modal) modal.style.display = "flex";
    });
    documentRef.getElementById("modal-close-btn")?.addEventListener("click", closeModal);
    documentRef.getElementById("modal-cancel")?.addEventListener("click", closeModal);
    modal?.addEventListener("click", (event) => {
        if (event.target === modal) closeModal();
    });

    documentRef.getElementById("drawer-btn-close")?.addEventListener("click", () => {
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
                    errorMessage.textContent = "Please enter valid task details.";
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

export {
    BOARD_COLUMNS,
    initializeTaskBoard,
    initializeUI,
    renderBoard,
    renderTaskCardTemplate,
    themeInitialiser,
};
