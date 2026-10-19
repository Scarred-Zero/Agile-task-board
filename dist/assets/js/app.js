import {
    themeInitialiser,
    modalCloseBtn,
    modalBackdropClose,
    activityCloseBtn,
    openActivityLog,
    handleNavToggle,
} from "./script.js";

import {
    validateTaskInput,
    filterTasksByPriority,
    calculateBoardMetrics,
    getColumnNameByStatus,
    searchTasksByKeyword
} from "./utility.js";

import { taskBoardDatabase } from "./mockDb.js";

// Initialisers
themeInitialiser();
modalCloseBtn();
activityCloseBtn();
openActivityLog();
handleNavToggle();
modalBackdropClose();

function createNewTaskObj(title, category, priority, desc, assignee, status) {
    const generateID = Date.now();
    const validationCheck = validateTaskInput(
        title,
        category,
        priority,
        desc,
        assignee,
        status,
    );
    console.log(
        "%c✓ Task Validation Passed Successfully!",
        "color: #10b981; font-weight: bold;",
    );
    const newTask = {
        id: generateID,
        title: title,
        category: category,
        priority: priority,
        desc: desc,
    };
    console.table(newTask);
}

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
