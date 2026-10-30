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

export { calculateBoardMetrics };
