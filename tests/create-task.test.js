import assert from "node:assert/strict";
import test from "node:test";

import { getTasks } from "../dist/assets/js/database/mockDb.js";
import { createNewTaskObj } from "../dist/assets/js/utils/tasks.js";

test("task factory accepts form fields and adds the task to shared state", () => {
    let savedTasks;
    globalThis.localStorage = {
        setItem(key, value) {
            assert.equal(key, "kanban_tasks_backup");
            savedTasks = JSON.parse(value);
        },
    };

    try {
        const newTask = createNewTaskObj({
            title: "Add task creation",
            category: "frontend",
            priority: "high",
            desc: "Create a task from the form",
            assignee: "A Person",
            status: "todo",
        });

        assert.ok(newTask);
        assert.equal(newTask.title, "Add task creation");
        assert.ok(getTasks().some((task) => task.id === newTask.id));
        assert.ok(savedTasks.some((task) => task.id === newTask.id));
    } finally {
        delete globalThis.localStorage;
    }
});
