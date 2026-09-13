// HTML template for the references slider cards.

/** Markup of a single reference card. */
function referenceCircleTemplate(reference) {
    return `
        <article class="references-circle">
            <div>
                <p class="references-name">${reference.name}</p>
                <p>${reference.role}</p>
            </div>
            <p class="learning-text">${reference.quote}</p>
        </article>`;
}
