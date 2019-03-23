module = {
    name: "WebBuilder",
    author: "dimden",
    desc: "The module for building websites with live editor.",
    version: '1.0.2',
    html:`
<div>
    <span id="wbe-html">&nbsp;&nbsp;HTML</span>
    <div id="webbuilder-editor-html"></div>
</div>
<div id="wbe-vertical"></div>
<div id="wbe-horizontal"></div>
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
    padding-bottom: 1px;
}

#wbe-css {
    color: dimgray;
    font-family: "Rubik", sans-serif;
    position: fixed;
    width: 50%;
    left: 50%;
    background-color: rgb(42, 41, 49);
    padding-bottom: 1px;
}

#wbe-js {
    color: dimgray;
    font-family: "Rubik", sans-serif;
    position: fixed;
    width: 50%;
    left: 0;
    top: calc(50% + 75px);
    background-color: rgb(42, 41, 49);
    padding-bottom: 1px;
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

#wbe-horizontal {
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
    position: absolute;
    width: 100%;
    height: 100%;
}

</style>
`,
    api: {},
    js: () => {
        let percentage = (n1, n2) => (n1 / n2) * 100;
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
                Codelab.dependencies.WebBuilder.api.editors = editors;
                for(let i of document.getElementsByClassName("ace-monokai")) i.style.backgroundColor = "#232328";
                for(let i of document.getElementsByClassName("ace_gutter")) i.style.background = "#2a2931";
                if(!localStorage.webbuilder) {
                    editors.html.setValue('<!doctype html>\n' +
                        '<html>\n' +
                        '   <head>\n' +
                        '       <title>Document</title>\n' +
                        '   </head>\n' +
                        '   <body>\n' +
                        '       <span>Hello </span>\n' +
                        '   </body>\n' +
                        '</html>', -1);
                    editors.css.setValue(
                        'body {\n' +
                        '   font-family: monospace;\n' +
                        '   background-color: white;\n' +
                        '}\n', -1);
                    editors.js.setValue('console.log("World!");', -1);
                } else {
                    let things = JSON.parse(localStorage.webbuilder);
                    editors.html.setValue(things.html, -1);
                    editors.css.setValue(things.css, -1);
                    editors.js.setValue(things.js, -1);
                }
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
            }, 500);
        }
        let wbe_vertical = document.getElementById('wbe-vertical');
        let vertical_int;

        wbe_vertical.addEventListener('mousedown', () => {
            vertical_int = setInterval(() => {
                wbe_vertical.style.left = `${percentage(Codelab.mouse.x, screen.availWidth)}%`;
                document.getElementById('wbe-html').style.width = `${percentage(Codelab.mouse.x, screen.availWidth)}%`;
                document.getElementById('wbe-js').style.width = `${percentage(Codelab.mouse.x, screen.availWidth)}%`;

                document.getElementById('webbuilder-editor-html').style.width = `${percentage(Codelab.mouse.x, screen.availWidth)}%`;
                document.getElementById('webbuilder-editor-js').style.width = `${percentage(Codelab.mouse.x, screen.availWidth)}%`;

                document.getElementById('wbe-css').style.left = `${percentage(Codelab.mouse.x, screen.availWidth)}%`;
                document.getElementById('wbe-css').style.width = `${100+percentage(Codelab.mouse.x, screen.availWidth)}%`;

                document.getElementById('webbuilder-editor-css').style.left = `${percentage(Codelab.mouse.x, screen.availWidth)}%`;
                document.getElementById('webbuilder-result').style.left = `${percentage(Codelab.mouse.x, screen.availWidth)}%`;
                document.getElementById('webbuilder-editor-css').style.width = `${100+percentage(Codelab.mouse.x, screen.availWidth)}%`;
                document.getElementById('webbuilder-result').style.width = `${100-percentage(Codelab.mouse.x, screen.availWidth)}%`;
            }, 1);
        });
        wbe_vertical.addEventListener('mouseup', () => {
            clearInterval(vertical_int);
            vertical_int = undefined;
        });
    },
    dependencies: [],
    focus: true,
    windowed: true,
    footer: `<button class="footer-btn" onclick="let download = (filename, text) => {let element = document.createElement('a');element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));element.setAttribute('download', filename);element.click()};download('codelab_webbuilder_out.html', document.getElementById('webbuilder-result-iframe').contentWindow.document.documentElement.innerHTML)">Download</button>
<button class="footer-btn" onclick="
let ls = JSON.stringify({
    html: Codelab.dependencies.WebBuilder.api.editors.html.getValue(),
    css: Codelab.dependencies.WebBuilder.api.editors.css.getValue(),
    js: Codelab.dependencies.WebBuilder.api.editors.js.getValue(),
});
localStorage.webbuilder = ls;
">Save</button>
<button class="footer-btn" onclick="
if(!localStorage.webbuilder) return;
let things = JSON.parse(localStorage.webbuilder);
Codelab.dependencies.WebBuilder.api.editors.html.setValue(things.html, -1);
Codelab.dependencies.WebBuilder.api.editors.css.setValue(things.css, -1);
Codelab.dependencies.WebBuilder.api.editors.js.setValue(things.js, -1);
">Load</button>
<button class="footer-btn" onclick="delete localStorage.webbuilder">Clear</button>
`
};