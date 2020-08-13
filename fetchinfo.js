/*
    Communicates with the Wikipedia API
        - Returns snippet from Wikipedia page with a given title or related links
          if the page does not exist
*/

var url = "https://en.wikipedia.org/w/api.php?origin=*"; 

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

function fetchArticle(pageTitle) {
    params.titles = pageTitle;
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    var response = getWikiResponse(url);
    return response;
}

export { fetchArticle, extractSnippet }