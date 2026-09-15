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
   * Handles arriving with a hash already in the URL (e.g. navigating from
   * another page via "./index.html#skills"). The browser performs its own
   * hash jump before scroll-reveal's IntersectionObserver has a chance to
   * react, so without this the target section reveals mid-scroll and the
   * animation shifts the viewport away from the anchored position.
   */
  function revealTargetFromHash() {
    const targetId = window.location.hash.slice(1);
    const targetSection = targetId && document.getElementById(targetId);

    if (
      targetSection &&
      targetSection.classList.contains("scroll-reveal") &&
      !targetSection.classList.contains("is-visible")
    ) {
      revealInstantly(targetSection);
      targetSection.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }

  if (window.location.hash) {
    revealTargetFromHash();
  }

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
