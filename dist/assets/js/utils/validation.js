function validateTaskInput(title, category, priority, desc, assignee, status) {
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

export { validateTaskInput };
