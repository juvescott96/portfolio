// Language-independent project data. All visible texts come from window.i18n.
const projectMeta = [
    {
        image: "./assets/img/join.png",
        technologies: [
            "./assets/icons/javascript.png",
            "./assets/icons/css.png",
            "./assets/icons/html.png"
        ],
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        image: "./assets/img/el-pollo-loco.png",
        technologies: [
            "./assets/icons/javascript.png",
            "./assets/icons/css.png",
            "./assets/icons/html.png"
        ],
        liveUrl: "#",
        githubUrl: "#"
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

let currentProjectIndex = 0;

function getProject(index) {
    const t = window.i18n.t;
    const meta = projectMeta[index];

    return {
        ...meta,
        title: t(`projects.tab${index + 1}`),
        duration: t(`projects.dur${index}`),
        description: t(`projects.desc${index}`),
        organization: t("projects.org"),
        teamwork: t(`projects.team${index}`)
    };
}

function showProjects(index) {
    currentProjectIndex = index;

    const t = window.i18n.t;
    const project = getProject(index);

    document.getElementById("projectContent").innerHTML = `

        <div class="project-content">
            <div class="project-text">

                <div class="project-info-block">
                    <img class="project-ellipse" src="./assets/icons/ellipse.png" alt="Ellipse Icon">
                    <div>
                        <div class="project-heading-row">
                            <h3>${t("projects.aboutTitle")}</h3>
                            <p>${t("projects.durationLabel")} ${project.duration}</p>
                        </div>
                        <p>${project.description}</p>
                    </div>
                </div>


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
                        <h3>${t("projects.teamTitle")}</h3>
                        <p>${project.teamwork}</p>
                    </div>
                </div>
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

                            <div class="project-buttons">
                                <button class="live-test-btn" onclick="window.open('${project.liveUrl}', '_blank')">${t("projects.liveTest")}</button>
                                <button class="github-btn" onclick="window.open('${project.githubUrl}', '_blank')">${t("projects.github")}</button>
                            </div>
                        </div>
        </div>
            `;

    updateActiveTab(index);
}

function updateActiveTab(index) {
    const tabs = document.querySelectorAll(".project-tab");

    tabs.forEach((tab) => {
        tab.classList.remove("active-tab");
    });

    tabs[index].classList.add("active-tab");
}

// Re-render the currently open project in the newly selected language.
document.addEventListener("languagechange", () => showProjects(currentProjectIndex));

showProjects(0);
