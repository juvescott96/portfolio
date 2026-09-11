// HTML template for the references slider cards.

/** Markup of a single reference card. */
function referenceCircleTemplate(reference) {
    return `
        <article class="references-circle">
            <div>
                <h3>${reference.name}</h3>
                <p>Project <span class="primary-color">${reference.project}</span></p>
            </div>
            <p class="learning-text">${reference.quote}</p>
            <a class="references-linkedin" href="${reference.linkedin}" target="_blank" rel="noopener">LinkedIn Profile</a>
        </article>`;
}
