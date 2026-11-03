function validateTaskInput(title, category, priority, desc, assignee, status) {
    const VALID_CATEGORIES = ["frontend", "backend", "database", "devops"];
    const VALID_PRIORITIES = ["low", "medium", "high"];
    const VALID_STATUS = ["todo", "in_progress", "review", "done"];


    if (typeof title !== "string" || title.trim().length === 0) {
        console.error(
            "Validation Error: Task title must be a non-empty string.",
        );
        return false;
    }

    if (title.trim().length < 3) {
        console.warn("Validation Warning: Task title is extremely short.");
    }

    if (!VALID_CATEGORIES.includes(category)) {
        console.error(`Validation Error: Invalid category '${category}'.`);
        return false;
    }

    if (!VALID_PRIORITIES.includes(priority)) {
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

    if (!VALID_STATUS.includes(status)) {
        console.error(`Validation Error: Invalid status '${status}'.`);
        return false;
    }

    return true;
}

export { validateTaskInput };
