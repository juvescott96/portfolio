// Mobile navigation: toggles the fullscreen overlay panel from the burger button.

const menuElement = document.querySelector("menu");
const burgerToggle = document.querySelector(".burger-toggle");
const menuPanel = document.getElementById("menuPanel");
const MOBILE_BREAKPOINT = 768;

/** Aria label of the burger button, with a fallback before i18n is ready. */
function labelFor(isOpen) {
  const key = isOpen ? "a11y.closeMenu" : "a11y.openMenu";

  if (window.i18n && typeof window.i18n.t === "function") {
    return window.i18n.t(key);
  }

  return isOpen ? "Close menu" : "Open menu";
}

/** Opens or closes the overlay menu and updates the button state. */
function setMenuOpen(isOpen) {
  menuElement.classList.toggle("menu-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  burgerToggle.setAttribute("aria-expanded", String(isOpen));
  burgerToggle.dataset.i18nAriaLabel = isOpen ? "a11y.closeMenu" : "a11y.openMenu";
  burgerToggle.setAttribute("aria-label", labelFor(isOpen));
}

/** Flips the menu between open and closed. */
function toggleMenu() {
  setMenuOpen(!menuElement.classList.contains("menu-open"));
}

/** Closes the menu after a navigation click or on the desktop breakpoint. */
function initMenuAutoClose() {
  menuPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  // Leaving the mobile range should never trap the page in the open state.
  window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_BREAKPOINT) {
      setMenuOpen(false);
    }
  });
}

/** Wires the burger button, if the menu exists on this page. */
function initMobileMenu() {
  if (!menuElement || !burgerToggle || !menuPanel) {
    return;
  }

  burgerToggle.addEventListener("click", toggleMenu);
  initMenuAutoClose();
}

initMobileMenu();
