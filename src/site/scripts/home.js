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

        const hero = formation.closest(".home-hero");
        if (!hero) return;

        hero.addEventListener("pointermove", (event) => {
            const bounds = hero.getBoundingClientRect();
            const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 14;
            const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 14;
            formation.style.setProperty("--formation-x", `${x.toFixed(2)}px`);
            formation.style.setProperty("--formation-y", `${y.toFixed(2)}px`);
        }, { passive: true });

        hero.addEventListener("pointerleave", () => {
            formation.style.setProperty("--formation-x", "0px");
            formation.style.setProperty("--formation-y", "0px");
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
