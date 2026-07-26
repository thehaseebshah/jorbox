(function() {
    function initSpotlight() {
        if (!document.getElementById("cursor-spotlight")) {
            const spotlight = document.createElement("div");
            spotlight.id = "cursor-spotlight";
            document.body.appendChild(spotlight);
        }
        if (!document.getElementById("cursor-dot")) {
            const dot = document.createElement("div");
            dot.id = "cursor-dot";
            document.body.appendChild(dot);
        }

        const spotlightEl = document.getElementById("cursor-spotlight");
        const dotEl = document.getElementById("cursor-dot");

        let currentX = window.innerWidth / 2;
        let currentY = window.innerHeight / 2;
        let targetX = currentX;
        let targetY = currentY;
        let isTicking = false;

        function updatePositions() {
            currentX += (targetX - currentX) * 0.18;
            currentY += (targetY - currentY) * 0.18;

            if (spotlightEl) {
                spotlightEl.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;
            }
            if (dotEl) {
                dotEl.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
            }

            if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
                requestAnimationFrame(updatePositions);
            } else {
                isTicking = false;
            }
        }

        window.addEventListener("mousemove", (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
            if (!isTicking) {
                isTicking = true;
                requestAnimationFrame(updatePositions);
            }
        }, { passive: true });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initSpotlight);
    } else {
        initSpotlight();
    }
})();
