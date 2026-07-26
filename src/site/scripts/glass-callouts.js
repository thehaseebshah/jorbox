(function() {
    function initGlassCallouts() {
        const callouts = document.querySelectorAll("main.content .callout");
        if (!callouts.length) return;

        const hueMap = {
            "tip":       "168, 85, 247",
            "note":      "148, 163, 184",
            "warning":   "200, 150, 50",
            "danger":    "200, 80, 80",
            "info":      "100, 150, 220",
            "example":   "140, 120, 200",
            "quote":     "148, 163, 184",
            "success":   "60, 170, 90",
            "question":  "200, 150, 50",
            "abstract":  "100, 170, 210",
            "bug":       "200, 80, 80",
            "todo":      "100, 150, 220",
            "failure":   "200, 80, 80",
            "important": "168, 85, 247"
        };

        callouts.forEach(callout => {
            if (callout.classList.contains("glass-callout-enhanced")) return;
            callout.classList.add("glass-callout-enhanced");

            // Detect callout type
            let type = "note";
            for (const cls of callout.classList) {
                const match = cls.match(/^callout-(.+)/);
                if (match && hueMap[match[1]]) {
                    type = match[1];
                    break;
                }
            }

            const dataType = callout.getAttribute("data-callout");
            if (dataType && hueMap[dataType]) {
                type = dataType;
            }

            const hue = hueMap[type] || hueMap["note"];
            callout.style.setProperty("--callout-glow-rgb", hue);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initGlassCallouts);
    } else {
        initGlassCallouts();
    }
})();
