// HTML template for the references slider cards.

/** Markup of a single reference card. */
function referenceCircleTemplate(reference) {
    return `
        <article class="references-circle">
            <div>
                <p class="references-name">${reference.name}</p>
                <p>Project <span class="primary-color">${reference.project}</span></p>
            </div>
            <p class="learning-text">${reference.quote}</p>
            <a class="references-linkedin" href="${reference.linkedin}" target="_blank" rel="noopener">LinkedIn Profile</a>
        </article>`;
}
