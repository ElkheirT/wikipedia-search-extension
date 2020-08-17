
async function getAPIResponse (url) {
    const response = await fetch(url)
    const jsonResponse = await response.json()
    return jsonResponse
}

function getAPIURL (parameters) {
    let url = 'https://en.wikipedia.org/w/api.php?origin=*'
    Object.keys(parameters).forEach(
        function (key) {
            url += '&' + key + '=' + parameters[key]
        })
    return url
}

function getSearchResultsData (response) {
    var pageIDs = response.query.pageids
    var pages = response.query.pages
    var searchData = {}
    for (var i = 0; i < pageIDs.length; i++) {
        searchData[i] = {
            index: pages[pageIDs[i]].index,
            title: pages[pageIDs[i]].title,
            text: pages[pageIDs[i]].extract
        }
    }
    return searchData
}

function getSearchResults (searchTerm) {
    var searchParameters = {
        action: 'query',
        redirects: '1',
        format: 'json',
        generator: 'search',
        gsrlimit: '10',
        prop: 'extracts',
        exintro: '',
        explaintext: '',
        exlimit: 'max',
        indexpageids: '',
        gsrsearch: 'intitle:'
    }
    searchParameters.gsrsearch += searchTerm
    var url = getAPIURL(searchParameters)
    alert(url)
    var response = getAPIResponse(url) 
    return response
}

export { getSearchResults, getSearchResultsData }
