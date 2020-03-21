const focusOnSearchInput = function () {
    const elements = document.getElementsByTagName('input');

    for (let i in elements) {
        if (!elements.hasOwnProperty(i)) {
            continue;
        }

        let element = elements[i];
        if(element.offsetParent !== null)
        {
            element.focus();
            return false;
        }
    }

    return true;
};

document.onkeypress = function (event) {
    if (!(event.key === '/' && event.target.localName === 'body')) {
        return true;
    }

    return focusOnSearchInput();
};
