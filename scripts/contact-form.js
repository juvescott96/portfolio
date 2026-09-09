const form = document.getElementById("contactform");
const sendButton = document.getElementById("sendButton");
const feedback = document.getElementById("formFeedback");

const checkboxIcons = {
    default: "./assets/icons/checkbox-default.png",
    hover: "./assets/icons/checkbox-hover.png",
    checked: "./assets/icons/checkbox-checked.png",
    error: "./assets/icons/checkbox-error.png",
};

const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    message: document.getElementById("message"),
    privacy: document.getElementById("privacy"),
};

const labels = {
    name: document.getElementById("nameLabel"),
    email: document.getElementById("emailLabel"),
    message: document.getElementById("messageLabel"),
};

// Current label text in the active language (key mirrors window.i18n keys).
function defaultLabel(key) {
    return window.i18n.t(`form.${key}`);
}

const checks = {
    name: document.getElementById("nameCheck"),
    email: document.getElementById("emailCheck"),
    message: document.getElementById("messageCheck"),
};

const privacyLabel = document.getElementById("privacyLabel");
const privacyIcon = document.getElementById("privacyIcon");
const privacyError = document.getElementById("privacyError");

const touched = {
    name: false,
    email: false,
    message: false,
    privacy: false,
};

// Pending timers for the "sending / sent" feedback message.
let feedbackTimers = [];

function clearFeedback() {
    feedbackTimers.forEach((timer) => clearTimeout(timer));
    feedbackTimers = [];
    feedback.textContent = "";
}

function getErrors() {
    const name = fields.name.value.trim();
    const email = fields.email.value.trim();
    const message = fields.message.value.trim();
    const t = window.i18n.t;

    return {
        name: name ? "" : t("form.errName"),
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            ? ""
            : t("form.errEmail"),
        message: message ? "" : t("form.errMessage"),
        privacy: fields.privacy.checked ? "" : t("form.errPrivacy"),
    };
}

function updatePrivacyIcon(hasError = false) {
    if (hasError) {
        privacyIcon.src = checkboxIcons.error;
        return;
    }

    privacyIcon.src = fields.privacy.checked
        ? checkboxIcons.checked
        : checkboxIcons.default;
}

function validateForm(showOnlyTouched = true) {
    const errors = getErrors();

    ["name", "email", "message"].forEach((key) => {
        const shouldShow = !showOnlyTouched || touched[key];
        const hasError = Boolean(shouldShow && errors[key]);
        const isValid = Boolean(shouldShow && !errors[key]);

        labels[key].textContent = hasError ? errors[key] : defaultLabel(key);
        labels[key].classList.toggle("error", hasError);

        fields[key].classList.toggle("invalid", hasError);
        fields[key].classList.toggle("valid", isValid);

        fields[key].parentElement.classList.toggle("is-valid", isValid);
    });

    const showPrivacyError = !showOnlyTouched || touched.privacy;
    const hasPrivacyError = Boolean(showPrivacyError && errors.privacy);

    privacyError.textContent = hasPrivacyError ? errors.privacy : "";
    updatePrivacyIcon(hasPrivacyError);

    const isValid = Object.values(errors).every((error) => error === "");
    sendButton.disabled = !isValid;

    return isValid;
}

["name", "email", "message"].forEach((key) => {
    fields[key].addEventListener("blur", () => {
        touched[key] = true;
        validateForm();
    });

    fields[key].addEventListener("input", () => {
        validateForm();
    });
});

fields.privacy.addEventListener("change", () => {
    touched.privacy = true;
    validateForm();
});

privacyLabel.addEventListener("mouseenter", () => {
    if (!fields.privacy.checked && !privacyError.textContent) {
        privacyIcon.src = checkboxIcons.hover;
    }
});

privacyLabel.addEventListener("mouseleave", () => {
    updatePrivacyIcon(Boolean(privacyError.textContent));
});


document.addEventListener("languagechange", () => {
    clearFeedback();
    validateForm();
});


const CONTACT_ENDPOINT = "./contact_form_mail.php";

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    Object.keys(touched).forEach((key) => {
        touched[key] = true;
    });

    if (!validateForm(false)) return;

    sendButton.disabled = true;
    clearFeedback();
    feedback.textContent = window.i18n.t("form.sending");

    const payload = {
        name: fields.name.value.trim(),
        email: fields.email.value.trim(),
        message: fields.message.value.trim(),
    };

    try {
        const response = await fetch(CONTACT_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok || !result.success) {
            throw new Error(result.error || "Request failed");
        }

        feedback.textContent = window.i18n.t("form.success");
        form.reset();

        Object.keys(touched).forEach((key) => {
            touched[key] = false;
        });

        validateForm();

        feedbackTimers.push(setTimeout(() => {
            feedback.textContent = "";
        }, 3000));
    } catch (error) {
        feedback.textContent = window.i18n.t("form.error");
    } finally {
        validateForm();
    }
});
