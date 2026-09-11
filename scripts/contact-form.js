// Contact form: event wiring and sending the message to the PHP mailer.
// The validation itself lives in scripts/form-validation.js.

const CONTACT_ENDPOINT = "./contact_form_mail.php";
const SUCCESS_TIMEOUT = 3000;

const form = document.getElementById("contactform");
const feedback = document.getElementById("formFeedback");

// Pending timers for the "sending / sent" feedback message.
let feedbackTimers = [];

/** Clears the feedback message and any timer still waiting to do so. */
function clearFeedback() {
    feedbackTimers.forEach((timer) => clearTimeout(timer));
    feedbackTimers = [];
    feedback.textContent = "";
}

/** Collects the values to send, including the honeypot field. */
function buildPayload() {
    const values = getFieldValues();

    return {
        ...values,
        website: document.getElementById("website")?.value ?? "",
    };
}

/** Posts the payload to the mailer and throws when it was rejected. */
async function sendContactRequest(payload) {
    const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.success) {
        throw new Error(result.error || "Request failed");
    }
}

/** Puts the form into the "sending" state. */
function startSending() {
    sendButton.disabled = true;
    clearFeedback();
    feedback.textContent = window.i18n.t("form.sending");
}

/** Resets the form and shows the success message for a few seconds. */
function showSuccess() {
    feedback.textContent = window.i18n.t("form.success");
    form.reset();
    setAllTouched(false);
    validateForm();

    feedbackTimers.push(setTimeout(() => {
        feedback.textContent = "";
    }, SUCCESS_TIMEOUT));
}

/** Sends the form and shows the matching feedback message. */
async function submitContactForm() {
    try {
        await sendContactRequest(buildPayload());
        showSuccess();
    } catch (error) {
        feedback.textContent = window.i18n.t("form.error");
    } finally {
        validateForm();
    }
}

/** Validates on submit and sends the form once everything is filled in. */
async function handleSubmit(event) {
    event.preventDefault();
    setAllTouched(true);

    if (!validateForm(false)) {
        return;
    }

    startSending();
    await submitContactForm();
}

/** Validates the text fields while typing and after leaving them. */
function initFieldListeners() {
    TEXT_FIELDS.forEach((key) => {
        fields[key].addEventListener("blur", () => {
            touched[key] = true;
            validateForm();
        });

        fields[key].addEventListener("input", () => validateForm());
    });
}

/** Handles checkbox changes and the hover state of its image. */
function initPrivacyListeners() {
    fields.privacy.addEventListener("change", () => {
        touched.privacy = true;
        validateForm();
    });

    privacyLabel.addEventListener("mouseenter", () => showPrivacyHoverIcon());
    privacyLabel.addEventListener("mouseleave", () => {
        updatePrivacyIcon(Boolean(privacyError.textContent));
    });
    fields.privacy.addEventListener("focus", () => showPrivacyHoverIcon());
    fields.privacy.addEventListener("blur", () => {
        updatePrivacyIcon(Boolean(privacyError.textContent));
    });
}

/** Shows the hover checkbox image while the box is unchecked and valid. */
function showPrivacyHoverIcon() {
    if (!fields.privacy.checked && !privacyError.textContent) {
        privacyIcon.src = checkboxIcons.hover;
    }
}

/** "Let's talk" buttons (why-me on desktop, skills on mobile) scroll to the form. */
function initScrollButtons() {
    const buttons = document.querySelectorAll(".btn-lets-talk button, .skills-lets-talk-btn");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        });
    });
}

/** Wires up every contact form listener. */
function initContactForm() {
    initScrollButtons();
    initFieldListeners();
    initPrivacyListeners();

    document.addEventListener("languagechange", () => {
        clearFeedback();
        validateForm();
    });

    form.addEventListener("submit", handleSubmit);
}

initContactForm();
