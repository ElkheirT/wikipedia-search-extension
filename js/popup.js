import { getSearchResults, getSearchResultsData } from './fetchInfo.js'

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: 'fetch' }, function (text) {
        if (!(text.msg === '')) {
            getSearchResults(text.msg).then(function (result) {
                var data = getSearchResultsData(result)
                renderTemplate(data)
            })
        } else {
            displayArticleText('Error', 'No text selected.')
        }
    })
})

function displayArticleText (heading, text) {
    document.getElementById('search-results-container').style.display = 'none'
    document.getElementById('error-container').style.display = 'none'
    var paragraphElem = document.getElementById('main-text')
    paragraphElem.innerText = text
    var headingElem = document.getElementById('main-heading')
    headingElem.innerText = heading
}

function renderTemplate (data) {
    var template = Handlebars.compile(document.getElementById('template').innerHTML)
    var container = document.getElementById('container')
    container.innerHTML = template(data)
}