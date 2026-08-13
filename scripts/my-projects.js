const projects = [
    {
        title: "1. Join",
        duration: "5 weeks",
        description: "This app was great",
        organization: "Akademie",
        teamwork: "ja ja ve ve",
        image: "./images/join.png",
        technologies: [
            "./assets/icons/javascript.png",
            "./assets/icons/css.png",
            "./assets/icons/html.png"
        ],
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        title: "2. El Pollo Loco",
        duration: "5 weeks",
        description: "This app was great",
        organization: "Akademie",
        teamwork: "juhuuu",
        image: "./images/el-pollo-loco.png",
        technologies: [
            "./assets/icons/javascript.png",
            "./assets/icons/css.png",
            "./assets/icons/html.png"
        ],
        liveUrl: "#",
        githubUrl: "#"
    }
];

function showProjects(index) {
    const project = projects[index];

    document.getElementById("projectContent").innerHTML = `

        <div class="project-content">
            <div class="project-text">

                <div class="project-info-block">
                    <img class="project-ellipse" src="./assets/icons/ellipse.png" alt="Ellipse Icon">
                    <div>
                        <div class="project-heading-row">
                            <h3>About the project</h3>
                            <p>Duration: ${project.duration}</p>
                        </div>
                        <p>${project.description}</p>
                    </div>
                </div>


                <div class="project-info-block">
                    <img class="project-ellipse" src="./assets/icons/ellipse.png" alt="Ellipse Icon">
                    <div>
                        <h3>How I have organised my work process</h3>
                        <p>${project.organization}</p>
                    </div>
                </div>

                <div class="project-info-block">
                    <img class="project-ellipse" src="./assets/icons/ellipse.png" alt="Ellipse Icon">
                    <div>
                        <h3>My group work experience</h3>
                        <p>${project.teamwork}</p>
                    </div>
                </div>
            </div>
                        <div class="project-preview">
                            <div class="project-technologies">
                                <h4>Technologies</h4>
                                <div class="technology-icons">
                                    ${project.technologies.map(technology => `
                                    <img src="${technology}" alt="Technology icon">
                                    `).join("")}
                                </div>
                            </div>

                            <img class="project-image" src="${project.image}" alt="${project.title}">

                            <div class="project-buttons">
                                <button onclick="window.open('${project.liveUrl}', '_blank')">Live Test</button>
                                <button onclick="window.open('${project.githubUrl}', '_blank')">GitHub</button>
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

showProjects(0); 