function createNewTaskObj(title, category, priority, desc, assignee, status) {
    const generateID = Date.now();

    // FIX: Aligned arguments to match the parameter definition of validateTaskInput below
    const validationCheck = validateTaskInput(
        title,
        desc,
        category,
        priority,
        assignee,
        status,
    );

    if (!validationCheck) {
        console.error("❌ Task creation halted due to validation failure.");
        return;
    }

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
        assignee: assignee,
        status: status,
    };
    console.table(newTask);
}

function validateTaskInput(title, desc, category, priority, assignee, status) {
    if (typeof title !== "string" || title.trim().length === 0) {
        console.error(
            "Validation Error: Task title must be a non-empty string.",
        );
        return false;
    }

    if (title.trim().length < 3) {
        console.warn("Validation Warning: Task title is extremely short.");
    }

    const validCategories = ["frontend", "backend", "database", "devops"];
    if (!validCategories.includes(category)) {
        console.error(`Validation Error: Invalid category '${category}'.`);
        return false;
    }

    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(priority)) {
        console.error(`Validation Error: Invalid priority '${priority}'.`);
        return false;
    }

    if (typeof desc !== "string" || desc.trim().length === 0) {
        console.error("Validation Error: The description cannot be empty.");
        return false;
    }

    // FIX: Added missing 'typeof' operator for string evaluation
    if (typeof assignee !== "string" || assignee.trim().length < 3) {
        console.error(
            "Validation Error: Assignee must be a valid string of at least 3 characters.",
        );
        return false;
    }

    const validStatus = [
        "todo",
        "in_progress",
        "done",
        "inProgress",
        "completed",
    ];
    if (!validStatus.includes(status)) {
        console.error(`Validation Error: Invalid status '${status}'.`);
        return false;
    }

    return true;
}

function formatTaskSumamry(taskObj) {
    const { title, category, priority, assignee } = taskObj;

    const formattedCategory = category.toUpperCase();
    const formattedPriority = priority.toUpperCase();

    // console.log(
    //     `[${formattedCategory}] ${title} (Priority: ${formattedPriority}) - Assigned to: ${assignee}`,
    // );
    return `[${formattedCategory}] ${title} (Priority: ${formattedPriority}) - Assigned to: ${assignee}`;
}

function getColumnNameByStatus(statusKey) {
    switch (statusKey) {
        case "todo":
            return "To Do";
        case "in_progress":
            return "In Progress";
        case "review":
            return "Review";
        default:
            return "Backlog";
    }
}

const filterTasksByPriority = (tasksArray, targetPriority) => {
    const filteredResults = [];

    for (const task of tasksArray) {
        if (task.priority === targetPriority) {
            filteredResults.push(task);
        }
    }
    return filteredResults;
};

const calculateBoardMetrics = (tasksArray) => {
    let highPriorityCount = 0;
    let completedCount = 0;
    let activeCount = 0;

    for (let task = 0; task < tasksArray.length; task++) {
        const currentTask = tasksArray[task];

        if (currentTask.priority === "high") {
            highPriorityCount++;
        }

        if (currentTask.status === "done") {
            completedCount++;
        } else {
            activeCount++;
        }

        return {
            total: tasksArray.length,
            highPriority: highPriorityCount,
            completed: completedCount,
            active: activeCount,
        };
    }
};

const searchTasksByKeyword = (taskArray, keyword) => {
    const results = [];

    const normalisedKeyword = keyword;

    for (const task of taskArray) {
        const normalisedTitle = task.title.toLowerCase();

        if (normalisedTitle.includes(normalisedKeyword)) {
            results.push(task);
        }
    }

    return results;
};

const getCategoryTaskCounts = (tasksArray) => {
    const frontendCategory = [];
    const backendCategory = [];
    const databaseCategory = [];
    const devopsCategory = [];

    for (const task of tasksArray) {
        const normalisedCategory = task.category.toLowerCase();
        switch (normalisedCategory) {
            case "frontend":
                frontendCategory.push(task);
                break;
            case "backend":
                backendCategory.push(task);
                break;
            case "database":
                databaseCategory.push(task);
                break;
            case "devops":
                devopsCategory.push(task);
                break;
            default:
                console.log(
                    "The category " +
                        `'${normalisedCategory}'` +
                        " does not match any category.",
                );
                break;
        }
    }

    const categoryObj = {
        frontend: frontendCategory.length,
        backend: backendCategory.length,
        database: databaseCategory.length,
        devops: devopsCategory.length,
    };
    return categoryObj;
};

export {
    createNewTaskObj,
    validateTaskInput,
    formatTaskSumamry,
    getColumnNameByStatus,
    filterTasksByPriority,
    calculateBoardMetrics,
    searchTasksByKeyword,
    getCategoryTaskCounts,
};

// Test validation function immediately in console
// const testResult = validateTaskInput(
//     "Setup PostgreSQL DB",
//     "database",
//     "high",
//     "askbfhasdvjksdfbjkvbsbvskbvskvskvhksbv hkxsbvh jfgjsgvsjh mbcsbvjhvbs msbdvjhsfbjhbvsfjhbv  nfbjvdfjhbv",
// );
// console.log(`Test Validation Result: ${testResult}`);

// const summary = formatTaskSumamry(initialTasksDatabase[2]);
// console.log("summary:", summary);
