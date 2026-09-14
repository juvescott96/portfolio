// References section: renders the colleague cards and makes them draggable.
// Data lives in scripts/reference-data.js, markup in templates/reference-templates.js.
// Role/quote texts are translated via window.i18n (scripts/translations.js).

/** Marks the track as scrollable when its content overflows. */
function updateScrollable(track) {
    track.classList.toggle(
        "is-scrollable",
        track.scrollWidth > track.clientWidth + 1
    );
}

/** Resolves the translated texts for every reference. */
function getTranslatedReferences() {
    const t = window.i18n.t;

    return references.map((reference) => ({
        name: reference.name,
        role: t(`references.${reference.key}.role`),
        quote: t(`references.${reference.key}.quote`)
    }));
}

/** Fills the track with the (translated) reference cards. */
function renderReferenceCards(track) {
    track.innerHTML = getTranslatedReferences().map(referenceCircleTemplate).join("");
    updateScrollable(track);
}

/** Renders all reference cards and enables dragging. */
function renderReferences() {
    const section = document.getElementById("referencesSection");
    const track = document.getElementById("referencesTrack");

    if (!section || !track) {
        return;
    }

    section.hidden = references.length === 0;

    if (references.length === 0) {
        return;
    }

    renderReferenceCards(track);
    enableDragScroll(track);
    window.addEventListener("resize", () => updateScrollable(track));
    document.addEventListener("languagechange", () => renderReferenceCards(track));
}

renderReferences();
