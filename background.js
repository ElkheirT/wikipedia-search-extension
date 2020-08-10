chrome.contextMenus.create({
    title: "Search %s on Wikipedia", 
    contexts:["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
    chrome.tabs.executeScript(tab.id, {file: "main.js"})
});

var drawScriptID;
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.from === "draw") {
        drawScriptID = sender.tab.id;
    }
    if (message.from === "main") {
        chrome.tabs.sendMessage(drawScriptID, message);
    }
});