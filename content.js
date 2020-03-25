const findFirstVisibleSearchInput = function (document) {
    const elements = document.getElementsByTagName('input');

    for (let i in elements) {
        if (!elements.hasOwnProperty(i)) {
            continue;
        }

        const element = elements[i];
        if (element.getAttribute('type') === 'search' && element.offsetParent !== null) {
            return element;
        }
    }

    return null;
};

const findFirstVisibleTextInput = function (document) {
    const elements = document.getElementsByTagName('input');

    for (let i in elements) {
        if (!elements.hasOwnProperty(i)) {
            continue;
        }

        const element = elements[i];
        if (element.getAttribute('type') === 'text' && element.offsetParent !== null) {
            return element;
        }
    }

    return null;
};

const findFirstVisibleInputNamedSearch = function (document) {
    const elements = document.getElementsByName('search');

    for (let i in elements) {
        if (!elements.hasOwnProperty(i)) {
            continue;
        }

        const element = elements[i];
        if (element.getAttribute('type') === 'text' && element.offsetParent !== null) {
            return element;
        }
    }

    return null;
};

const findSearchBox = function (document) {
    let element = findFirstVisibleSearchInput(document);

    if (element !== null) {
        return element;
    }

    element = findFirstVisibleInputNamedSearch(document);

    if (element !== null) {
        return element;
    }

    return findFirstVisibleTextInput(document);
};

const focusOnSearchInput = function (document) {
    const element = findSearchBox(document);

    if (element !== null) {
        element.focus();
        return false;
    }

    return true;
};

/**
 * @param {{ key: string, target: {localName} }} event
 * @returns {boolean}
 */
document.onkeypress = function (event) {
    if (event.key !== '/' || event.target.localName !== 'body') {
        return true;
    }

    return focusOnSearchInput(this);
};
