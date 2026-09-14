// Reveals main sections with a fade-up animation as they enter the viewport.
(function () {
  const revealElements = document.querySelectorAll("main .scroll-reveal");

  if (!revealElements.length) return;

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observerInstance.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => observer.observe(element));

  /**
   * Reveals a section instantly (no transition) so its final, untransformed
   * position is already in place before the browser jumps to the anchor.
   * Without this, an anchor click computes the scroll target while the
   * section still sits at its pre-reveal transform offset, and the layout
   * shift that follows leaves the viewport misaligned.
   */
  function revealInstantly(section) {
    section.classList.add("no-reveal-transition");
    section.classList.add("is-visible");
    void section.offsetWidth;
    section.classList.remove("no-reveal-transition");
    observer.unobserve(section);
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute("href").slice(1);
    const targetSection = targetId && document.getElementById(targetId);

    if (
      targetSection &&
      targetSection.classList.contains("scroll-reveal") &&
      !targetSection.classList.contains("is-visible")
    ) {
      revealInstantly(targetSection);
    }
  });
})();
