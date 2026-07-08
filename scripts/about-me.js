const items = [
    {
        icon: "./assets/icons/location.png",
        alt: "Location icon",
        primaryText: "I am",
        secondaryText: " located in Frankfurt",
        dots: "..."
    },
    {
        icon: "./assets/icons/remote.png",
        alt: "Remote work icon",
        primaryText: "I am",
        secondaryText: " open to remote work",
        dots: "..."
    },
    {
        icon: "./assets/icons/remote.png",
        alt: "Relocation icon",
        primaryText: "I am",
        secondaryText: " open to relocate",
        dots: "..."
    }
];

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