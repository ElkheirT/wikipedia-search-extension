/*
    Communicates with the Wikipedia API
        - Returns snippet from Wikipedia page with a given title or related links

        findPage() - 
        searchWiki() - 
*/
var url = "https://en.wikipedia.org/w/api.php?origin=*"; 

// https://en.wikipedia.org/w/api.php?origin=*&action=query&generator=search&prop=extracts&gsrsearch=domain&exintro&explaintext&exlimit=10&format=json
var findPageParameters = {
    action: "query",
    indexpageids: "",
    prop: "extracts|categories",
    exintro: "",
    explaintext: "",
    redirects: "1",
    format: "json",
    titles: "",
}

var searchWikiParameters = {

}

async function getWikiResponse(url) {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    return jsonResponse;
}

function fetchArticle(pageTitle) {
    findPageParameters.titles = pageTitle;
    Object.keys(findPageParameters).forEach(function(key){url += "&" + key + "=" + findPageParameters[key];});
    var response = getWikiResponse(url);
    return response;
}

function fetchSearchResults(searchTerm) {

}

export { fetchArticle, fetchSearchResults }