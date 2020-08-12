
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if(message.popupOpen) {
//         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {       
//             chrome.tabs.sendMessage(tabs[0].id, {message : "fetch"});
//         });
//     }
//     else {
//         chrome.runtime.sendMessage({
//             msg: "something_completed", 
//             data: {
//                 subject: "Loading",
//                 content: "Just completed!"
//             }
//         });
//     }
// });