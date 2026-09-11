// Language-independent project data. All visible texts come from window.i18n.
const projectMeta = [
    {
        image: "./assets/img/join.png",
        technologies: [
            "./assets/icons/javascript.png",
            "./assets/icons/css.png",
            "./assets/icons/html.png"
        ],
        liveUrl: "https://join.dustin-condello.de",
        githubUrl: "https://github.com/vassilia-g/join"
    },
    {
        image: "./assets/img/el-pollo-loco.png",
        technologies: [
            "./assets/icons/javascript.png",
            "./assets/icons/css.png",
            "./assets/icons/html.png"
        ],
        liveUrl: "https://el-pollo-loco.dustin-condello.de",
        githubUrl: "https://github.com/juvescott96/el-pollo-loco"
    },
    {
        image: "",
        comingSoon: true,
        technologies: [
            "./assets/icons/javascript.png",
            "./assets/icons/css.png",
            "./assets/icons/html.png"
        ],
        liveUrl: "#",
        githubUrl: "#"
    }
];


const technologyNames = {
    javascript: "JavaScript",
    css: "CSS",
    html: "HTML",
    angular: "Angular",
    typescript: "TypeScript",
    firebase: "Firebase",
    api: "Rest-API",
    git: "GIT",
    "material-design": "Material Design",
    scrum: "Scrum",
    react: "React",
    "vue-js": "Vue.js"
};

const mobileQuery = window.matchMedia("(max-width: 768px)");

let currentProjectIndex = 0;

function getProject(index) {
    const t = window.i18n.t;
    const meta = projectMeta[index];

    return {
        ...meta,
        title: t(`projects.tab${index + 1}`),
        duration: t(`projects.dur${index}`),
        description: t(`projects.desc${index}`),
        organization: t(`projects.org${index}`),
        teamwork: t(`projects.team${index}`),
        teamTitle: t(`projects.teamTitle${index}`)
    };
}


function projectName(title) {
    return title.replace(/^\s*\d+\.\s*/, "");
}

function technologyLabel(iconPath) {
    const key = iconPath.split("/").pop().replace(/\.png$/, "");
    return technologyNames[key] || key;
}

function desktopProjectMarkup(project, t) {
    const durationLine = project.comingSoon
        ? ""
        : `<p>${t("projects.durationLabel")} ${project.duration}</p>`;

    const extraBlocks = project.comingSoon ? "" : `
                <div class="project-info-block">
                    <img class="project-ellipse" src="./assets/icons/ellipse.png" alt="Ellipse Icon">
                    <div>
                        <h3>${t("projects.processTitle")}</h3>
                        <p>${project.organization}</p>
                    </div>
                </div>

                <div class="project-info-block">
                    <img class="project-ellipse" src="./assets/icons/ellipse.png" alt="Ellipse Icon">
                    <div>
                        <h3>${project.teamTitle}</h3>
                        <p>${project.teamwork}</p>
                    </div>
                </div>`;

    const buttons = project.comingSoon ? "" : `
                            <div class="project-buttons">
                                <button class="live-test-btn" onclick="window.open('${project.liveUrl}', '_blank')">${t("projects.liveTest")}</button>
                                <button class="github-btn" onclick="window.open('${project.githubUrl}', '_blank')">${t("projects.github")}</button>
                            </div>`;

    return `
        <div class="project-content">
            <div class="project-text">

                <div class="project-info-block">
                    <img class="project-ellipse" src="./assets/icons/ellipse.png" alt="Ellipse Icon">
                    <div>
                        <div class="project-heading-row">
                            <h3>${t("projects.aboutTitle")}</h3>
                            ${durationLine}
                        </div>
                        <p>${project.description}</p>
                    </div>
                </div>
                ${extraBlocks}
            </div>
                        <div class="project-preview">
                            <div class="project-technologies">
                                <h4>${t("projects.technologies")}</h4>
                                <div class="technology-icons">
                                    ${project.technologies.map(technology => `
                                    <img src="${technology}" alt="Technology icon">
                                    `).join("")}
                                </div>
                            </div>

                            ${project.comingSoon
            ? `<div class="project-image project-image-coming-soon">${t("projects.comingSoon")}</div>`
            : `<img class="project-image" src="${project.image}" alt="${project.title}">`}
                            ${buttons}
                        </div>
        </div>
            `;
}

function mobileInfoBlock(title, text) {
    return `
        <div class="project-info-block">
            <div class="project-info-head">
                <img class="project-ellipse" src="./assets/icons/ellipse.png" alt="">
                <h4>${title}</h4>
            </div>
            <p>${text}</p>
        </div>`;
}

function mobileProjectMarkup(project, t) {
    const technologies = project.technologies.map(technologyLabel).join(", ");
    const name = projectName(project.title);
    const image = project.comingSoon
        ? `<div class="project-image project-image-coming-soon">${t("projects.comingSoon")}</div>`
        : `<img class="project-image" src="${project.image}" alt="${name}">`;

    const durationLine = project.comingSoon
        ? ""
        : `<p class="project-meta-line">${t("projects.durationLabel")} ${project.duration}</p>`;

    const infoBlocks = project.comingSoon
        ? mobileInfoBlock(t("projects.aboutTitle"), project.description)
        : mobileInfoBlock(t("projects.aboutTitle"), project.description)
        + mobileInfoBlock(t("projects.processTitle"), project.organization)
        + mobileInfoBlock(project.teamTitle, project.teamwork);

    const buttons = project.comingSoon ? "" : `
            <div class="project-buttons">
                <button class="live-test-btn" onclick="window.open('${project.liveUrl}', '_blank')">${t("projects.liveTest")}</button>
                <button class="github-btn" onclick="window.open('${project.githubUrl}', '_blank')">${t("projects.github")}</button>
            </div>`;

    return `
        <div class="project-content project-content-mobile">
            <h3 class="project-name">${name}</h3>

            <p class="project-meta-line">${t("projects.technologies")}: ${technologies}</p>

            ${durationLine}

            ${image}

            <div class="project-text">
                ${infoBlocks}
            </div>
            ${buttons}
        </div>`;
}

function renderProject(index) {
    const t = window.i18n.t;
    const project = getProject(index);
    const isMobile = mobileQuery.matches;

    document.getElementById("projectContent").innerHTML = isMobile
        ? mobileProjectMarkup(project, t)
        : desktopProjectMarkup(project, t);

    updateActiveTab(index);
    updateTabLabels(isMobile, t);
}

const SWITCH_DURATION = 180;

function showProjects(index) {
    currentProjectIndex = index;

    const container = document.getElementById("projectContent");


    if (!container.firstElementChild) {
        renderProject(index);
        return;
    }


    container.classList.add("is-switching");

    window.setTimeout(() => {
        renderProject(index);
        requestAnimationFrame(() => container.classList.remove("is-switching"));
    }, SWITCH_DURATION);
}

function updateActiveTab(index) {
    const tabs = document.querySelectorAll(".project-tab");

    tabs.forEach((tab) => {
        tab.classList.remove("active-tab");
    });

    tabs[index].classList.add("active-tab");
}


function updateTabLabels(isMobile, t) {
    const tabs = document.querySelectorAll(".project-tab");

    tabs.forEach((tab, index) => {
        tab.textContent = isMobile
            ? `${index + 1}. ${t("projects.itemLabel")}`
            : t(`projects.tab${index + 1}`);
    });
}


document.addEventListener("languagechange", () => showProjects(currentProjectIndex));


mobileQuery.addEventListener("change", () => showProjects(currentProjectIndex));

showProjects(0);
