function findFirstVisibleInputOfType(elements, type) {
    for (let i in elements) {
        if (!elements.hasOwnProperty(i)) {
            continue;
        }

        const element = elements[i];
        if (element.getAttribute('type') === type && element.offsetParent !== null) {
            return element;
        }
    }

    return null;
}

const findFirstVisibleSearchInput = function (document) {
    return findFirstVisibleInputOfType(document.getElementsByTagName('input'), 'search');
};

const findFirstVisibleTextInput = function (document) {
    return findFirstVisibleInputOfType(document.getElementsByTagName('input'), 'text');
};

const findFirstVisibleInputNamedSearch = function (document) {
    return findFirstVisibleInputOfType(document.getElementsByName('search'), 'text');
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
        element.select();
        return false;
    }

    return true;
};

chrome.storage.sync.get({
    pageLoad: false,
    slashKey: true
}, function (items) {

    if (items.pageLoad) {
        enablePageLoad();
    }

    if (items.slashKey) {
        enableSlashKey();
    }

});

const enablePageLoad = function () {
    focusOnSearchInput(document);
};


const enableSlashKey = function () {
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
};
