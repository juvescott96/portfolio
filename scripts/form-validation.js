// Live validation of the contact form: field states, labels and checkbox icon.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TEXT_FIELDS = ["name", "email", "message"];

const sendButton = document.getElementById("sendButton");

const checkboxIcons = {
    default: "./assets/icons/checkbox-default.svg",
    hover: "./assets/icons/checkbox-hover.svg",
    checked: "./assets/icons/checkbox-checked.svg",
    error: "./assets/icons/checkbox-error.svg",
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

const privacyLabel = document.getElementById("privacyLabel");
const privacyIcon = document.getElementById("privacyIcon");
const privacyError = document.getElementById("privacyError");

// A field is "touched" once the visitor has left or changed it.
const touched = {
    name: false,
    email: false,
    message: false,
    privacy: false,
};

/** Current label text in the active language (key mirrors window.i18n keys). */
function defaultLabel(key) {
    return window.i18n.t(`form.${key}`);
}

/** Marks every field as touched or untouched at once. */
function setAllTouched(isTouched) {
    Object.keys(touched).forEach((key) => {
        touched[key] = isTouched;
    });
}

/** Returns the trimmed values of the three text fields. */
function getFieldValues() {
    return {
        name: fields.name.value.trim(),
        email: fields.email.value.trim(),
        message: fields.message.value.trim(),
    };
}

/** Collects the error message of every field ("" means valid). */
function getErrors() {
    const values = getFieldValues();
    const t = window.i18n.t;

    return {
        name: values.name ? "" : t("form.errName"),
        email: EMAIL_PATTERN.test(values.email) ? "" : t("form.errEmail"),
        message: values.message ? "" : t("form.errMessage"),
        privacy: fields.privacy.checked ? "" : t("form.errPrivacy"),
    };
}

/** Swaps the checkbox image between default, checked and error state. */
function updatePrivacyIcon(hasError = false) {
    if (hasError) {
        privacyIcon.src = checkboxIcons.error;
        return;
    }

    privacyIcon.src = fields.privacy.checked
        ? checkboxIcons.checked
        : checkboxIcons.default;
}

/** Applies label text and valid/invalid classes to one text field. */
function applyFieldState(key, error, showOnlyTouched) {
    const shouldShow = !showOnlyTouched || touched[key];
    const hasError = Boolean(shouldShow && error);
    const isValid = Boolean(shouldShow && !error);

    labels[key].textContent = hasError ? error : defaultLabel(key);
    labels[key].classList.toggle("error", hasError);
    fields[key].classList.toggle("invalid", hasError);
    fields[key].classList.toggle("valid", isValid);
    fields[key].parentElement.classList.toggle("is-valid", isValid);
}

/** Shows or hides the privacy checkbox error. */
function applyPrivacyState(error, showOnlyTouched) {
    const shouldShow = !showOnlyTouched || touched.privacy;
    const hasError = Boolean(shouldShow && error);

    privacyError.textContent = hasError ? error : "";
    updatePrivacyIcon(hasError);
}

/** Validates the whole form and enables the send button when valid. */
function validateForm(showOnlyTouched = true) {
    const errors = getErrors();

    TEXT_FIELDS.forEach((key) => applyFieldState(key, errors[key], showOnlyTouched));
    applyPrivacyState(errors.privacy, showOnlyTouched);

    const isValid = Object.values(errors).every((error) => error === "");
    sendButton.disabled = !isValid;

    return isValid;
}
