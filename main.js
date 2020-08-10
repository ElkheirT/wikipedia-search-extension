var url = "https://en.wikipedia.org/w/api.php"; 

var params = {
    action: "query",
    indexpageids: "",
    prop: "extracts",
    exintro: "",
    explaintext: "",
    redirects: "1",
    format: "json",
    titles: "",
}

url = url + "?origin=*";

function getSelectedText() {
    var text = '';
    if(window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}

async function getWikiResponse(url) {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    return jsonResponse;
}

function extractSnippet(result) {
    var pageID = result.query.pageids[0];
    var snippet = result.query.pages[pageID].extract;
    return snippet;
}

function sendArticleIntro(articleIntro) {
    chrome.runtime.sendMessage({from: "main", message: articleIntro});
}

function fetchResult() {
    selectedText = getSelectedText();
    if(selectedText) {
        selectedText = selectedText.trimStart();
        selectedText = selectedText.trimEnd();
        params.titles = selectedText; // TODO: sanitize input (replace spaces with %20)
        Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
        getWikiResponse(url).then(function(result) {
            let articleIntro = extractSnippet(result);
            sendArticleIntro(articleIntro);
        });
    }
}

fetchResult();

