async function getAPIResponse (url) {
    const response = await fetch(url)
    return response
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
    if(!response.hasOwnProperty('query')) {
        throw new Error('No search results');
    }
    else {
        var pageIDs = response.query.pageids
        var pages = response.query.pages
        var searchData = {search: []}
        for (var i = 0; i < pageIDs.length; i++) {
            if(!pages[pageIDs[i]].hasOwnProperty('pageprops')) {
                var currentPage = {
                    index: pages[pageIDs[i]].index,
                    title: pages[pageIDs[i]].title,
                    text: pages[pageIDs[i]].extract.trim(),
                    id: pageIDs[i]
                }
                searchData.search.push(currentPage)
            }
        }
        searchData.search.sort(function(a, b) {
            return a.index - b.index
        })
        return searchData
    }
}

function getSearchResults (searchTerm) {
    var searchParameters = {
        action: 'query',
        redirects: '1',
        format: 'json',
        generator: 'search',
        gsrlimit: '5',
        prop: 'extracts|pageprops',
        ppprop: 'disambiguation',
        exlimit: 'max',
        exintro: '',
        explaintext: '',
        indexpageids: '',
        gsrsearch: ''
    }
    searchParameters.gsrsearch = searchTerm
    var url = getAPIURL(searchParameters)
    var response = getAPIResponse(url) 
    return response
}

export { getSearchResults, getSearchResultsData }