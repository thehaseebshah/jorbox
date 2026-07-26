(function() {
    function initSpotlight() {
        if (!document.getElementById("cursor-spotlight")) {
            const spotlight = document.createElement("div");
            spotlight.id = "cursor-spotlight";
            document.body.prepend(spotlight);
        }

        let currentX = window.innerWidth / 2;
        let currentY = window.innerHeight / 2;
        let targetX = currentX;
        let targetY = currentY;
        let isTicking = false;

        function updateCursorSpotlight() {
            currentX += (targetX - currentX) * 0.14;
            currentY += (targetY - currentY) * 0.14;

            document.body.style.setProperty("--cursor-x", `${currentX.toFixed(1)}px`);
            document.body.style.setProperty("--cursor-y", `${currentY.toFixed(1)}px`);

            if (Math.abs(targetX - currentX) > 0.2 || Math.abs(targetY - currentY) > 0.2) {
                requestAnimationFrame(updateCursorSpotlight);
            } else {
                isTicking = false;
            }
        }

        window.addEventListener("mousemove", (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
            if (!isTicking) {
                isTicking = true;
                requestAnimationFrame(updateCursorSpotlight);
            }
        }, { passive: true });

        document.body.style.setProperty("--cursor-x", `${currentX}px`);
        document.body.style.setProperty("--cursor-y", `${currentY}px`);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initSpotlight);
    } else {
        initSpotlight();
    }
})();
