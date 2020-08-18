
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

function sortResults (data) {
    data.sort(function (a, b) {
        return a.index.localeCompare(b.index)
    })
    return data
}

function getSearchResultsData (response) {
    var pageIDs = response.query.pageids
    var pages = response.query.pages
    var searchData = {search: []}
    for (var i = 0; i < pageIDs.length; i++) {
        if(!pages[pageIDs[i]].hasOwnProperty('pageprops')) {
            var currentPage = {
                index: pages[pageIDs[i]].index,
                title: pages[pageIDs[i]].title,
                text: pages[pageIDs[i]].extract
            }
            searchData.search.push(currentPage)
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
        prop: 'extracts|pageprops',
        ppprop: 'disambiguation',
        exintro: '',
        explaintext: '',
        exlimit: 'max',
        indexpageids: '',
        gsrsearch: 'intitle:'
    }
    searchParameters.gsrsearch += searchTerm
    var url = getAPIURL(searchParameters)
    var response = getAPIResponse(url) 
    return response
}

export { getSearchResults, getSearchResultsData }
