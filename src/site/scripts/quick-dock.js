(function() {
    function initQuickDock() {
        if (document.getElementById("quick-action-dock")) return;

        const dock = document.createElement("div");
        dock.id = "quick-action-dock";
        dock.className = "quick-action-dock";
        dock.innerHTML = `
            <button id="dock-scroll-top" class="dock-btn" title="Scroll to Top" aria-label="Scroll to top">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
            </button>
            <div id="dock-divider-scroll" class="dock-divider"></div>
            <button id="dock-share" class="dock-btn" title="Copy Page Link" aria-label="Copy page link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
            </button>
            <div class="dock-divider"></div>
            <button id="dock-theme" class="dock-btn" type="button" aria-label="Switch to light mode" title="Switch to light mode">
                <svg class="dock-theme-icon dock-theme-icon--sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"></path>
                </svg>
                <svg class="dock-theme-icon dock-theme-icon--moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </button>
            <span id="dock-toast" class="dock-toast">Link Copied! ✓</span>
        `;

        document.body.appendChild(dock);

        const themeButton = document.getElementById("dock-theme");
        const savedTheme = localStorage.getItem("jorbox-theme");
        let currentTheme = savedTheme === "light" || savedTheme === "dark"
            ? savedTheme
            : document.body.classList.contains("theme-light") ? "light" : "dark";

        function applyTheme(theme) {
            currentTheme = theme;
            document.body.classList.toggle("theme-light", theme === "light");
            document.body.classList.toggle("theme-dark", theme === "dark");
            document.documentElement.classList.toggle("theme-light", theme === "light");
            document.documentElement.classList.toggle("theme-dark", theme === "dark");
            document.documentElement.dataset.theme = theme;
            document.documentElement.style.colorScheme = theme;
            themeButton.setAttribute("aria-pressed", String(theme === "light"));
            themeButton.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
            themeButton.title = themeButton.getAttribute("aria-label");
        }

        applyTheme(currentTheme);
        themeButton.addEventListener("click", () => {
            const nextTheme = currentTheme === "dark" ? "light" : "dark";
            applyTheme(nextTheme);
            localStorage.setItem("jorbox-theme", nextTheme);
        });

        // 1. Scroll to Top
        const scrollTopBtn = document.getElementById("dock-scroll-top");
        const scrollDivider = document.getElementById("dock-divider-scroll");

        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        // Show/Hide Scroll to top based on scroll position
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add("visible");
                if (scrollDivider) scrollDivider.classList.add("visible");
            } else {
                scrollTopBtn.classList.remove("visible");
                if (scrollDivider) scrollDivider.classList.remove("visible");
            }
        }, { passive: true });

        // 3. Share Link
        const shareBtn = document.getElementById("dock-share");
        const toast = document.getElementById("dock-toast");
        shareBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                toast.classList.add("show");
                setTimeout(() => {
                    toast.classList.remove("show");
                }, 2000);
            }).catch(err => {
                console.error("Failed to copy link", err);
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initQuickDock);
    } else {
        initQuickDock();
    }
})();
