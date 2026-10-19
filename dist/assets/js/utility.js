function validateTaskInput(title, desc, category, priority, assignee, status) {
    // Use strict inequality and data type checks
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
        console.error(
            "Validation Error: The description cannot be a number/symbol and cannot be empty",
        );
        return false;
    }

    if (assignee !== "string" || assignee.trim().length < 3) {
        console.error(
            "Validation Error: Assignne cannot be a non-empty string or less than 3 characters",
        );
        return false;
    }

    const validStatus = ["todo", "inProgress", "completed"];
    if (!validStatus.includes(status)) {
        console.error(`Validation Error: Invalid status '${status}'.`);
        return false;
    }

    // console.log(
    //     "%c✓ Task Validation Passed Successfully!",
    //     "color: #10b981; font-weight: bold;",
    // );
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

function getPriorityBadgeClass(priorityLevel) {
    switch (priorityLevel) {
        case "high":
            return "badge-danger";
        case "medium":
            return "badge-warning";
        case "low":
            return "badge-success";
        default:
            return "badge-secondary";
    }
}

getPriorityBadgeClass("high");



export { validateTaskInput, formatTaskSumamry };

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
