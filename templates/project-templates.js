// HTML templates for the project section (desktop and mobile variant).
// Every function returns a markup string and must stay free of DOM access.

/** One bullet block with an ellipse icon, heading and text (desktop). */
function projectInfoBlockTemplate(title, text) {
    return `
        <div class="project-info-block">
            <img class="project-ellipse" src="./assets/icons/ellipse.png" alt="Ellipse Icon">
            <div>
                <h3>${title}</h3>
                <p>${text}</p>
            </div>
        </div>`;
}

/** Duration line of a project; empty for upcoming projects. */
function projectDurationTemplate(project, t) {
    if (project.comingSoon) {
        return "";
    }

    return `<p>${t("projects.durationLabel")} ${project.duration}</p>`;
}

/** The "about the project" block including the duration line (desktop). */
function projectAboutBlockTemplate(project, t) {
    return `
        <div class="project-info-block">
            <img class="project-ellipse" src="./assets/icons/ellipse.png" alt="Ellipse Icon">
            <div>
                <div class="project-heading-row">
                    <h3>${t("projects.aboutTitle")}</h3>
                    ${projectDurationTemplate(project, t)}
                </div>
                <p>${project.description}</p>
            </div>
        </div>`;
}

/** Live test and GitHub buttons; empty for upcoming projects. */
function projectButtonsTemplate(project, t) {
    if (project.comingSoon) {
        return "";
    }

    return `
        <div class="project-buttons">
            <button class="live-test-btn" onclick="window.open('${project.liveUrl}', '_blank')">${t("projects.liveTest")}</button>
            <button class="github-btn" onclick="window.open('${project.githubUrl}', '_blank')">${t("projects.github")}</button>
        </div>`;
}

/** Project image, or the "coming soon" placeholder box. */
function projectImageTemplate(project, t, altText) {
    if (project.comingSoon) {
        return `<div class="project-image project-image-coming-soon">${t("projects.comingSoon")}</div>`;
    }

    return `<img class="project-image" src="${project.image}" alt="${altText}">`;
}

/** Technology icon row shown above the desktop project image. */
function projectTechnologiesTemplate(project, t) {
    const icons = project.technologies
        .map((technology) => `<img src="${technology}" alt="Technology icon">`)
        .join("");

    return `
        <div class="project-technologies">
            <h4>${t("projects.technologies")}</h4>
            <div class="technology-icons">${icons}</div>
        </div>`;
}

/** Right hand column of the desktop layout: technologies, image, buttons. */
function projectPreviewTemplate(project, t) {
    return `
        <div class="project-preview">
            ${projectTechnologiesTemplate(project, t)}
            ${projectImageTemplate(project, t, project.title)}
            ${projectButtonsTemplate(project, t)}
        </div>`;
}

/** Text column of the desktop layout: about, process and team blocks. */
function projectTextTemplate(project, t) {
    const extraBlocks = project.comingSoon
        ? ""
        : projectInfoBlockTemplate(t("projects.processTitle"), project.organization)
        + projectInfoBlockTemplate(project.teamTitle, project.teamwork);

    return `
        <div class="project-text">
            ${projectAboutBlockTemplate(project, t)}
            ${extraBlocks}
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
                <img class="project-ellipse" src="./assets/icons/ellipse.png" alt="">
                <h4>${title}</h4>
            </div>
            <p>${text}</p>
        </div>`;
}

/** All mobile info blocks of a project, shortened for upcoming projects. */
function mobileInfoBlocksTemplate(project, t) {
    const aboutBlock = mobileInfoBlockTemplate(t("projects.aboutTitle"), project.description);

    if (project.comingSoon) {
        return aboutBlock;
    }

    return aboutBlock
        + mobileInfoBlockTemplate(t("projects.processTitle"), project.organization)
        + mobileInfoBlockTemplate(project.teamTitle, project.teamwork);
}

/** Technology and duration lines above the mobile project image. */
function mobileMetaTemplate(project, t) {
    const technologies = project.technologies.map(technologyLabel).join(", ");
    const durationLine = project.comingSoon
        ? ""
        : `<p class="project-meta-line">${t("projects.durationLabel")} ${project.duration}</p>`;

    return `
        <p class="project-meta-line">${t("projects.technologies")}: ${technologies}</p>
        ${durationLine}`;
}

/** Complete mobile markup of a single project. */
function mobileProjectTemplate(project, t) {
    const name = projectName(project.title);

    return `
        <div class="project-content project-content-mobile">
            <h3 class="project-name">${name}</h3>
            ${mobileMetaTemplate(project, t)}
            ${projectImageTemplate(project, t, name)}
            <div class="project-text">${mobileInfoBlocksTemplate(project, t)}</div>
            ${projectButtonsTemplate(project, t)}
        </div>`;
}
