(function() {
    function initGlassCallouts() {
        const callouts = document.querySelectorAll("main.content .callout");
        if (!callouts.length) return;

        const iconMap = {
            "tip":       { emoji: "💡", hue: "168, 85, 247" },
            "note":      { emoji: "📝", hue: "59, 130, 246" },
            "warning":   { emoji: "⚠️", hue: "245, 158, 11" },
            "danger":    { emoji: "🔥", hue: "239, 68, 68" },
            "info":      { emoji: "ℹ️", hue: "59, 130, 246" },
            "example":   { emoji: "📋", hue: "168, 85, 247" },
            "quote":     { emoji: "💬", hue: "148, 163, 184" },
            "success":   { emoji: "✅", hue: "34, 197, 94" },
            "question":  { emoji: "❓", hue: "245, 158, 11" },
            "abstract":  { emoji: "📄", hue: "56, 189, 248" },
            "bug":       { emoji: "🐛", hue: "239, 68, 68" },
            "todo":      { emoji: "☑️", hue: "59, 130, 246" },
            "failure":   { emoji: "❌", hue: "239, 68, 68" },
            "important": { emoji: "🔑", hue: "168, 85, 247" }
        };

        callouts.forEach(callout => {
            if (callout.classList.contains("glass-callout-enhanced")) return;
            callout.classList.add("glass-callout-enhanced");

            // Detect callout type
            let type = "note";
            for (const cls of callout.classList) {
                const match = cls.match(/^callout-(.+)/);
                if (match && iconMap[match[1]]) {
                    type = match[1];
                    break;
                }
            }

            // Also check data attribute
            const dataType = callout.getAttribute("data-callout");
            if (dataType && iconMap[dataType]) {
                type = dataType;
            }

            const config = iconMap[type] || iconMap["note"];

            // Set CSS custom properties for the glow color
            callout.style.setProperty("--callout-glow-rgb", config.hue);

            // Add pulsing icon
            const titleEl = callout.querySelector(".callout-title, .callout-title-inner");
            if (titleEl && !titleEl.querySelector(".callout-pulse-icon")) {
                const icon = document.createElement("span");
                icon.className = "callout-pulse-icon";
                icon.textContent = config.emoji;
                titleEl.insertBefore(icon, titleEl.firstChild);
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initGlassCallouts);
    } else {
        initGlassCallouts();
    }
})();
