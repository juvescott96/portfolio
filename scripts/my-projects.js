const projects = [
    {
        title: "1. Join",
        duration: "2 months",
        description: "Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign useres and categories.",
        organization: "Akademie",
        teamwork: "ja ja ve ve",
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
        title: "2. El Pollo Loco",
        duration: "5 weeks",
        description: "A simple Jump-and-Run game based on an object-oriented approach. Help the character to find coins and bottles to fight the enemy.",
        organization: "Akademie",
        teamwork: "juhuuu",
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
        title: "3. Ongoing Project",
        duration: "ongoing",
        description: "A new project is currently in the making. Details will follow soon.",
        organization: "Akademie",
        teamwork: "coming soon",
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

                            ${project.comingSoon
                                ? `<div class="project-image project-image-coming-soon">Coming soon..</div>`
                                : `<img class="project-image" src="${project.image}" alt="${project.title}">`}

                            <div class="project-buttons">
                                <button class="live-test-btn" onclick="window.open('${project.liveUrl}', '_blank')">Live Test</button>
                                <button class="github-btn" onclick="window.open('${project.githubUrl}', '_blank')">GitHub</button>
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