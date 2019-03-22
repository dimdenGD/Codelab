module = {
    name: "WebBuilder",
    author: "dimden",
    desc: "The module for building websites with live editor.",
    version: '1.0.0',
    html:`
<div>
    <span id="wbe-html">&nbsp;&nbsp;HTML</span>
    <div id="webbuilder-editor-html"></div>
</div>
<div id="wbe-vertical"></div>
<div id="wbe-horizonal"></div>
<div>
    <span id="wbe-css">&nbsp;&nbsp;CSS</span>
    <div id="webbuilder-editor-css"></div>
</div>
<div>
    <span id="wbe-js">&nbsp;&nbsp;JS</span>
    <div id="webbuilder-editor-js"></div>
</div>
<div id="webbuilder-result"></div>
<style>

#wbe-html {
    color: dimgray;
    font-family: "Rubik", sans-serif;
    position: fixed;
    width: 50%;
    background-color: rgb(42, 41, 49);
}

#wbe-css {
    color: dimgray;
    font-family: "Rubik", sans-serif;
    position: fixed;
    width: 50%;
    left: 50%;
    background-color: rgb(42, 41, 49);
}

#wbe-js {
    color: dimgray;
    font-family: "Rubik", sans-serif;
    position: fixed;
    width: 50%;
    left: 0;
    top: calc(50% + 75px);
    background-color: rgb(42, 41, 49);
}


#wbe-vertical {
    position: fixed;
    left: 50%;
    width: 1px;
    background-color: #151515;
    height: 100%;
    cursor: ew-resize;
    z-index: 4;
}

#wbe-horizonal {
    position: fixed;
    height: 1px;
    width: 100%;
    background-color: #151515;
    top: calc(50% + 74px);
    cursor: s-resize;
    z-index: 4;
}

#webbuilder-editor-html {
    position: fixed;
    display: table;
    left: 0;
    top: 74px;
    width: 50%;
    height: 50%;
}

#webbuilder-editor-css {
    position: fixed;
    display: table;
    left: 50%;
    top: 74px;
    width: 50%;
    height: 50%;
}

#webbuilder-editor-js {
    position: fixed;
    display: table;
    left: 0;
    top: calc(50% + 94px);
    width: 50%;
    height: 50%;
}

#webbuilder-result {
    position: fixed;
    display: table;
    left: 50%;
    top: calc(74px + 50%);
    width: 50%;
    height: 50%;
}

#webbuilder-result-iframe {
    border-style: none;
    position: fixed;
    width: 100%;
    height: 100%;
}

</style>
`,
    api: {},
    js: () => {

        let script = document.createElement('script');
        script.src = `https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ace.js`;
        document.head.appendChild(script);

        script.onload = () => {
            let editors = {
                html: ace.edit("webbuilder-editor-html"),
                css: ace.edit("webbuilder-editor-css"),
                js: ace.edit('webbuilder-editor-js')
            };
            editors.html.setTheme("ace/theme/monokai");
            editors.html.setOption("showPrintMargin", false);
            editors.html.session.setMode("ace/mode/html");

            editors.css.setTheme("ace/theme/monokai");
            editors.css.setOption("showPrintMargin", false);
            editors.css.session.setMode("ace/mode/css");

            editors.js.setTheme("ace/theme/monokai");
            editors.js.setOption("showPrintMargin", false);
            editors.js.session.setMode("ace/mode/javascript");

            editors.html.textInput.getElement().addEventListener('keyup', () => {
                let res = document.getElementById('webbuilder-result');
                res.innerHTML = `<iframe id="webbuilder-result-iframe"></iframe>`;
                let iframe = document.getElementById('webbuilder-result-iframe');

                iframe.contentWindow.document.write(editors.html.getValue());
                let body = iframe.contentWindow.document.body;
                let head = iframe.contentWindow.document.head,
                    style = document.createElement('style'),
                    app = document.createElement('script');

                app.innerText = editors.js.getValue();
                head.appendChild(style);
                body.appendChild(app);

                style.type = 'text/css';
                app.type = 'application/javascript';
                if (style.styleSheet){
                    // This is required for IE8 and below.
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(iframe.contentWindow.document.createTextNode(editors.css.getValue()));
                }
            });
            editors.css.textInput.getElement().addEventListener('keyup', () => {
                let res = document.getElementById('webbuilder-result');
                res.innerHTML = `<iframe id="webbuilder-result-iframe"></iframe>`;
                let iframe = document.getElementById('webbuilder-result-iframe');

                iframe.contentWindow.document.write(editors.html.getValue());
                let body = iframe.contentWindow.document.body;
                let head = iframe.contentWindow.document.head,
                    style = document.createElement('style'),
                    app = document.createElement('script');

                app.innerText = editors.js.getValue();
                head.appendChild(style);
                body.appendChild(app);

                style.type = 'text/css';
                app.type = 'application/javascript';
                if (style.styleSheet){
                    // This is required for IE8 and below.
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(iframe.contentWindow.document.createTextNode(editors.css.getValue()));
                }
            });
            editors.js.textInput.getElement().addEventListener('keyup', () => {
                let res = document.getElementById('webbuilder-result');
                res.innerHTML = `<iframe id="webbuilder-result-iframe"></iframe>`;
                let iframe = document.getElementById('webbuilder-result-iframe');

                iframe.contentWindow.document.write(editors.html.getValue());
                let body = iframe.contentWindow.document.body;
                let head = iframe.contentWindow.document.head,
                    style = document.createElement('style'),
                    app = document.createElement('script');

                app.innerText = editors.js.getValue();
                head.appendChild(style);
                body.appendChild(app);

                style.type = 'text/css';
                app.type = 'application/javascript';
                if (style.styleSheet){
                    // This is required for IE8 and below.
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(iframe.contentWindow.document.createTextNode(editors.css.getValue()));
                }
            });

            setTimeout(() => {
                for(let i of document.getElementsByClassName("ace-monokai")) i.style.backgroundColor = "#232328";
                for(let i of document.getElementsByClassName("ace_gutter")) i.style.background = "#2a2931";
            }, 500);
        }
    },
    dependencies: [],
    focus: true,
    windowed: true
};