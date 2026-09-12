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
    }
];

// Display names for the technology icons, keyed by icon file name.
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

/** Strips the leading "1. " numbering from a project title. */
function projectName(title) {
    return title.replace(/^\s*\d+\.\s*/, "");
}

/** Turns a technology icon path into its readable display name. */
function technologyLabel(iconPath) {
    const key = iconPath.split("/").pop().replace(/\.png$/, "");
    return technologyNames[key] || key;
}
