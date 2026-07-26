// Scroll-responsive topographic background for the learning journey.
(function() {
    const CONTOUR_GROUPS = [
        { x: -0.03, y: 0.26, radius: 0.34, stretch: 0.78, phase: 0.4 },
        { x: 1.03, y: 0.67, radius: 0.31, stretch: 0.92, phase: 2.1 },
        { x: 0.52, y: 1.08, radius: 0.25, stretch: 0.58, phase: 4.3 }
    ];

    function initTopographicMap() {
        if (document.getElementById("topographic-map-canvas")) return;

        document.documentElement.classList.add("has-topographic-map");
        document.body.classList.add("has-topographic-map");

        const canvas = document.createElement("canvas");
        canvas.id = "topographic-map-canvas";
        canvas.setAttribute("aria-hidden", "true");
        canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;";
        document.body.appendChild(canvas);

        const context = canvas.getContext("2d");
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let width = 0;
        let height = 0;
        let currentProgress = 0;
        let targetProgress = 0;
        let animationFrame = 0;

        function pageProgress() {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            return scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
        }

        function contourPoint(group, level, angle) {
            const smallestSide = Math.min(width, height);
            const baseRadius = group.radius * smallestSide * (0.38 + level * 0.16);
            const irregularity = 1
                + Math.sin(angle * 3 + group.phase) * 0.055
                + Math.cos(angle * 5 - group.phase) * 0.035
                + Math.sin(angle * 2 + level) * 0.025;
            const drift = (currentProgress - 0.5) * 18;

            return {
                x: group.x * width + Math.cos(angle) * baseRadius * irregularity + drift * (group.x < 0.5 ? -1 : 1),
                y: group.y * height + Math.sin(angle) * baseRadius * group.stretch * irregularity - drift * 0.35
            };
        }

        function drawContour(group, level) {
            context.beginPath();
            const steps = 96;

            for (let step = 0; step <= steps; step++) {
                const angle = (step / steps) * Math.PI * 2;
                const point = contourPoint(group, level, angle);
                if (step === 0) context.moveTo(point.x, point.y);
                else context.lineTo(point.x, point.y);
            }

            context.closePath();
            context.stroke();
        }

        function routePoint(position) {
            const start = { x: -20, y: height * 0.72 };
            const controlA = { x: width * 0.26, y: height * 0.54 };
            const controlB = { x: width * 0.68, y: height * 0.35 };
            const end = { x: width + 20, y: height * 0.18 };
            const inverse = 1 - position;

            return {
                x: inverse ** 3 * start.x
                    + 3 * inverse ** 2 * position * controlA.x
                    + 3 * inverse * position ** 2 * controlB.x
                    + position ** 3 * end.x,
                y: inverse ** 3 * start.y
                    + 3 * inverse ** 2 * position * controlA.y
                    + 3 * inverse * position ** 2 * controlB.y
                    + position ** 3 * end.y
                    + Math.sin(position * Math.PI * 4) * 14
            };
        }

        function drawRoute(amount) {
            const steps = 120;
            context.beginPath();

            for (let step = 0; step <= Math.max(1, Math.floor(steps * amount)); step++) {
                const point = routePoint(step / steps);
                if (step === 0) context.moveTo(point.x, point.y);
                else context.lineTo(point.x, point.y);
            }

            context.stroke();
        }

        function drawWaypoint(position, active) {
            const point = routePoint(position);
            const size = active ? 6 : 4;

            context.save();
            context.translate(point.x, point.y);
            context.rotate(Math.PI / 4);
            context.fillStyle = active ? "rgba(151, 78, 104, 0.48)" : "rgba(112, 91, 151, 0.18)";
            context.strokeStyle = active ? "rgba(196, 145, 163, 0.66)" : "rgba(148, 163, 184, 0.19)";
            context.lineWidth = 0.8;
            context.fillRect(-size / 2, -size / 2, size, size);
            context.strokeRect(-size / 2, -size / 2, size, size);
            context.restore();
        }

        function draw() {
            context.clearRect(0, 0, width, height);
            context.lineJoin = "round";

            CONTOUR_GROUPS.forEach((group, groupIndex) => {
                for (let level = 1; level <= 6; level++) {
                    const emphasis = level === 3 || level === 6;
                    context.strokeStyle = emphasis
                        ? "rgba(118, 97, 155, 0.13)"
                        : "rgba(148, 163, 184, 0.065)";
                    context.lineWidth = emphasis ? 0.9 : 0.55;
                    context.setLineDash(emphasis ? [] : [2, 5]);
                    drawContour(group, level + groupIndex * 0.08);
                }
            });

            const routeProgress = 0.08 + currentProgress * 0.92;
            const routeGradient = context.createLinearGradient(0, height, width, 0);
            routeGradient.addColorStop(0, "rgba(82, 67, 133, 0.13)");
            routeGradient.addColorStop(0.75, "rgba(128, 101, 158, 0.28)");
            routeGradient.addColorStop(1, "rgba(158, 91, 116, 0.30)");
            context.strokeStyle = routeGradient;
            context.lineWidth = 1.15;
            context.setLineDash([]);
            drawRoute(routeProgress);

            [0.18, 0.39, 0.62, 0.84].forEach(position => {
                drawWaypoint(position, Math.abs(position - routeProgress) < 0.1);
            });
        }

        function animate() {
            const difference = targetProgress - currentProgress;
            currentProgress = reducedMotion || Math.abs(difference) < 0.0005
                ? targetProgress
                : currentProgress + difference * 0.09;
            draw();

            if (currentProgress !== targetProgress) animationFrame = requestAnimationFrame(animate);
            else animationFrame = 0;
        }

        function updateProgress() {
            targetProgress = pageProgress();
            if (!animationFrame) animationFrame = requestAnimationFrame(animate);
        }

        function resize() {
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.round(width * pixelRatio);
            canvas.height = Math.round(height * pixelRatio);
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            draw();
        }

        currentProgress = targetProgress = pageProgress();
        resize();
        window.addEventListener("resize", resize, { passive: true });
        window.addEventListener("scroll", updateProgress, { passive: true });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initTopographicMap);
    } else {
        initTopographicMap();
    }
})();
