(function() {
    function initScrollReveal() {
        // Target elements for scroll reveal
        const revealSelectors = [
            "main.content h2",
            "main.content h3",
            "main.content h4",
            "main.content p",
            "main.content ul",
            "main.content ol",
            "main.content blockquote",
            "main.content pre",
            "main.content table",
            "main.content .callout",
            "main.content img",
            "main.content .header-tags",
            "main.content .timestamps"
        ];

        const elements = document.querySelectorAll(revealSelectors.join(", "));
        if (!elements.length) return;

        // Add the hidden class to all target elements
        elements.forEach((el, i) => {
            el.classList.add("scroll-reveal");
            el.style.transitionDelay = `${Math.min(i * 0.04, 0.2)}s`;
        });

        // Intersection Observer for reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("scroll-reveal--visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: "0px 0px -60px 0px",
            threshold: 0.08
        });

        elements.forEach(el => observer.observe(el));
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initScrollReveal);
    } else {
        initScrollReveal();
    }
})();
