// HTML templates for the project section (desktop and mobile variant).
// Every function returns a markup string and must stay free of DOM access.

/** One bullet block with an ellipse icon, heading and text (desktop). */
function projectInfoBlockTemplate(title, text) {
    return `
        <div class="project-info-block">
            <img class="project-ellipse" src="./assets/icons/ellipse.svg" alt="Ellipse Icon">
            <div>
                <p class="project-title">${title}</p>
                <p>${text}</p>
            </div>
        </div>`;
}

/** Duration line of a project. */
function projectDurationTemplate(project, t) {
    return `<p>${t("projects.durationLabel")} ${project.duration}</p>`;
}

/** The "about the project" block including the duration line (desktop). */
function projectAboutBlockTemplate(project, t) {
    return `
        <div class="project-info-block">
            <img class="project-ellipse" src="./assets/icons/ellipse.svg" alt="Ellipse Icon">
            <div>
                <div class="project-heading-row">
                    <p class="project-title">${t("projects.aboutTitle")}</p>
                    ${projectDurationTemplate(project, t)}
                </div>
                <p>${project.description}</p>
            </div>
        </div>`;
}

/** Live test and GitHub buttons. */
function projectButtonsTemplate(project, t) {
    return `
        <div class="project-buttons">
            <button class="live-test-btn" onclick="window.open('${project.liveUrl}', '_blank')">${t("projects.liveTest")}</button>
            <button class="github-btn" onclick="window.open('${project.githubUrl}', '_blank')">${t("projects.github")}</button>
        </div>`;
}

/** Project image. */
function projectImageTemplate(project, altText) {
    return `<img class="project-image" src="${project.image}" alt="${altText}">`;
}

/** Technology icon row shown above the desktop project image. */
function projectTechnologiesTemplate(project, t) {
    const icons = project.technologies
        .map((technology) => `<img src="${technology}" alt="Technology icon">`)
        .join("");

    return `
        <div class="project-technologies">
            <p>${t("projects.technologies")}</p>
            <div class="technology-icons">${icons}</div>
        </div>`;
}

/** Right hand column of the desktop layout: technologies, image, buttons. */
function projectPreviewTemplate(project, t) {
    return `
        <div class="project-preview">
            ${projectTechnologiesTemplate(project, t)}
            ${projectImageTemplate(project, project.title)}
            ${projectButtonsTemplate(project, t)}
        </div>`;
}

/** Text column of the desktop layout: about, process and team blocks. */
function projectTextTemplate(project, t) {
    return `
        <div class="project-text">
            ${projectAboutBlockTemplate(project, t)}
            ${projectInfoBlockTemplate(t("projects.processTitle"), project.organization)}
            ${projectInfoBlockTemplate(project.teamTitle, project.teamwork)}
        </div>`;
}

/** Complete desktop markup of a single project. */
function desktopProjectTemplate(project, t) {
    return `
        <div class="project-content">
            ${projectTextTemplate(project, t)}
            ${projectPreviewTemplate(project, t)}
        </div>`;
}

/** One stacked info block with heading and text (mobile). */
function mobileInfoBlockTemplate(title, text) {
    return `
        <div class="project-info-block">
            <div class="project-info-head">
                <img class="project-ellipse" src="./assets/icons/ellipse.svg" alt="">
                <h4>${title}</h4>
            </div>
            <p>${text}</p>
        </div>`;
}

/** All mobile info blocks of a project. */
function mobileInfoBlocksTemplate(project, t) {
    return mobileInfoBlockTemplate(t("projects.aboutTitle"), project.description)
        + mobileInfoBlockTemplate(t("projects.processTitle"), project.organization)
        + mobileInfoBlockTemplate(project.teamTitle, project.teamwork);
}

/** Technology and duration lines above the mobile project image. */
function mobileMetaTemplate(project, t) {
    const technologies = project.technologies.map(technologyLabel).join(", ");

    return `
        <p class="project-meta-line">${t("projects.technologies")}: ${technologies}</p>
        <p class="project-meta-line">${t("projects.durationLabel")} ${project.duration}</p>`;
}

/** Complete mobile markup of a single project. */
function mobileProjectTemplate(project, t) {
    const name = projectName(project.title);

    return `
        <div class="project-content project-content-mobile">
            <h3 class="project-name">${name}</h3>
            ${mobileMetaTemplate(project, t)}
            ${projectImageTemplate(project, name)}
            <div class="project-text">${mobileInfoBlocksTemplate(project, t)}</div>
            ${projectButtonsTemplate(project, t)}
        </div>`;
}
