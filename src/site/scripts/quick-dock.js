(function() {
    function initQuickDock() {
        if (document.getElementById("quick-action-dock")) return;

        const dock = document.createElement("div");
        dock.id = "quick-action-dock";
        dock.className = "quick-action-dock";
        dock.innerHTML = `
            <button id="dock-scroll-top" class="dock-btn" type="button" title="Scroll to top" aria-label="Scroll to top">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
            </button>
        `;
        document.body.appendChild(dock);

        const scrollTopButton = document.getElementById("dock-scroll-top");

        function updateScrollTopVisibility() {
            const isVisible = window.scrollY > 300;
            dock.classList.toggle("visible", isVisible);
            scrollTopButton.classList.toggle("visible", isVisible);
        }

        scrollTopButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        updateScrollTopVisibility();
        window.addEventListener("scroll", updateScrollTopVisibility, { passive: true });
        window.addEventListener("pageshow", updateScrollTopVisibility);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initQuickDock);
    } else {
        initQuickDock();
    }
})();
