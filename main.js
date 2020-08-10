var url = "https://en.wikipedia.org/w/api.php"; 
var testVar = '';


var params = {
    action: "query",
    list: "search",
    srsearch: "",
    format: "json"
};

url = url + "?origin=*";

function getSelectedText() {
    let text = '';
    if(window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}

async function getWikiResponse(url) {
    const response = await fetch(url);
    const responseBody = await response.json();
    console.log(responseBody);
}

function searchWikipedia() {
    selectedText = getSelectedText();
    if(selectedText) {
        selectedText = selectedText.trimStart();
        selectedText = selectedText.trimEnd();
        params.srsearch = selectedText; // TODO: sanitize input (replace spaces with %20, remove trailing spaces)
        Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
        var jsonData = getWikiResponse(url).then();
        console.log(jsonData);
    }
}

searchWikipedia();

