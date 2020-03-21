document.onkeypress = function (event) {
    if (event.key === '/' && event.target.localName === 'body') {
        const elements = document.getElementsByTagName('input');

        for (let i in elements) {
            if (!elements.hasOwnProperty(i)) {
                break;
            }

            let element = elements[i];
            element.focus();

            return false;
        }
    }
};