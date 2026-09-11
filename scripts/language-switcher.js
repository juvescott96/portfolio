// Central i18n module: language switching for every page.
// The dictionary itself lives in scripts/translations.js.
// Default language is German ("de"); the choice is remembered in localStorage.
// Other page scripts read the current language via window.i18n.t(key) and listen
// for the "languagechange" event on document to re-render their dynamic content.

const STORAGE_KEY = "portfolioLang";
const DEFAULT_LANG = "de";

const languageLinks = document.querySelectorAll(".language-switcher a");

/** Reads the remembered language, falling back to the default. */
function readStoredLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return translations[stored] ? stored : DEFAULT_LANG;
  } catch (error) {
    return DEFAULT_LANG;
  }
}

let currentLang = readStoredLanguage();

/** Stores the chosen language, ignoring private-mode storage errors. */
function storeLanguage(language) {
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch (error) {
    // Ignore storage errors (e.g. private browsing mode).
  }
}

/** Returns the translation for a key in the current language. */
function translate(key) {
  const dictionary = translations[currentLang] || translations[DEFAULT_LANG];
  return dictionary[key] ?? translations[DEFAULT_LANG][key] ?? key;
}

/** Fills all [data-i18n] elements with plain text translations. */
function applyTextTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });
}

/** Fills all [data-i18n-html] elements with translations containing markup. */
function applyHtmlTranslations() {
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = translate(element.dataset.i18nHtml);
  });
}

/** Translates the aria-labels of all [data-i18n-aria-label] elements. */
function applyAriaTranslations() {
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", translate(element.dataset.i18nAriaLabel));
  });
}

/** Applies every kind of translation to the current page. */
function applyTranslations() {
  applyTextTranslations();
  applyHtmlTranslations();
  applyAriaTranslations();
}

/** Marks the switcher link of the active language. */
function updateSwitcherState() {
  languageLinks.forEach((languageLink) => {
    const isActive = languageLink.dataset.lang === currentLang;
    languageLink.classList.toggle("active", isActive);
    toggleCurrentAttribute(languageLink, isActive);
  });
}

/** Sets or removes aria-current on a single switcher link. */
function toggleCurrentAttribute(languageLink, isActive) {
  if (isActive) {
    languageLink.setAttribute("aria-current", "true");
    return;
  }

  languageLink.removeAttribute("aria-current");
}

/** Notifies the other page scripts that the language changed. */
function emitLanguageChange() {
  document.dispatchEvent(
    new CustomEvent("languagechange", { detail: { lang: currentLang } })
  );
}

/** Switches the whole page to the given language. */
function setLanguage(language) {
  currentLang = translations[language] ? language : DEFAULT_LANG;

  storeLanguage(currentLang);
  document.documentElement.lang = currentLang;
  updateSwitcherState();
  applyTranslations();
  emitLanguageChange();
}

/** Wires the click handlers of the language switcher links. */
function initLanguageSwitcher() {
  languageLinks.forEach((languageLink) => {
    languageLink.addEventListener("click", (event) => {
      event.preventDefault();
      setLanguage(languageLink.dataset.lang);
    });
  });
}

// Expose the current language and translator to the other page scripts.
window.i18n = {
  t: translate,
  get lang() {
    return currentLang;
  },
};

initLanguageSwitcher();
setLanguage(currentLang);
