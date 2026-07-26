(function() {
    function initMacCodeBlocks() {
        const codeBlocks = document.querySelectorAll("main.content pre");
        if (!codeBlocks.length) return;

        codeBlocks.forEach(pre => {
            if (pre.classList.contains("mac-code-enhanced")) return;
            if (pre.closest(".mac-code-wrapper")) return;
            pre.classList.add("mac-code-enhanced");

            // Create wrapper
            const wrapper = document.createElement("div");
            wrapper.className = "mac-code-wrapper";

            // Detect language
            const codeEl = pre.querySelector("code");
            let lang = "";
            if (codeEl) {
                for (const cls of codeEl.classList) {
                    const match = cls.match(/^language-(.+)/);
                    if (match) {
                        lang = match[1];
                        break;
                    }
                }
            }

            // Create toolbar
            const toolbar = document.createElement("div");
            toolbar.className = "mac-code-toolbar";
            toolbar.innerHTML = `
                <div class="mac-dots">
                    <span class="mac-dot mac-dot--red"></span>
                    <span class="mac-dot mac-dot--yellow"></span>
                    <span class="mac-dot mac-dot--green"></span>
                </div>
                <span class="mac-code-lang">${lang || "code"}</span>
                <button class="mac-copy-btn" title="Copy code" aria-label="Copy code">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span class="mac-copy-text">Copy</span>
                </button>
            `;

            // Determine what to wrap: if pre is inside div.code-toolbar, wrap that instead
            const codeToolbar = pre.closest(".code-toolbar");
            const wrapTarget = codeToolbar || pre;

            // Hide any existing Prism toolbar inside
            const existingToolbar = wrapTarget.querySelector(".toolbar");
            if (existingToolbar) existingToolbar.style.display = "none";

            // Also hide any existing copy buttons
            const existingBtns = wrapTarget.querySelectorAll(".toolbar-item, .copy-to-clipboard-button, button.copy-code-button");
            existingBtns.forEach(btn => btn.style.display = "none");

            // Insert wrapper
            wrapTarget.parentNode.insertBefore(wrapper, wrapTarget);
            wrapper.appendChild(toolbar);
            wrapper.appendChild(wrapTarget);

            // Copy button logic
            const copyBtn = toolbar.querySelector(".mac-copy-btn");
            const copyText = toolbar.querySelector(".mac-copy-text");
            copyBtn.addEventListener("click", () => {
                const code = codeEl ? codeEl.innerText : pre.innerText;
                navigator.clipboard.writeText(code).then(() => {
                    copyText.textContent = "Copied!";
                    copyBtn.classList.add("copied");
                    setTimeout(() => {
                        copyText.textContent = "Copy";
                        copyBtn.classList.remove("copied");
                    }, 2000);
                }).catch(err => console.error("Copy failed", err));
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMacCodeBlocks);
    } else {
        initMacCodeBlocks();
    }
})();
