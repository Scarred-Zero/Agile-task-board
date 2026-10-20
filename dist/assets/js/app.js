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
    calculateBoardMetrics,
    getColumnNameByStatus,
    searchTasksByKeyword,
    getCategoryTaskCounts
} from "./utility.js";

import { taskBoardDatabase } from "./mockDb.js";

// Initialisers
themeInitialiser();
modalCloseBtn();
activityCloseBtn();
openActivityLog();
handleNavToggle();
modalBackdropClose();


createNewTaskObj(taskBoardDatabase[2]);

console.group(
    "%c📊 Agile Task Board - Logic Execution Report",
    "color: #2563eb; font-weight: bold; font-size: 13px;",
);

const highPriorityTasks = filterTasksByPriority(taskBoardDatabase, "high");
console.log("Filtered High Priority Tasks:");
console.table(highPriorityTasks);

const computedMetrics = calculateBoardMetrics(taskBoardDatabase);
console.log("Board Summary Metrics Object:");
console.table(computedMetrics);

console.log(
    `Status Key 'in_progress' maps to Column: ${getColumnNameByStatus("in_progress")}`,
);
console.groupEnd();


console.table(searchTasksByKeyword(taskBoardDatabase, "schema"));
console.table(getCategoryTaskCounts(taskBoardDatabase));
