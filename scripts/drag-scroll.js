// Horizontal drag-to-scroll with momentum for slider tracks (mouse only).

const MOMENTUM_STEP = 16;
const MOMENTUM_FRICTION = 0.95;
const MIN_VELOCITY = 0.05;
const CLICK_TOLERANCE = 5;

/** Largest possible scrollLeft value of a track. */
function maxScroll(track) {
    return track.scrollWidth - track.clientWidth;
}

/** Creates the mutable drag state for one track. */
function createDragState(track) {
    return {
        track,
        isDown: false,
        startX: 0,
        startScroll: 0,
        moved: 0,
        lastX: 0,
        lastTime: 0,
        velocity: 0,
        momentumId: 0
    };
}

/** Cancels a running momentum animation. */
function stopMomentum(state) {
    cancelAnimationFrame(state.momentumId);
    state.momentumId = 0;
}

/** True when the track cannot glide any further in this direction. */
function atScrollEdge(track) {
    return track.scrollLeft <= 0 || track.scrollLeft >= maxScroll(track);
}

/** Single momentum frame; keeps gliding until slow or at an edge. */
function runMomentum(state) {
    const track = state.track;

    track.scrollLeft -= state.velocity * MOMENTUM_STEP;
    state.velocity *= MOMENTUM_FRICTION;

    if (Math.abs(state.velocity) > MIN_VELOCITY && !atScrollEdge(track)) {
        state.momentumId = requestAnimationFrame(() => runMomentum(state));
        return;
    }

    state.momentumId = 0;
}

/** Remembers the start position when the drag begins. */
function onDragStart(state, event) {
    stopMomentum(state);
    state.isDown = true;
    state.moved = 0;
    state.velocity = 0;
    state.startX = event.pageX;
    state.lastX = event.pageX;
    state.lastTime = performance.now();
    state.startScroll = state.track.scrollLeft;
    state.track.classList.add("is-dragging");
    event.preventDefault();
}

/** Updates the current velocity while the pointer moves. */
function trackVelocity(state, event, now) {
    const elapsed = now - state.lastTime;

    if (elapsed > 0) {
        state.velocity = (event.pageX - state.lastX) / elapsed;
    }

    state.lastX = event.pageX;
    state.lastTime = now;
}

/** Scrolls the track along with the pointer. */
function onDragMove(state, event) {
    if (!state.isDown) {
        return;
    }

    state.moved = event.pageX - state.startX;
    state.track.scrollLeft = state.startScroll - state.moved;
    trackVelocity(state, event, performance.now());
}

/** Ends the drag and starts the momentum glide if fast enough. */
function onDragEnd(state) {
    if (!state.isDown) {
        return;
    }

    state.isDown = false;
    state.track.classList.remove("is-dragging");

    if (Math.abs(state.velocity) > MIN_VELOCITY) {
        state.momentumId = requestAnimationFrame(() => runMomentum(state));
    }
}

/** Prevents link clicks that were actually the end of a drag. */
function suppressClickAfterDrag(state, event) {
    if (Math.abs(state.moved) > CLICK_TOLERANCE) {
        event.preventDefault();
    }
}

/** Makes a track draggable with the mouse. */
function enableDragScroll(track) {
    const state = createDragState(track);

    track.addEventListener("mousedown", (event) => onDragStart(state, event));
    window.addEventListener("mousemove", (event) => onDragMove(state, event));
    window.addEventListener("mouseup", () => onDragEnd(state));
    track.addEventListener("click", (event) => suppressClickAfterDrag(state, event), true);
}
