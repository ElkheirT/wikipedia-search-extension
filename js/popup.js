import { getSearchResults, getSearchResultsData } from './fetchInfo.js'
import {html, render} from '../node_modules/lit-html/lit-html.js'

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
    var template = html`<h1>Error</h1>
                        <p>${error}</p>
                        `
    render(template, container)
}

function displaySearchResults (data, searchTerm) {
    var container = document.getElementById('main-content')
    var template = 
        html`<h1>Search results for: \"${searchTerm}\"</h1>
        ${data.search.map((item) => html`
        <details>
            <summary>${item.title}</summary>
            <span>${item.text}</span>
        </details>`)}`
    render(template, container)
}
