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

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initReadingProgress);
    } else {
        initReadingProgress();
    }
})();
