import assert from "node:assert/strict";
import test from "node:test";

import { getTasks, loadFromStorage } from "../dist/assets/js/database/mockDb.js";
import {
    BOARD_COLUMNS,
    renderBoard,
    renderTaskCardTemplate,
} from "../dist/assets/js/dom/script.js";
import { calculateBoardMetrics } from "../dist/assets/js/utils/calc.js";

const fixtureTasks = [
    {
        id: 1,
        title: "Todo task",
        category: "frontend",
        priority: "high",
        desc: "To do",
        assignee: "A Person",
        status: "todo",
        point: 2,
    },
    {
        id: 2,
        title: "Active task",
        category: "backend",
        priority: "medium",
        desc: "In progress",
        assignee: "B Person",
        status: "in_progress",
        point: 3,
    },
    {
        id: 3,
        title: "Review task",
        category: "database",
        priority: "high",
        desc: "Needs review",
        assignee: "C Person",
        status: "review",
        point: 1,
    },
    {
        id: 4,
        title: "Complete task",
        category: "devops",
        priority: "low",
        desc: "Finished",
        assignee: "D Person",
        status: "done",
        point: 5,
    },
];

test("application modules load with consistent imports", async () => {
    const modules = await Promise.all([
        import("../dist/assets/js/app.js"),
        import("../dist/assets/js/database/mockDb.js"),
        import("../dist/assets/js/dom/script.js"),
        import("../dist/assets/js/utils/tasks.js"),
        import("../dist/assets/js/utils/calc.js"),
    ]);

    assert.equal(modules.length, 5);
});

test("board rendering puts tasks in all status columns and updates metrics", () => {
    const elements = new Map(
        [
            ...BOARD_COLUMNS.map(({ elementId }) => [elementId, { innerHTML: "" }]),
            ["metric-total", { textContent: "" }],
            ["metric-in-progress", { textContent: "" }],
            ["metric-high-priority", { textContent: "" }],
            ["metric-completed", { textContent: "" }],
        ],
    );
    const documentRef = {
        getElementById: (id) => elements.get(id),
    };

    const metrics = renderBoard(fixtureTasks, documentRef);

    for (const { status, elementId } of BOARD_COLUMNS) {
        const columnMarkup = elements.get(elementId).innerHTML;
        const task = fixtureTasks.find((item) => item.status === status);
        assert.match(columnMarkup, new RegExp(task.title));
    }
    assert.equal(elements.get("metric-total").textContent, "4");
    assert.equal(elements.get("metric-in-progress").textContent, "1");
    assert.equal(elements.get("metric-high-priority").textContent, "2");
    assert.equal(elements.get("metric-completed").textContent, "1");
    assert.deepEqual(metrics, calculateBoardMetrics(fixtureTasks));
});

test("task card rendering escapes user-provided HTML", () => {
    const markup = renderTaskCardTemplate({
        ...fixtureTasks[0],
        title: '<img src=x onerror="alert(1)">',
    });

    assert.match(markup, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
    assert.doesNotMatch(markup, /<img src=x/);
});

test("metrics include every task and handle empty boards", () => {
    assert.deepEqual(calculateBoardMetrics(fixtureTasks), {
        total: 4,
        highPriority: 2,
        inProgress: 1,
        completed: 1,
    });
    assert.deepEqual(calculateBoardMetrics([]), {
        total: 0,
        highPriority: 0,
        inProgress: 0,
        completed: 0,
    });
});

test("saved tasks restore into the shared database state", () => {
    const savedTasks = [fixtureTasks[1]];
    globalThis.localStorage = {
        getItem(key) {
            assert.equal(key, "kanban_tasks_backup");
            return JSON.stringify(savedTasks);
        },
    };

    try {
        assert.deepEqual(loadFromStorage(), savedTasks);
        assert.deepEqual(getTasks(), savedTasks);
    } finally {
        delete globalThis.localStorage;
    }
});
