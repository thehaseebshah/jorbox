(function() {
    function initGlassCallouts() {
        const callouts = document.querySelectorAll("main.content .callout");
        if (!callouts.length) return;

        const hueMap = {
            "tip":       "134, 154, 150",
            "note":      "148, 163, 184",
            "warning":   "174, 154, 112",
            "danger":    "170, 112, 112",
            "info":      "120, 145, 170",
            "example":   "145, 132, 165",
            "quote":     "148, 163, 184",
            "success":   "116, 153, 126",
            "question":  "174, 154, 112",
            "abstract":  "120, 151, 163",
            "bug":       "170, 112, 112",
            "todo":      "120, 145, 170",
            "failure":   "170, 112, 112",
            "important": "145, 132, 165"
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
            callout.style.setProperty("--callout-color", hue);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initGlassCallouts);
    } else {
        initGlassCallouts();
    }
})();
