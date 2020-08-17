chrome.runtime.onMessage.addListener (
    function(request, sender, sendResponse) {
        if(request.message === "fetch") {
            let result = getUserInput();
            sendResponse({msg : result});
        }   
    }
);

function getUserInput() {
    var selectedText = getSelectedText();
    var cleanInput = sanitizeInput(selectedText);
    return cleanInput;
}

function getSelectedText() {
    var text = '';
    if(window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}

function sanitizeInput(selectedText) {
    selectedText = selectedText.trim();
    return selectedText;
}