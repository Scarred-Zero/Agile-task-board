import assert from "node:assert/strict";
import test from "node:test";

import {
    deleteTaskFromDatabase,
    getTasks,
} from "../dist/assets/js/database/mockDb.js";

test("deleting by a DOM string ID removes numeric task IDs and persists", () => {
    let savedTasks;
    globalThis.localStorage = {
        setItem(key, value) {
            assert.equal(key, "kanban_tasks_backup");
            savedTasks = JSON.parse(value);
        },
    };

    try {
        assert.equal(deleteTaskFromDatabase("201"), true);
        assert.equal(
            getTasks().some((task) => String(task.id) === "201"),
            false,
        );
        assert.equal(
            savedTasks.some((task) => String(task.id) === "201"),
            false,
        );
    } finally {
        delete globalThis.localStorage;
    }
});
