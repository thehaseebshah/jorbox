(function() {
    function initCursorGlow() {
        let spotlightEl = document.getElementById("cursor-spotlight");
        if (!spotlightEl) {
            spotlightEl = document.createElement("div");
            spotlightEl.id = "cursor-spotlight";
            document.body.appendChild(spotlightEl);
        }

        let ringEl = document.getElementById("cursor-ring");
        if (!ringEl) {
            ringEl = document.createElement("div");
            ringEl.id = "cursor-ring";
            document.body.appendChild(ringEl);
        }

        let currentX = -1000;
        let currentY = -1000;
        let targetX = -1000;
        let targetY = -1000;
        let isRunning = false;

        function animate() {
            currentX += (targetX - currentX) * 0.15;
            currentY += (targetY - currentY) * 0.15;

            spotlightEl.style.left = `${currentX}px`;
            spotlightEl.style.top = `${currentY}px`;

            ringEl.style.left = `${targetX}px`;
            ringEl.style.top = `${targetY}px`;

            if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
                requestAnimationFrame(animate);
            } else {
                isRunning = false;
            }
        }

        window.addEventListener("mousemove", (e) => {
            targetX = e.clientX;
            targetY = e.clientY;

            if (currentX === -1000) {
                currentX = targetX;
                currentY = targetY;
            }

            if (!isRunning) {
                isRunning = true;
                requestAnimationFrame(animate);
            }
        }, { passive: true });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initCursorGlow);
    } else {
        initCursorGlow();
    }
})();
