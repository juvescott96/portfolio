const languageLinks = document.querySelectorAll(".language-switcher a");

function setActiveLanguage(selectedLink) {
  languageLinks.forEach((languageLink) => {
    const isActive = languageLink === selectedLink;
    languageLink.classList.toggle("active", isActive);

    if (isActive) {
      languageLink.setAttribute("aria-current", "true");
    } else {
      languageLink.removeAttribute("aria-current");
    }
  });
}

languageLinks.forEach((languageLink) => {
  languageLink.addEventListener("click", (event) => {
    event.preventDefault();
    setActiveLanguage(languageLink);
  });
});
