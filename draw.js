chrome.runtime.sendMessage({from:"draw"});

var windowDiv = null;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        drawWindow(message.message);
        console.log('Drawing');
});

document.addEventListener('click', function(event) {
    var infoWindow = document.getElementById('wiki-ext');
    if(infoWindow) {
        var isClickedInside = infoWindow.contains(event.target);
        if(!isClickedInside) {
            infoWindow.parentNode.removeChild(infoWindow);
        }
    }
});

function drawWindow(innerText) {
    var infoWindow = document.createElement('div');
    infoWindow.setAttribute('id','wiki-ext');
    infoWindow.innerHTML = `
    <style>
    #wiki-container {
        all: inital;
        width: 400px;
        height: 200px;
        background-color: white;
        color: black;
        box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.75);
        overflow: scroll;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 2147483648;
        scrollbar-width: none;
        margin: 10px;
        padding: 10px;
        border-radius: 10px;
    }

    h1 {
        margin-bottom: 5px;
    }

    p {
        line-height: 1.5;
    }
    </style>

    <div id="wiki-container">
        <h1>Header</h1>
        <hr>
        <p>${innerText}</p>
    </div>
    `;

    document.body.appendChild(infoWindow);
}



