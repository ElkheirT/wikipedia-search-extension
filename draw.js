chrome.runtime.sendMessage({from:"draw"});
var scriptsLoaded = false;


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(scriptsLoaded) {
        drawWindow(message.message);
    }
});

loadRes( chrome.extension.getURL("web-components-lite.js") ) // You may/may not need webcomponents.js here
.then( loadRes( chrome.extension.getURL("InfoWindow.js") ) )
.then(function() {
    scriptsLoaded = true;
});


document.onclick = function() {
    var toRemove = document.getElementById('wiki-ext');
    if(toRemove) {
        toRemove.parentNode.removeChild(toRemove);
    }   
}

function loadRes(res) {
    return new Promise(
      function(resolve, reject) {
        var link = document.createElement('script');
        link.setAttribute('src', res);
        link.onload = function() {
          resolve(res);
        };
        document.head.appendChild(link);
    });
}


function drawWindow(innerText) {
    var infoWindow = document.createElement('info-window');
    infoWindow.setAttribute('id','wiki-ext');
    var headingElem = document.createElement('div');
    headingElem.setAttribute('slot', 'heading')
    headingElem.innerHTML = 'Heading'; // TODO: Change to actual heading from API

    var pageText = document.createElement('div');
    pageText.setAttribute('slot', 'text')
    pageText.innerHTML = innerText;
    infoWindow.appendChild(headingElem);
    infoWindow.appendChild(pageText);

    document.body.appendChild(infoWindow);
}



