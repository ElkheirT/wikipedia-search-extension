/*
    TODO: Handle edge-case when api return a disambiguation page
        - display related links in the window and allow user to view them
*/

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: "fetch"}, function(text) {
        if(!(text.msg === '')) {

        }
        else {
            displayText('Error', 'No text selected.');
        }
    });
});

function displayText(heading, text) {
    var paragraphElem = document.getElementById('main-text');
    paragraphElem.innerText = text;
    var headingElem = document.getElementById('main-heading');
    headingElem.innerText = heading;
}


