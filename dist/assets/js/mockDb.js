// 1. Application Constants & Initial State Configuration
const APP_NAME = "Agile Task Board";
const API_VERSION = "v1.0.0";

// Mutable state tracking active filter and application counters
let activeWorkspaceFilter = "all";
let totalTasksRegistered = 2;


// 2. Initial Task Data Model (Array of Objects)
const taskBoardDatabase = [
  { id: 201, title: "Design ERD Schema", category: "database", priority: "high", status: "todo" },
  { id: 202, title: "Configure FastAPI Router", category: "backend", priority: "medium", status: "in_progress" },
  { id: 203, title: "Build Flexbox Navbar", category: "frontend", priority: "low", status: "done" },
  { id: 204, title: "Setup Netlify CI/CD", category: "devops", priority: "high", status: "done" },
  { id: 205, title: "Write Pydantic Schemas", category: "backend", priority: "high", status: "todo" }
];

export {taskBoardDatabase}


// 3. Diagnostic Initialization Logging using Console Tools
// console.group(
//     `%c🚀 ${APP_NAME} Initialized (${API_VERSION})`,
//     "color: #2563eb; font-weight: bold; font-size: 14px;",
// );

// console.log(`Current Workspace Filter: ${activeWorkspaceFilter}`);
// console.log(`Total Initial Tasks Loaded: ${totalTasksRegistered}`);
// console.table(initialTasksDatabase);
// console.groupEnd();