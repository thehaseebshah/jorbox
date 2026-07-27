(function() {
    function initReadingProgress() {
        let bar = document.getElementById("reading-progress-bar");
        if (!bar) {
            bar = document.createElement("div");
            bar.id = "reading-progress-bar";
            document.body.appendChild(bar);
        }

        let isTicking = false;

        function updateProgress() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) * 100 : 0;

            bar.style.width = `${progress.toFixed(2)}%`;
            isTicking = false;
        }

        window.addEventListener("scroll", () => {
            if (!isTicking) {
                isTicking = true;
                requestAnimationFrame(updateProgress);
            }
        }, { passive: true });

        updateProgress();
    }

    function initHeroBadges() {
        const header = document.querySelector("main.content header");
        if (!header || header.querySelector(".hero-badge-bar")) return;

        const badgeBar = document.createElement("div");
        badgeBar.className = "hero-badge-bar";

        const mainEl = document.querySelector("main.content");
        const moduleName = mainEl?.getAttribute("data-module") || "Shabab Curriculum";

        const catChip = document.createElement("span");
        catChip.className = "hero-chip category-chip";
        catChip.innerHTML = `📚 ${moduleName}`;

        const contentText = mainEl?.innerText || "";
        const wordCount = contentText.trim().split(/\s+/).length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));

        const timeChip = document.createElement("span");
        timeChip.className = "hero-chip reading-time";
        timeChip.innerHTML = `⏱️ ${readTime} min read`;

        badgeBar.appendChild(catChip);
        badgeBar.appendChild(timeChip);

        header.insertBefore(badgeBar, header.firstChild);
    }

    function setupAll() {
        initReadingProgress();
        initHeroBadges();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupAll);
    } else {
        setupAll();
    }
})();
