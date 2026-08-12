const projects = [
    {
        title: "1. Join",
        duration: "5 weeks",
        description: "This app was great",
        organization: "Akademie",
        teamwork: "ja ja ve ve",
        image: "./images/join.png",
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
        liveUrl: "#",
        githubUrl: "#"
    }
];

function showProjects(index) {
    const project = projects[index];

    document.getElementById("projectContent").innerHTML = `

            <div class="project-content">
                <div class="project-text">
                <h3>About the project</h3>
                <p>${project.description}</p>

                <h3>How I have organised my work process</h3>
                <p>${project.organization}</p>

                <h3>My group work experience</h3>
                <p>${project.teamwork}</p>
            </div>

            <div class="project-preview">
                <p>Duration: ${project.duration}</p>
                <img src="${project.image}" alt="${project.title}">
                <a href="${project.liveUrl}" target="_blank">Live Test</a>
                <a href="${project.githubUrl}" target="_blank">GitHub</a>
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