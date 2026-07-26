(function() {
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

    // Initial position setup
    document.body.style.setProperty("--cursor-x", `${currentX}px`);
    document.body.style.setProperty("--cursor-y", `${currentY}px`);
})();
