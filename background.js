chrome.contextMenus.create({
    title: "Search %s on Wikipedia", 
    contexts:["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
    chrome.tabs.executeScript(tab.id, {file: "main.js"})
});

var drawScriptID;
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.popupOpen) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {message : "fetch"});
          });
    }
    
});