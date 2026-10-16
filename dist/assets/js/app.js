// 1. Application Constants & Initial State Configuration
const APP_NAME = "Agile Task Board";
const API_VERSION = "v1.0.0";

// Mutable state tracking active filter and application counters
let activeWorkspaceFilter = "all";
let totalTasksRegistered = 2;

// 2. Initial Task Data Model (Array of Objects)
const initialTasksDatabase = [
    {
        id: 101,
        title: "Implement Auth Interceptor",
        category: "frontend",
        priority: "high",
        status: "todo",
        assignee: "Victory Basoene",
    },
    {
        id: 102,
        title: "Implement DB Stabilisation",
        category: "backend",
        priority: "medium",
        status: "todo",
        assignee: "Zeus Basoene",
    },
];


// 3. Diagnostic Initialization Logging using Console Tools
console.group(`%c🚀 ${APP_NAME} Initialized (${API_VERSION})`, "color: #2563eb; font-weight: bold; font-size: 14px;");

console.log(`Current Workspace Filter: ${activeWorkspaceFilter}`);
console.log(`Total Initial Tasks Loaded: ${totalTasksRegistered}`);
console.table(initialTasksDatabase);
console.groupEnd();

// 4. Task Validation Utility Function
function validateTaskInput(title, category, priority, description) {
  // Use strict inequality and data type checks
  if (typeof title !== "string" || title.trim().length === 0) {
    console.error("Validation Error: Task title must be a non-empty string.");
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

  if (typeof description !== "string" || description.trim().length === 0) {
    console.error("Validation Error: The description cannot be a number/symbol and cannot be empty");
    return false
  }

  console.log("%c✓ Task Validation Passed Successfully!", "color: #10b981; font-weight: bold;");
  return true;
}

// Test validation function immediately in console
const testResult = validateTaskInput("Setup PostgreSQL DB", "database", "high", "askbfhasdvjksdfbjkvbsbvskbvskvskvhksbv hkxsbvh jfgjsgvsjh mbcsbvjhvbs msbdvjhsfbjhbvsfjhbv  nfbjvdfjhbv");
console.log(`Test Validation Result: ${testResult}`);

// Sring interpolation
//  const x = 5;
//  const y = 3;
//  console.log("x:", x)
//  console.log(`${x} is greater than ${y}`)
//  console.log(x + " " + "is greater than" + " " + y);

// const fname = "Victory";
// const lname = "Zoe";
// console.log(fname + " is shorter than " + lname)
// console.log(`Result of ${x} and ${y} is: `, x + y)