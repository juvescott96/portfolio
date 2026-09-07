
const references = [
    {
        name: "Max Mustermann",
        project: "Join",
        quote: `"Dustin is a reliable teammate with a sharp eye for detail. He keeps the code clean and always helps the team move forward."`,
        linkedin: "#"
    },
    {
        name: "Erika Musterfrau",
        project: "El Pollo Loco",
        quote: `"Great communication and a calm problem solver. Dustin turned tricky bugs into small, well-tested fixes."`,
        linkedin: "#"
    },
    {
        name: "John Doe",
        project: "Join",
        quote: `"Motivated and dependable. Dustin took ownership of his tasks and delivered them on time every sprint."`,
        linkedin: "#"
    }
];

function referenceCircleMarkup(reference) {
    return `
        <article class="references-circle">
            <div>
                <h3>${reference.name}</h3>
                <p>Project <span class="primary-color">${reference.project}</span></p>
            </div>
            <p class="learning-text">${reference.quote}</p>
            <a class="references-linkedin" href="${reference.linkedin}" target="_blank" rel="noopener">LinkedIn Profile</a>
        </article>`;
}

function updateScrollable(track) {
    track.classList.toggle(
        "is-scrollable",
        track.scrollWidth > track.clientWidth + 1
    );
}


function enableDragScroll(track) {
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let momentumId = 0;

    const maxScroll = () => track.scrollWidth - track.clientWidth;

    function stopMomentum() {
        cancelAnimationFrame(momentumId);
        momentumId = 0;
    }

    function runMomentum() {
        track.scrollLeft -= velocity * 16;
        velocity *= 0.95;

        const atEdge = track.scrollLeft <= 0 || track.scrollLeft >= maxScroll();

        if (Math.abs(velocity) > 0.05 && !atEdge) {
            momentumId = requestAnimationFrame(runMomentum);
        } else {
            momentumId = 0;
        }
    }

    track.addEventListener("mousedown", (event) => {
        isDown = true;
        moved = 0;
        velocity = 0;
        startX = event.pageX;
        lastX = event.pageX;
        lastTime = performance.now();
        startScroll = track.scrollLeft;
        stopMomentum();
        track.classList.add("is-dragging");
        event.preventDefault();
    });

    window.addEventListener("mousemove", (event) => {
        if (!isDown) {
            return;
        }

        const now = performance.now();
        const dt = now - lastTime;

        moved = event.pageX - startX;
        track.scrollLeft = startScroll - moved;

        if (dt > 0) {
            velocity = (event.pageX - lastX) / dt;
        }

        lastX = event.pageX;
        lastTime = now;
    });

    window.addEventListener("mouseup", () => {
        if (!isDown) {
            return;
        }

        isDown = false;
        track.classList.remove("is-dragging");

        if (Math.abs(velocity) > 0.05) {
            momentumId = requestAnimationFrame(runMomentum);
        }
    });


    track.addEventListener(
        "click",
        (event) => {
            if (Math.abs(moved) > 5) {
                event.preventDefault();
            }
        },
        true
    );
}

function renderReferences() {
    const track = document.getElementById("referencesTrack");

    if (!track) {
        return;
    }

    track.innerHTML = references.map(referenceCircleMarkup).join("");

    updateScrollable(track);
    enableDragScroll(track);

    window.addEventListener("resize", () => updateScrollable(track));
}

renderReferences();
