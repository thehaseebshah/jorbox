// Add the note reference and contour motif to the editorial title.
(function() {
    function initEditorialHeading() {
        const heading = document.querySelector("main.content h1");
        if (!heading || heading.dataset.editorialHeading === "true") return;

        const title = heading.textContent.trim();
        const noteName = document.body.dataset.noteName || "";
        const lessonNumber = noteName.match(/^\d+$/)?.[0];

        heading.dataset.editorialHeading = "true";
        heading.dataset.editorialLabel = lessonNumber ? `LESSON ${lessonNumber}` : "JORBOX";
        heading.setAttribute("aria-label", title);

        const titleLayer = document.createElement("span");
        titleLayer.className = "editorial-heading-text";
        titleLayer.textContent = title;
        heading.textContent = "";
        heading.appendChild(titleLayer);

        const contourPattern = document.createElement("span");
        contourPattern.className = "h1-contour-pattern";
        contourPattern.setAttribute("aria-hidden", "true");
        heading.appendChild(contourPattern);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initEditorialHeading);
    } else {
        initEditorialHeading();
    }
})();
