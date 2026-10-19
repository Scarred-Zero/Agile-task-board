const htmlRoot = document.documentElement;
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const activityDrawer = document.getElementById("activity-drawer");

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
    const btn = document.getElementById("hamburgerMenu");
    if (btn) {
        btn.addEventListener("click", () => {
            const navbarToggle = document.getElementById("navbar");
            navbarToggle.classList.toggle("show");
        });
    }
}

function modalCloseBtn() {
    const btn = document.getElementById("modal-close-btn");
    if (btn) {
        btn.addEventListener("click", () => {
            const modalBackdrop = document.getElementById("task-modal");
            modalBackdrop.style.display = "none";
        });
    }
}

function modalBackdropClose() {
    const modalBackdrop = document.getElementById("task-modal");

    // Safely check if the element exists in the DOM first
    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", function (event) {
            // If the user clicks the dark background directly (not the inner modal box)
            if (event.target === modalBackdrop) {
                modalBackdrop.style.display = "none"; // Hide the modal directly
            }
        });
    }
}

function openActivityLog(event) {
    // Prevent the click event from bubbling up to the document listener below
    if (event) event.stopPropagation();

    const btn = document.getElementById("task-card");
    if (btn) {
        btn.addEventListener("click", () => {
            activityDrawer.classList.add("is-open");
            activityDrawer.setAttribute("aria-hidden", "false");
        });
    }
}

function activityCloseBtn() {
    const btn = document.getElementById("drawer-btn-close");
    if (btn) {
        btn.addEventListener("click", () => {
            activityDrawer.classList.remove("is-open");
            activityDrawer.setAttribute("aria-hidden", "true");
        });
    }
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

export {
    themeInitialiser,
    handleNavToggle,
    modalCloseBtn,
    modalBackdropClose,
    openActivityLog,
    activityCloseBtn,
};
