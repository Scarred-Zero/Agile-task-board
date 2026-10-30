import {
    themeInitialiser,
    modalCloseBtn,
    modalBackdropClose,
    activityCloseBtn,
    openActivityLog,
    handleNavToggle,
} from "./script.js";

import {
    filterTasksByPriority,
    getColumnNameByStatus,
    searchTasksByKeyword,
    getCategoryTaskCounts,
    createNewTaskObj
} from "./utils/tasks.js";

import { calculateBoardMetrics } from "./utils/calc.js";

import { taskBoardDatabase } from "./mockDb.js";

// Initialisers
themeInitialiser();
modalCloseBtn();
activityCloseBtn();
openActivityLog();
handleNavToggle();
modalBackdropClose();

console.group(
    "%c📦 Agile Task Board - State Manager Test",
    "color: #2563eb; font-weight: bold; font-size: 13px;",
);

createNewTaskObj(
    "Configure Zoe's brain",
    "backend",
    "high",
    "Zoe2.4 needs brain reconfiguration",
    "Xero Bot",
    "todo",
);

console.table(taskBoardDatabase);

const exportedJsonPayload = JSON.stringify(taskBoardDatabase, null, 2);
console.log("Exported JSON Payload String:\n", exportedJsonPayload);

console.groupEnd();

// console.group(
//     "%c📊 Agile Task Board - Logic Execution Report",
//     "color: #2563eb; font-weight: bold; font-size: 13px;",
// );

// const highPriorityTasks = filterTasksByPriority(taskBoardDatabase, "high");
// console.log("Filtered High Priority Tasks:");
// console.table(highPriorityTasks);

// const computedMetrics = calculateBoardMetrics(taskBoardDatabase);
// console.log("Board Summary Metrics Object:");
// console.table(computedMetrics);

// console.log(
//     `Status Key 'in_progress' maps to Column: ${getColumnNameByStatus("in_progress")}`,
// );
// console.groupEnd();

// console.table(searchTasksByKeyword(taskBoardDatabase, "schema"));
// console.table(getCategoryTaskCounts(taskBoardDatabase));
