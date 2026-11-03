const calculateBoardMetrics = (tasksArray) => {
    // 1. Create a starting object with all counts set to 0
    const metrics = {
        total: 0,
        highPriority: 0,
        inProgress: 0,
        completed: 0,
    };

    // 2. Loop through every single task in the array
    for (let task of tasksArray) {
        // Add 1 to the total count for every task
        metrics.total += 1;

        // If the task priority is high, add 1 to highPriority
        if (task.priority === "high") {
            metrics.highPriority += 1;
        }

        // If the task status is in_progress, add 1 to inProgress
        if (task.status === "in_progress") {
            metrics.inProgress += 1;
        }

        // If the task status is done, add 1 to completed
        if (task.status === "done") {
            metrics.completed += 1;
        }
    }

    // 3. Return the final count object
    return metrics;
};

const calculateTotalStoryPoints = (tasks) => tasks.reduce((total, task) => total + (task.point ?? 0), 0); // The nullish coalescing operator.



// const calculateBoardMetrics = (tasksArray) =>
//     tasksArray.reduce(
//         (metrics, task) => {
//             metrics.total += 1;
//             metrics.highPriority += task.priority === "high" ? 1 : 0;
//             metrics.inProgress += task.status === "in_progress" ? 1 : 0;
//             metrics.completed += task.status === "done" ? 1 : 0;
//             return metrics;
//         },
//         { total: 0, highPriority: 0, inProgress: 0, completed: 0 },
//     );

export { calculateBoardMetrics, calculateTotalStoryPoints };
