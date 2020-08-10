chrome.contextMenus.create({
    title: "Search %s on Wikipedia", 
    contexts:["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
    chrome.tabs.executeScript(tab.id, {file: "main.js"})
});