chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: "fetch"}, function(text) {
        if(!(text.msg === '')) {
            // params.titles = text.msg; // TODO: sanitize input (replace spaces with %20)
            // Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
            // getWikiResponse(url).then(function(result) {
            //     let articleIntro = extractSnippet(result);
            //     displayArticleText(text.msg, articleIntro);
            // });
            displayArticleText('Heading','Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi reprehenderit sint dolorum qui fuga excepturi reiciendis adipisci aspernatur eveniet a dignissimos iusto deleniti aut, odio est molestias nulla porro sapiente similique quasi ut illo omnis. Quis id mollitia a? Natus cupiditate expedita quia molestias reprehenderit voluptatibus corporis consequuntur corrupti quas iusto? Aperiam, exercitationem optio hic ad beatae quaerat sit explicabo tenetur sint repellendus corrupti atque porro voluptates quas tempora aut tempore iusto vero. Officia doloremque accusantium ipsa quibusdam dolor quia, eaque itaque sequi aliquam commodi ullam nisi consequuntur sit. Iste accusamus blanditiis, esse voluptatibus omnis asperiores labore eius deleniti aut.');
        }
    });
});

function displayArticleText(heading, text) {
    var paragraphElem = document.getElementById('main-text');
    paragraphElem.innerText = text;
    var headingElem = document.getElementById('main-heading');
    headingElem.innerText = heading;
}

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

function fetchResult(selectedText) {

}