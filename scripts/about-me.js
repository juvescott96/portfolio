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

const typedPrimaryText = document.getElementById("typedPrimaryText");
const typedSecondaryText = document.getElementById("typedSecondaryText");
const typedDots = document.getElementById("typedDots");

let itemIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentItem = items[itemIndex];

    aboutIcon.src = currentItem.icon;
    aboutIcon.alt = currentItem.alt;

    const fullText = currentItem.primaryText + currentItem.secondaryText + currentItem.dots;
    const visibleText = fullText.substring(0, letterIndex);

    const primaryLength = currentItem.primaryText.length;
    const secondaryLength = currentItem.secondaryText.length;

    if (visibleText.length <= primaryLength) {
        typedPrimaryText.textContent = visibleText;
        typedSecondaryText.textContent = "";
        typedDots.textContent = "";
    } else if (visibleText.length <= primaryLength + secondaryLength) {
        typedPrimaryText.textContent = currentItem.primaryText;
        typedSecondaryText.textContent = visibleText.substring(primaryLength);
        typedDots.textContent = "";
    } else {
        typedPrimaryText.textContent = currentItem.primaryText;
        typedSecondaryText.textContent = currentItem.secondaryText;
        typedDots.textContent = visibleText.substring(primaryLength + secondaryLength);
    }

    const speed = loopTypingEffect(fullText);
    setTimeout(typeEffect, speed);
}

typeEffect();

// Rebuild the typed sentences in the newly selected language and restart the animation.
document.addEventListener("languagechange", () => {
    items = buildItems();
    letterIndex = 0;
    isDeleting = false;
});

function loopTypingEffect(fullText) {
    if (!isDeleting) {
        letterIndex++;

        if (letterIndex > fullText.length) {
            isDeleting = true;
            return 1000;
        }

        return 60;
    }

    letterIndex--;

    if (letterIndex < 0) {
        isDeleting = false;
        itemIndex = (itemIndex + 1) % items.length;
        letterIndex = 0;
        return 80;
    }

    return 30;
}
