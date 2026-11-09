const calculateBoardMetrics = (tasksArray) => {
    // 1. Create a starting object with all counts set to 0
    const metrics = {
        total: 0,
        highPriority: 0,
        todo: 0,
        inProgress: 0,
        review: 0,
        done: 0,
    };


    // 2. Loop through every single task in the array
    for (let task of tasksArray) {
        metrics.total += 1;

        if(task.priority === "high") {
            metrics.highPriority += 1;
        }
            switch(task.status) {
                case "todo":
                    metrics.todo += 1;
                    break;
                case "in_progress":
                    metrics.inProgress += 1;
                    break;
                case "review":
                    metrics.review += 1;
                    break;
                case "done":
                    metrics.done += 1;
                    break;
                default:
                    console.warn(`Unknown status '${task.status}' encountered for task ID ${task.id}.`);
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
//             metrics.done += task.status === "done" ? 1 : 0;
//             return metrics;
//         },
//         { total: 0, highPriority: 0, inProgress: 0, done: 0 },
//     );

export { calculateBoardMetrics, calculateTotalStoryPoints };
