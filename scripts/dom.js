
/*
* Hides or shows the passed element with the fadeIn/fadeOut animations and show/hide classes
*/
function flipElementWithAnimation(element) {
    if (!element || !element instanceof HTMLElement) {
        console.error("Invalid element");
        return;
    }

    if (element.classList.contains("show")) {
        element.classList.remove("show");
        element.classList.add("hide");
    }
    else if (element.classList.contains("hide")) {
        element.classList.remove("hide");
        element.classList.add("show");
    }
    else {
        element.classList.add("show");
    }
}

function temporaryDisable(element, duration) {
    element.disabled = true;

    setTimeout(function() {
    element.disabled = false;
    }, duration);
}