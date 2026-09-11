// Hero typing effect: writes and deletes short "about me" sentences in a loop.

const TYPE_SPEED = 60;
const DELETE_SPEED = 30;
const PAUSE_AFTER_WORD = 1000;
const PAUSE_AFTER_ITEM = 80;

const itemMeta = [
    {
        icon: "./assets/icons/location.png",
        altKey: "about.alt0",
        primaryKey: "about.primary0",
        secondaryKey: "about.secondary0",
        dots: "..."
    },
    {
        icon: "./assets/icons/remote.png",
        altKey: "about.alt1",
        primaryKey: "about.primary1",
        secondaryKey: "about.secondary1",
        dots: "..."
    }
];

const aboutIcon = document.getElementById("aboutIcon");
const typedPrimaryText = document.getElementById("typedPrimaryText");
const typedSecondaryText = document.getElementById("typedSecondaryText");
const typedDots = document.getElementById("typedDots");

let itemIndex = 0;
let letterIndex = 0;
let isDeleting = false;

/** Builds the sentences in the currently selected language. */
function buildItems() {
    return itemMeta.map((meta) => ({
        icon: meta.icon,
        alt: window.i18n.t(meta.altKey),
        primaryText: window.i18n.t(meta.primaryKey),
        secondaryText: window.i18n.t(meta.secondaryKey),
        dots: meta.dots
    }));
}

let items = buildItems();

/** Shows the icon belonging to the current sentence. */
function updateIcon(item) {
    aboutIcon.src = item.icon;
    aboutIcon.alt = item.alt;
}

/** Splits the visible text across the three coloured spans. */
function renderTypedText(item, visibleText) {
    const primaryLength = item.primaryText.length;
    const secondaryEnd = primaryLength + item.secondaryText.length;

    typedPrimaryText.textContent = visibleText.substring(0, primaryLength);
    typedSecondaryText.textContent = visibleText.substring(primaryLength, secondaryEnd);
    typedDots.textContent = visibleText.substring(secondaryEnd);
}

/** Advances one letter forward and returns the next delay. */
function typeForward(fullText) {
    letterIndex++;

    if (letterIndex > fullText.length) {
        isDeleting = true;
        return PAUSE_AFTER_WORD;
    }

    return TYPE_SPEED;
}

/** Removes one letter and switches to the next sentence when empty. */
function typeBackward() {
    letterIndex--;

    if (letterIndex >= 0) {
        return DELETE_SPEED;
    }

    isDeleting = false;
    itemIndex = (itemIndex + 1) % items.length;
    letterIndex = 0;
    return PAUSE_AFTER_ITEM;
}

/** Moves the animation one step on and returns the next delay. */
function loopTypingEffect(fullText) {
    return isDeleting ? typeBackward() : typeForward(fullText);
}

/** Renders the current animation frame and schedules the next one. */
function typeEffect() {
    const currentItem = items[itemIndex];
    const fullText = currentItem.primaryText + currentItem.secondaryText + currentItem.dots;

    updateIcon(currentItem);
    renderTypedText(currentItem, fullText.substring(0, letterIndex));

    setTimeout(typeEffect, loopTypingEffect(fullText));
}

/** Rebuilds the sentences in the new language and restarts the animation. */
function resetTypingEffect() {
    items = buildItems();
    letterIndex = 0;
    isDeleting = false;
}

document.addEventListener("languagechange", resetTypingEffect);

typeEffect();
