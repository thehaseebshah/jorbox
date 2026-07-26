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
            <span id="dock-toast" class="dock-toast">Link Copied! ✓</span>
        `;

        document.body.appendChild(dock);

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
