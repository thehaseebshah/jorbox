(function () {
    const body = document.body;
    const header = document.querySelector("[data-home-header]");
    const menuButton = document.querySelector("[data-menu-toggle]");
    const menu = document.querySelector("[data-menu]");
    const formation = document.querySelector("[data-formation]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function ready() {
        requestAnimationFrame(() => body.classList.add("is-ready"));
    }

    function updateHeader() {
        if (!header) return;
        header.classList.toggle("is-scrolled", window.scrollY > 24);
    }

    function closeMenu() {
        if (!menu || !menuButton) return;
        menu.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
    }

    function initMenu() {
        if (!menu || !menuButton) return;

        menuButton.addEventListener("click", () => {
            const isOpen = menu.classList.toggle("is-open");
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
        });

        menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
        document.addEventListener("click", (event) => {
            if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
        });
        window.addEventListener("resize", () => {
            if (window.innerWidth > 900) closeMenu();
        }, { passive: true });
    }

    function initCounters() {
        const counters = Array.from(document.querySelectorAll("[data-count]"));
        if (!counters.length) return;

        function animateCounter(element) {
            const target = Number(element.dataset.count);
            if (!Number.isFinite(target) || element.dataset.animated === "true") return;
            element.dataset.animated = "true";

            if (reducedMotion.matches) {
                element.textContent = String(target);
                return;
            }

            const duration = 1300;
            const startTime = performance.now();
            element.textContent = "0";

            function step(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 4);
                element.textContent = String(Math.round(target * eased));
                if (progress < 1) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        }

        if (!("IntersectionObserver" in window)) {
            counters.forEach(animateCounter);
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.45 });

        counters.forEach((counter) => observer.observe(counter));
    }

    function initFormationParallax() {
        if (!formation || reducedMotion.matches || !window.matchMedia("(pointer: fine)").matches) return;

        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        let animating = false;

        function updatePhysics() {
            // Smooth lerp towards target (0.07 gives a silky smooth magnetic glide)
            currentX += (targetX - currentX) * 0.07;
            currentY += (targetY - currentY) * 0.07;

            formation.style.setProperty("--formation-x", `${currentX.toFixed(3)}px`);
            formation.style.setProperty("--formation-y", `${currentY.toFixed(3)}px`);

            if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
                requestAnimationFrame(updatePhysics);
            } else {
                currentX = targetX;
                currentY = targetY;
                formation.style.setProperty("--formation-x", `${currentX.toFixed(3)}px`);
                formation.style.setProperty("--formation-y", `${currentY.toFixed(3)}px`);
                animating = false;
            }
        }

        function startAnimation() {
            if (!animating) {
                animating = true;
                requestAnimationFrame(updatePhysics);
            }
        }

        window.addEventListener("pointermove", (event) => {
            const bounds = formation.getBoundingClientRect();
            const centerX = bounds.left + bounds.width / 2;
            const centerY = bounds.top + bounds.height / 2;

            const dx = event.clientX - centerX;
            const dy = event.clientY - centerY;
            const dist = Math.hypot(dx, dy);

            const magnetRadius = 450;

            if (dist < magnetRadius) {
                const pull = Math.pow(1 - dist / magnetRadius, 1.4);
                targetX = dx * pull * 0.2;
                targetY = dy * pull * 0.2;
            } else {
                targetX = 0;
                targetY = 0;
            }

            startAnimation();
        }, { passive: true });

        document.addEventListener("pointerleave", () => {
            targetX = 0;
            targetY = 0;
            startAnimation();
        });
    }

    function initSpotlights() {
        if (reducedMotion.matches || !window.matchMedia("(pointer: fine)").matches) return;

        document.querySelectorAll("[data-spotlight]").forEach((element) => {
            element.addEventListener("pointermove", (event) => {
                const bounds = element.getBoundingClientRect();
                element.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
                element.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
            }, { passive: true });
        });
    }

    function setYear() {
        const year = String(new Date().getFullYear());
        document.querySelectorAll("[data-current-year]").forEach((element) => {
            element.textContent = year;
        });
    }

    ready();
    updateHeader();
    initMenu();
    initCounters();
    initFormationParallax();
    initSpotlights();
    setYear();

    window.addEventListener("scroll", updateHeader, { passive: true });
})();
