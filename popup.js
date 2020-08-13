/*
    TODO: Handle edge-case when api returns a disambiguation page
        - display related links in the window and allow user to view them
*/

import { fetchArticle, fetchSearchResults } from "./fetchInfo.js"

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: "fetch"}, function(text) {
        if(!(text.msg === '')) {
            fetchArticle(text.msg).then(function(response) {
                let articleText = getSummary(response);
                let articleTitle = getTitle(response);
                if(!checkPageNotFound(response)) {
                    displayArticleText(articleTitle, articleText);
                }
                else {
                    displayArticleText(`The page "${articleTitle}" was not found`, `Search "${articleTitle}" on Wikipedia?`);
                }
            });
        }
        else {
            displayArticleText('Error', 'No text selected.');
        }
    });
});

function getSummary(response) {
    var pageID = response.query.pageids[0];
    var snippet = response.query.pages[pageID].extract;
    return snippet;
}

function getTitle(response) {
    var pageID = response.query.pageids[0];
    var title = response.query.pages[pageID].title;
    return title;
}

function checkPageNotFound(response) {
    var pageID = response.query.pageids[0];
    var category = response.query.pages[pageID].categories[0].title;
    if(category.includes('disambiguation ')) {
        return true;
    }
    return false;
}

function displayArticleText(heading, text) {
    var paragraphElem = document.getElementById('main-text');
    paragraphElem.innerText = text;
    var headingElem = document.getElementById('main-heading');
    headingElem.innerText = heading;
}


