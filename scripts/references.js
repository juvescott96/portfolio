// References section: renders the colleague cards and makes them draggable.
// Data lives in scripts/reference-data.js, markup in templates/reference-templates.js.

/** Marks the track as scrollable when its content overflows. */
function updateScrollable(track) {
    track.classList.toggle(
        "is-scrollable",
        track.scrollWidth > track.clientWidth + 1
    );
}

/** Renders all reference cards and enables dragging. */
function renderReferences() {
    const track = document.getElementById("referencesTrack");

    if (!track) {
        return;
    }

    track.innerHTML = references.map(referenceCircleTemplate).join("");
    updateScrollable(track);
    enableDragScroll(track);
    window.addEventListener("resize", () => updateScrollable(track));
}

renderReferences();
