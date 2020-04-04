const pageLoad = document.getElementById('option-page-load');
const slashKey = document.getElementById('option-slash-key');

const saveOptions = function () {
    chrome.storage.sync.set({
        pageLoad: pageLoad.checked,
        slashKey: slashKey.checked
    });
};

slashKey.addEventListener('change', function () {
    saveOptions();
});

pageLoad.addEventListener('change', function () {
    saveOptions();
});

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get({
        pageLoad: false,
        slashKey: true
    }, function (items) {
        pageLoad.checked = items.pageLoad;
        slashKey.checked = items.slashKey;
    });
});
