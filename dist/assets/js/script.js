function themeInitialiser() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    }
    return "Theme Applied";
}
themeInitialiser();

const themeToggleBtn = document.getElementById("theme-toggle-btn");
const htmlRoot = document.documentElement;

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

function activityCloseBtn() {
    const drawer = document.getElementById("activity-drawer");
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
}

function openActivityLog() {
    const drawer = document.getElementById("activity-drawer");
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
}
