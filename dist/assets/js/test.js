const kanbanTaskManager = {
  boardName: "Sprint 14 Core Board",
  tasks: [
    { id: 301, title: "Design PostgreSQL ERD", category: "database", priority: "high", status: "todo" },
    { id: 302, title: "Build FastAPI Endpoints", category: "backend", priority: "medium", status: "in_progress" }
  ],

  // Method to add a new task object to the array (Mutation: push)
  addNewTask(title, category, priority, status = "todo") {
    const newTask = {
      id: Date.now(), // Unique numeric timestamp ID
      title: title.trim(),
      category: category,
      priority: priority,
      status: status
    };

    this.tasks.push(newTask);
    console.log(`%c[Success] Task added: "${newTask.title}"`, "color: #10b981; font-weight: bold;");
    this.syncToStorage();
    return newTask;
  },

  // Method to delete a task by ID using array searching and splice mutation
  deleteTaskById(taskId) {
    const index = this.tasks.findIndex(task => task.id === taskId);
    
    if (index !== -1) {
      const removedTask = this.tasks.splice(index, 1)[0];
      console.log(`%c[Deleted] Task removed: "${removedTask.title}"`, "color: #ef4444; font-weight: bold;");
      this.syncToStorage();
      return true;
    }
    
    console.warn(`[Warning] Task ID ${taskId} not found for deletion.`);
    return false;
  },

  // Method to serialize state to JSON string and save to localStorage simulation
  syncToStorage() {
    const serializedData = JSON.stringify(this.tasks);
    localStorage.setItem("kanban_tasks_backup", serializedData);
    console.log("%c[Storage] Board state serialized and synchronized.", "color: #2563eb;");
  },

  // Method to load and deserialize state from JSON storage
  loadFromStorage() {
    const rawData = localStorage.getItem("kanban_tasks_backup");
    if (rawData) {
      this.tasks = JSON.parse(rawData);
      console.log("%c[Storage] Board state restored from JSON payload.", "color: #8b5cf6; font-weight: bold;");
    }
  }
};