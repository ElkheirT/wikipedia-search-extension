import { getSearchResults, getSearchResultsData } from './fetchInfo.js'
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: 'fetch' }, function (text) {
        getResponse(text.msg)
    })
})

var searchBtn = document.getElementById('search-btn')
var searchInput = document.getElementById('searchbar')

searchBtn.onclick = function() {
    var searchTerm = searchInput.value
    getResponse(searchTerm)
}

function getResponse(selectedtext) {
    if (!(selectedtext === '')) {
        var response = getSearchResults(selectedtext)
        handleResponse(response, selectedtext)
     }
}

function handleResponse(response, searchTerm) {
    response.then(result => {
        if(!result.ok) {
            throw new Error('Issue communicating with Wikipedia API');
        }
        return result.json()
    })
    .then(jsonData => {
        jsonData = getSearchResultsData(jsonData)
        displaySearchResults(jsonData, searchTerm)
    })
    .catch(error => {
        alert
        displayError(error)
    })
}

function displayError(error) {
    var container = document.getElementById('main-content')
    var template = `<h1>Error</h1>
                    <p>${error}</p>`
    container.innerHTML = template
}

function displaySearchResults (data, searchTerm) {
    var container = document.getElementById('main-content')
    var template = 
        `<h1>Search results for: \"${searchTerm}\"</h1>
        ${data.search.map((item) => `
        <details>
            <summary id="search-result-title">${item.title}
                <button class="articleBtn" id="${item.id}">View full article</button>
            </summary>
            <span id="search-result-text">${item.text}</span>
        </details>`).join('')}`
    container.innerHTML = template
    setButtonOnclick()
}

function setButtonOnclick() {
    var viewArticleBtns = document.getElementsByClassName("articleBtn")
    for(var i = 0; i < viewArticleBtns.length; i++) {
        let pageID = viewArticleBtns[i].id
        let wikiURL = `http://en.wikipedia.org/?curid=${pageID}`
        viewArticleBtns[i].onclick = function() { 
            chrome.tabs.create({url: wikiURL})
        }
    }
} 