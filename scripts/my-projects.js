// Project section: tab switching and rendering of the active project.
// Data lives in scripts/project-data.js, markup in templates/project-templates.js.

const mobileQuery = window.matchMedia("(max-width: 768px)");
const SWITCH_DURATION = 180;

let currentProjectIndex = 0;

/** Merges the static project data with the translated texts. */
function getProject(index) {
    const t = window.i18n.t;

    return {
        ...projectMeta[index],
        title: t(`projects.tab${index + 1}`),
        duration: t(`projects.dur${index}`),
        description: t(`projects.desc${index}`),
        organization: t(`projects.org${index}`),
        teamwork: t(`projects.team${index}`),
        teamTitle: t(`projects.teamTitle${index}`)
    };
}

/** Highlights the tab belonging to the visible project. */
function updateActiveTab(index) {
    const tabs = document.querySelectorAll(".project-tab");

    tabs.forEach((tab) => tab.classList.remove("active-tab"));
    tabs[index].classList.add("active-tab");
}

/** Mobile tabs show a generic label, desktop tabs the project name. */
function updateTabLabels(isMobile, t) {
    document.querySelectorAll(".project-tab").forEach((tab, index) => {
        tab.textContent = isMobile
            ? `${index + 1}. ${t("projects.itemLabel")}`
            : t(`projects.tab${index + 1}`);
    });
}

/** Writes the markup of the given project into the container. */
function renderProject(index) {
    const t = window.i18n.t;
    const project = getProject(index);
    const isMobile = mobileQuery.matches;

    document.getElementById("projectContent").innerHTML = isMobile
        ? mobileProjectTemplate(project, t)
        : desktopProjectTemplate(project, t);

    updateActiveTab(index);
    updateTabLabels(isMobile, t);
}

/** Renders a project with a short cross-fade between the old and new one. */
function switchProject(container, index) {
    container.classList.add("is-switching");

    window.setTimeout(() => {
        renderProject(index);
        requestAnimationFrame(() => container.classList.remove("is-switching"));
    }, SWITCH_DURATION);
}

/** Shows the project of the given tab index (called from the HTML tabs). */
function showProjects(index) {
    currentProjectIndex = index;

    const container = document.getElementById("projectContent");

    if (!container.firstElementChild) {
        renderProject(index);
        return;
    }

    switchProject(container, index);
}

/** Re-renders the active project on language or viewport changes. */
function initProjects() {
    document.addEventListener("languagechange", () => showProjects(currentProjectIndex));
    mobileQuery.addEventListener("change", () => showProjects(currentProjectIndex));
    showProjects(0);
}

initProjects();
