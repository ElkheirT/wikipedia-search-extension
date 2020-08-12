const template = document.createElement('template');
template.innerHTML = `
    <style>
    #wiki-container {
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
        <h1><slot name="heading"></h1>
        <hr>
        <p><slot name="text"></p>
    </div>
`;

class InfoWindow extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('info-window', InfoWindow);