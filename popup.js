// document.getElementById("set").onclick = function() {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//           chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//               alert(response.farewell);
//           });
//       });
// }



chrome.runtime.sendMessage({popupOpen: true});

chrome.runtime.onMessage.addListener (
    function(request, sender, sendResponse) {
        alert(request);
    }
);



