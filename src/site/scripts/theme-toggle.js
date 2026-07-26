(function() {
    function initThemeToggle() {
        const buttons = Array.from(document.querySelectorAll("[data-theme-toggle]"));
        if (!buttons.length) return;

        function readSavedTheme() {
            try {
                return localStorage.getItem("shabab-theme") || localStorage.getItem("jorbox-theme");
            } catch {
                return null;
            }
        }

        function saveTheme(theme) {
            try {
                localStorage.setItem("shabab-theme", theme);
                localStorage.removeItem("jorbox-theme");
            } catch {
                // The selected theme still applies for the current page.
            }
        }

        function applyTheme(theme) {
            const isLight = theme === "light";
            document.body.classList.toggle("theme-light", isLight);
            document.body.classList.toggle("theme-dark", !isLight);
            document.documentElement.classList.toggle("theme-light", isLight);
            document.documentElement.classList.toggle("theme-dark", !isLight);
            document.documentElement.dataset.theme = theme;
            document.documentElement.style.colorScheme = theme;

            buttons.forEach((button) => {
                const label = `Switch to ${isLight ? "dark" : "light"} mode`;
                button.setAttribute("aria-pressed", String(isLight));
                button.setAttribute("aria-label", label);
                button.title = label;
            });
        }

        const savedTheme = readSavedTheme();
        let currentTheme = savedTheme === "light" || savedTheme === "dark"
            ? savedTheme
            : document.body.classList.contains("theme-light") ? "light" : "dark";

        applyTheme(currentTheme);

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                currentTheme = currentTheme === "dark" ? "light" : "dark";
                applyTheme(currentTheme);
                saveTheme(currentTheme);
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initThemeToggle);
    } else {
        initThemeToggle();
    }
})();
