import {
    themeInitialiser,
    modalCloseBtn,
    modalBackdropClose,
    activityCloseBtn,
    openActivityLog,
    handleNavToggle,
} from "./script.js";

import { validateTaskInput } from "./utility.js";
import { initialTasksDatabase } from "./mockDb.js";

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

createNewTaskObj(initialTasksDatabase[2]);


