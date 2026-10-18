
const htmlRoot = document.documentElement;
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const modalBackdrop = document.getElementById("task-modal");
// const activityDrawer = document.getElementById("activity-drawer");

function themeInitialiser() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    }
    return "Theme Applied";
}
themeInitialiser();

themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlRoot.getAttribute("data-theme");
    if (currentTheme === "dark") {
        htmlRoot.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
    } else {
        htmlRoot.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
});

function handleNavToggle() {
    const navbarToggle = document.getElementById("navbar");
    navbarToggle.classList.toggle("show");
}

function modalCloseBtn() {
    const modalBackdrop = document.getElementById("task-modal");
    modalBackdrop.style.display = "none ";
}

modalBackdrop.addEventListener("click", function (event) {
    if (event.target === modalBackdrop) {
        modalCloseBtn();
    }
});


// Ensure you have these element selections defined at the top of your script
const activityDrawer = document.getElementById("activity-drawer");

function openActivityLog(event) {
    // Prevent the click event from bubbling up to the document listener below
    if (event) event.stopPropagation(); 
    
    activityDrawer.classList.add("is-open");
    activityDrawer.setAttribute("aria-hidden", "false");
}

function activityCloseBtn() {
    activityDrawer.classList.remove("is-open");
    activityDrawer.setAttribute("aria-hidden", "true");
}

// Global listener: Catch clicks anywhere outside the drawer on the webpage
document.addEventListener("click", function (event) {
    // Only proceed if the drawer is currently open
    const isOpen = activityDrawer.classList.contains("is-open");

    // Close the drawer if the click target is NOT the drawer itself, 
    // and NOT inside any children elements of the drawer
    if (isOpen && !activityDrawer.contains(event.target)) {
        activityCloseBtn();
    }
});
