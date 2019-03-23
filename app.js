console.log(`%c>_ Codelab`, `font-style: oblique; padding: 10px; font-width: 1px; font-size: 32px; background: #222; color: #8cff76;`);
console.log(`%cWelcome to the Codelab dev-console! Main API object: "Codelab" (window.Codelab)`, 'border-radius: 3px; padding: 10px; background: #222; color: #bada55');
console.log('Ignore the errors.');

if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, "watch", {
        enumerable: false
        , configurable: true
        , writable: false
        , value: function (prop, handler) {
            var
                oldval = this[prop]
                , newval = oldval
                , getter = function () {
                    return newval;
                }
                , setter = function (val) {
                    oldval = newval;
                    return newval = handler.call(this, prop, oldval, val);
                }
            ;

            if (delete this[prop]) { // can't watch constants
                Object.defineProperty(this, prop, {
                    get: getter
                    , set: setter
                    , enumerable: true
                    , configurable: true
                });
            }
        }
    });
}

Codelab = {
    windows: {},
    dependencies: {},
    utils: {
        windowExists: tabName => {
            return !!Codelab.windows[tabName];
        },
        checkDeps: arr_of_deps => {
            let o = 0;
            for (let i of arr_of_deps) {
                if (Codelab.dependencies[i]) o++;
            }
            return arr_of_deps.length === o;
        },
        selectedTab: false,
        askForFile: (accept = "text/html", callback) => {
            let file = document.createElement('input');
            file.type = "file";
            file.onchange = () => {
                let reader = new FileReader();
                reader.onload = f => {
                    callback(f);
                };
                reader.readAsText(file.files[0]);
            };
            file.click();
        },
        toUnicode(theString) {
            var unicodeString = '';
            for (var i = 0; i < theString.length; i++) {
                var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
                while (theUnicode.length < 4) {
                    theUnicode = '0' + theUnicode;
                }
                theUnicode = '\\u' + theUnicode;
                unicodeString += theUnicode;
            }
            return unicodeString;
        }
    },
    console: {
        log: (title, msg) => {
            document.getElementById('console').insertAdjacentHTML('beforeend', `<div id="msg-${document.getElementById('console').childElementCount}" class="log"><h3>${title}</h3><span onclick="this.parentElement.remove();" class="console-close-btn">×</span><span>${msg}</span></div>`)
            let m = document.getElementById(`msg-${document.getElementById('console').childElementCount - 1}`);

            let b = setTimeout(() => {
                if (!m) return;
                let i = 1;
                let a = setInterval(() => {
                    if (i <= 0) {
                        clearInterval(a);
                        return m.remove();
                    }
                    ;
                    m.style.opacity = i;
                    i -= 0.1;
                }, 37)
            }, 10000);
        },
        error: (title, msg) => {
            document.getElementById('console').insertAdjacentHTML('beforeend', `<div id="msg-${document.getElementById('console').childElementCount}" class="error"><h3>${title}</h3><span onclick="this.parentElement.remove();" class="console-close-btn">×</span><span>${msg}</span></div>`)
            let m = document.getElementById(`msg-${document.getElementById('console').childElementCount - 1}`);

            let b = setTimeout(() => {
                if (!m) return;
                let i = 1;
                let a = setInterval(() => {
                    if (i <= 0) {
                        clearInterval(a);
                        return m.remove();
                    }
                    ;
                    m.style.opacity = i;
                    i -= 0.1;
                }, 37)
            }, 10000);
        },
        warn: (title, msg) => {
            document.getElementById('console').insertAdjacentHTML('beforeend', `<div id="msg-${document.getElementById('console').childElementCount}" class="warn"><h3>${title}</h3><span onclick="this.parentElement.remove();" class="console-close-btn">×</span><span>${msg}</span></div>`)
            let m = document.getElementById(`msg-${document.getElementById('console').childElementCount - 1}`);

            let b = setTimeout(() => {
                if (!m) return;
                let i = 1;
                let a = setInterval(() => {
                    if (i <= 0) {
                        clearInterval(a);
                        return m.remove();
                    }
                    ;
                    m.style.opacity = i;
                    i -= 0.1;
                }, 37)
            }, 10000);
        }
    },
    selectTab: tabname => {
        for (let i of document.getElementById('tabs').children) if (i.id.startsWith('tab')) i.className = "tab";
        for (let i of document.getElementById('window').children) i.hidden = true;
        for (let i of document.getElementById('tabs').children) {
            if (i.innerText.slice(0, -2).startsWith(tabname)) {
                i.className = "selectedtab";
                document.getElementById(`win-${i.id.slice(4)}`).hidden = false;
                Codelab.utils.selectedTab = [i, Codelab.dependencies[i.innerText.slice(0, -2)]];
                return true;
            }
        }
        return false;
    },
    getDependency: name => {
        if (Codelab.utils.windowExists(name)) return false;
        if (!name) throw new Error('No name.');
        if (typeof name !== "string") throw new Error('Argument should be a string!');
        let script = document.createElement('script');
        script.src = `./packages/${name}.js`;
        try {
            document.getElementsByTagName('head')[0].appendChild(script);
        } catch (e) {
            return false
        }
        ;
        script.onload = () => {
            script.remove();
            if (!module.windowed) {
                Codelab.dependencies[module.name] = {
                    name: module.name,
                    api: module.api,
                    html: module.html
                };
                return true;
            } else {
                Codelab.createWindow(module.name, module.html, eval(module.api), module.js, module.dependencies, module.focus, module.footer ? module.footer : null);
                return true;
            }
        };
    },
    mouse: {
        x: 0,
        y: 0
    },
    createWindow: (name, html, api = {}, js, dependencies = [], focus = true, footer_html = "") => {
        if (!name || !html || !js) return false;
        if (typeof name !== "string" || typeof html !== "string" || typeof js !== "function" || typeof dependencies !== "object") return false;
        let tn = (function () {
            for (let i of document.getElementById('tabs').children) {
                if (i.className === "selectedtab") return i;
            }
            return undefined;
        })();
        if (!Codelab.utils.checkDeps(dependencies)) {
            Codelab.console.warn('Error', `Please install dependencies first: ${dependencies.join(", ")}`)
            return false;
        }
        for (let i of document.getElementById('tabs').children) if (i.innerText.slice(0, -2) === name) return false;

        Codelab.windows[name] = {
            name: name,
            html: html
        };
        Codelab.dependencies[name] = {
            name: name,
            api: api,
            html: html
        };
        let tabid = document.getElementById('tabs').childElementCount;
        while (true) {
            if (document.getElementById('tab-' + tabid)) {
                tabid++;
            } else break;
        }
        document.getElementById('tabs').insertAdjacentHTML(`beforeend`, `<span id="tab-${tabid}" class="tab">${name} <button onclick="if(document.getElementById('tabs').childElementCount === 2) openWelcome(); delete Codelab.windows[this.parentElement.innerText.slice(0, -2)];this.parentElement.remove();Codelab.selectTab(document.getElementById('tabs').children[1].innerText.slice(0, -2)); document.getElementById('win-'+${tabid}).remove();document.getElementById('newtab').style.display = 'block';" class="close-btn"> ×</button></span>`);
        document.getElementById('window').insertAdjacentHTML('beforeend', `<div style="position: absolute" class="win" id="win-${tabid}">${html}</div>`);
        document.getElementById(`tab-${tabid}`).addEventListener("click", () => {
            if (document.getElementById(`tab-${tabid}`)) Codelab.selectTab(name);
            document.getElementById('customfooter').innerHTML = footer_html;
        });
        js();
        if (focus) {
            Codelab.selectTab(name);
            document.getElementById('customfooter').innerHTML = footer_html;
        } else {
            Codelab.selectTab(tn.innerText.slice(0, -2));
        }
        return true;
    }
};

function openWelcome() {
    Codelab.createWindow("Welcome", `<span style="width: 1000px; position: absolute; left: 20px; color: gray; font-family: monospace">
<style>
#welcome-to-codelab {
    font-family: "Rubik", sans-serif;
    font-size: 18px;
    font-weight: bold;
}

#welcome-msg {
    font-family: "Montserrat";
    font-size: 15px;
}

</style>
<div id="welcome-msg">
    <br>
    <span id="welcome-to-codelab">Welcome to the Codelab!</span>
    <br>
    <br>
    This project is currently in BETA, but you can try the API, or even create your own modules right now!
    <br>
    <br>
Created by <span style="color: #ddff89">dimden</span>, with small help of recapitalverb.
    <br>
    <br>
    <br>
    My Discord: Eff the cops#1877
</span>
</div>`, {}, () => {
    }, [], true);
}

openWelcome();

document.getElementById('terminal-btn').addEventListener('click', () => {
    Codelab.createWindow("Terminal", `<style>
#terminal-reload {
width: 50px;
height: 100%;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
#terminal-reload:hover {
width: 50px;
height: 100%;
background-color: #353535;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
</style>`, {
        bash: class extends EventEmitter {
            constructor(cmd) {
                super();
                if (!cmd) return;
                if (typeof cmd !== "string") return;
                stop = false;
                let ws = new WebSocket("wss://ws.katacoda.com/socket.io/?dockerimage=ubuntu-base-image-v1&course=katacoda.com&id=bash&embedded=true&originalPathwayId=&_csrf=pwMPtRZ9-0sjxsVQAzIolkb25gtwYtd5NJt0&EIO=3&transport=websocket");
                ws.onopen = () => {
                    setTimeout(() => {
                        ws.send(`42["data",{"host":"HOST1","data":"${cmd.replace(/\;/g, ";\\r")}"}]`);
                        ws.send(`42["data",{"host":"HOST1","data":"\\r"}]`);
                    }, 1024);
                };
                ws.onmessage = msg => {
                    if (!msg.data.startsWith("42")) return;
                    if (!JSON.parse(msg.data.slice(2))[1]) return;
                    msg = JSON.parse(msg.data.slice(2))[1].data;

                    if (msg === "$ ") {
                        stop = true;
                        this.removeAllListeners();
                    }
                    ;
                    // "data" event for new output
                    if (!stop) this.emit("data", msg);
                };
            }
        }
    }, () => {
        let term = new Terminal();
        ws = null;

        function connect() {
            ws = new WebSocket("wss://ws.katacoda.com/socket.io/?dockerimage=ubuntu-base-image-v1&course=katacoda.com&id=bash&embedded=true&originalPathwayId=&_csrf=pwMPtRZ9-0sjxsVQAzIolkb25gtwYtd5NJt0&EIO=3&transport=websocket");
            setInterval(() => {
                ws.send(2);
            }, 15000);
            ws.onclose = () => {
                term.writeln(`Remote machine closed connection.`);
                Codelab.console.error("Terminal", "Remote machine closed connection.");
                connect();
            };
            ws.onmessage = msg => {
                // 42["data",{"host":"HOST1","data":"f"}]
                if (!msg.data.startsWith("42")) return;
                if (!JSON.parse(msg.data.slice(2))[1]) return;
                msg = JSON.parse(msg.data.slice(2))[1].data;
                term.write(msg);
                if (msg === "$ " && Codelab.utils.selectedTab[1].name !== "Terminal") Codelab.console.log("Terminal", "Your operation was done!");
            };
        }

        connect();
        term.open(document.getElementById('window').lastChild);

        function runTerminal() {
            if (term._initialized) {
                return;
            }

            term._initialized = true;
            term.resize(Math.floor(window.screen.availWidth / 8), Math.floor(window.screen.availHeight / 22) + 1);

            term.writeln('Welcome to Codelab terminal.');
            term.writeln('');

            term.on('key', function (key, ev) {

                if (ev.keyCode === 13) {
                    ws.send(`42["data",{"host":"HOST1","data":"\\r"}]`)

                } else ws.send(`42["data",{"host":"HOST1","data":"${Codelab.utils.toUnicode(key)}"}]`)
            });

            term.on('paste', function (data) {
                term.write(data);
                ws.send(`42["data",{"host":"HOST1","data":"${data}"}]`)
            });
        }

        Codelab.dependencies['Terminal'].api.term = term;
        runTerminal();
    }, [], true, `<span id="terminal-reload" onclick="Codelab.dependencies.Terminal.api.term.reset();">Reload</span>`);
});
document.getElementById('newtab').addEventListener('click', () => {
    Codelab.createWindow('+', `
<style>
#module-selector-div {
    font-family: "Montserrat";
    color: dimgray;
    position: absolute;
    left: 15px;
}

#module-selector-logo {
    font-family: "Rubik", sans-serif;
    font-size: 18px;
}

#module-selector-modules {
    position: fixed;
    width: 100%;
    height: 100%;
}

.module-block {
    width: 100%;
    display: block;
    height: auto;
    border-bottom-color: #313131;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    font-family: "Montserrat";
    font-size: 15px;
    padding: 6px;
}

.module-version {
    position: absolute;
    left: 85%;
    margin-top: -3%;
}

.module-block > h3 {
    font-family: "Rubik", sans-serif !important;
}

.module-download {
    border-color: #8cff76;
    border-width: 1px;
    border-style: solid;
    border-radius: 3px;
    position: inherit;
    margin-left: 85%;
    color: #8cff76;
    background-color: rgba(0,0,0,0);
    margin-bottom: 6px;
    font-family: "Montserrat";
}

.module-download:hover {
    border-color: #8cff76;
    border-width: 1px;
    border-style: solid;
    border-radius: 3px;
    position: inherit;
    margin-left: 85%;
    color: white;
    background-color: rgba(20,80,20, 15);
    margin-bottom: 6px;
    font-family: "Montserrat";
}

#module-search {
    width: 400px;
    position: absolute;
    left: 250px;
    top: 15px;
}

</style>
<div id="module-selector-div">
        <h2 id="module-selector-logo">Modules</h2>
        <input id="module-search" placeholder="Type the name of the module here..."/>
    <hr>
    <div id="module-selector-modules"></div>
</div>`, {}, () => {
        document.getElementById('newtab').style.display = "none";
        let search = document.getElementById('module-search');
        let modules = document.getElementById('module-selector-modules');

        search.addEventListener('keyup', () => {
            if (search.value === "") {
                for (let i of modules.children) i.style.display = "block";
                return;
            }
            for (let i of modules.children) i.style.display = "block";
            for (let i of modules.children) {
                if (!i.children[0].innerText.toLowerCase().startsWith(search.value.toLowerCase())) i.style.display = "none"
            }
            ;
        });
        for (let i in Codelab.modules) {
            modules.insertAdjacentHTML('beforeend', `<div class="module-block"><h3>${i} ${!Codelab.modules[i].windowed ? " <img title=\"This module doesn't have an window interface.\"  width=\"16px\" height=\"16px\" src=\"img/nowin.png\">" : ""}</h3><span class="module-version">${Codelab.modules[i].author} ${Codelab.modules[i].version}</span><br><span>${Codelab.modules[i].desc}</span><button onclick="Codelab.utils.selectedTab[0].children[0].click();Codelab.getDependency('${i}');" class="module-download">${Codelab.modules[i].windowed ? "Open" : "Install"}</button></div>`)
        }
    }, []);
});
document.addEventListener('mousemove', e => {
    Codelab.mouse.x = e.x;
    Codelab.mouse.y = e.screenY
});
document.getElementById('docs-btn').addEventListener('click', () => {

    Codelab.createWindow("Docs", `
<style>
#docs-win {
    font-family: "Montserrat";
    color: gray;
    font-size: 15px;
    margin-left: 20px;
    position: initial;
}

.docs-run-btn {
    background-color: #282c34;
    border-style: none;
    border-radius:2px;
    color: gray;
    font-family: 'Montserrat';
    font-size: 16px;
    padding: 3px 5px 3px 3px;
}

#docs-bottom {
    position: initial;
    text-align: center;
}
</style>
<div id="docs-win">
<br>
<br>
<br>
    <h2>Welcome to Codelab. Again.</h2>
    <br>
    <span>It looks like you're interested in this project.
    The Codelab was created by me as thing that has everything for developers, and for people who want to contribute to this project with our API.
    
    If you want to create your own module, you need to understand the API first. So let's start from the overview. For this moment API looks like this:</span>
    <br>
    <br>
    <img src="img/CodelabAPI.png" style="left: 20%;position: initial;">
    <br>
    <br>
    <h3>console</h3>
    <span>The first thing is Console, so let's start from it. All methods there almost identical - log, warn, error.<br>
    So, let's call "log" method:</span>
    <pre><code class="js">Codelab.console.log('Success', "Just testing...");</code></pre>
    <button class="docs-run-btn" onclick="Codelab.console.log('Success', 'Just testing...');">Run</button>
    <br>
    <br>
    <span>The warn and error methods are identical, but just with other color, so let's move to next objects!</span>
    <br>
    <br>
    <h3>createWindow</h3>
    <span>The most complex object here - createWindow. It takes 7 arguments. This method is used to create new windows with tabs.<br><br>
    {string} First argument: name - nothing special. I think everyone know what it does.<br>
    {string} The second argument is HTML. Put all your HTML of your module there.<br>
    {object} API is third argument. Everything that you will put there will be available with Codelab.dependencies["Your module"].api.<br>
    {function} Next requires the function, it's your JS code. Your code will be executed after parsing the HTML string, so don't worry about that. You can also change the values of your api from here.<br>
    {object} Dependencies is the array of your dependencies. For example ["Terminal"]. If no dependecies leave it clear.<br>
    {bool} If focus argument be set to true, on loading your module it will be automatically opened.<br>
    {string} The last one is the footer. Just put HTML of your custom footer!</span>
    <br>
    <br>
    <span>Let's make an example window:</span>
    <pre><code class="js" id="example-create-win"></code></pre>
    <button class="docs-run-btn" id="docs-example-btn">Run</button>
    <br>
    <br>
    <span>It works!</span>
    <br>
    <h3>dependencies</h3>
    <br>
    <span>All modules that you will install will be stored here. Some of them will have the API, that you might will be using.<br>Example:</span>
    <pre><code class="js">Codelab.dependencies.Terminal.api</code></pre>
    <br>
    <br>
    <h3>getDependency</h3>
    <br>
    <span>This method was created to get some modules, dependencies, etc. Very easy to use:</span>
    <pre><code class="js">Codelab.getDependency("Terminal");</code></pre>
    <br>
    <br>
    <h3>mouse</h3>
    <br>
    <span>The mouse object has just 2 values, X of the mouse and Y. Nothing special here.</span>
    <br>
    <br>
    <h3>selectTab</h3>
    <br>
    <span>With this method you can select the tab by it's name.</span>
    <br>
    <br>
    <h2>utils</h2>
    <br>
    <span>This is the object, which includes more methods. Let's check them all!</span>
    <br>
    <br>
    <h3>askForFile(type, callback)</h3>
    <br>
    <span>This is a method that will ask the client for the file and will give you file content.<br>Example:</span>
    <br>
    <pre><code class="js">Codelab.utils.askForFile("text/plain", f => console.log(f));</code></pre>
    <button class="docs-run-btn" onclick="Codelab.utils.askForFile('text/plain', f => console.log(f))">Run</button>
    <br>
    <br>
    <h3>checkDeps(arr)</h3>
    <br>
    <span>Used for checking dependencies.</span>
    <br>
    <br>
    <h3>toUnicode(text)</h3>
    <br>
    <span>Creates unicode from text.</span>
    <br>
    <br>
    <h3>windowExists(name)</h3>
    <br>
    <span>Checks is there window or no.</span>
    <br>
    <br>
    <br>
    <br>
    <div id="docs-bottom">
        <h1><span class="logo">>_ Codelab<br></span>Created with ❤ by dimden.</h1>
        <a href="https://github.com/dimdenGD/Codelab"><img src="img/github.png" width="36px" height="auto" ></a>
    </div>
    <br>
    <br>
    <br>
    </div>
`, {}, () => {

        document.getElementById('example-create-win').innerText = `
Codelab.createWindow("Example",\`
<style>
#example-win {
    position: fixed;
    top: 65px;
}

#example-text {
    color: gray;
    font-family: Montserrat
}
</style>
<div id="example-win">
    <span id=example-text>This is an example window!</span>
</div>
\`, {}, () => {
console.log(\`Example!\`);
}, [], true, "");`;

        document.getElementById('docs-example-btn').addEventListener('click', () => {
            Codelab.createWindow("Example",
                `
<style>
#example-win {
    position: fixed;
    top: 65px;
}

#example-text {
    color: gray;
    font-family: Montserrat
}
</style>
<div id="example-win"><span id=example-text>This is an example window!</span></div>`, {}, () => {
                    console.log(`Example!`);
                }, [], true, "");
        });

        document.getElementById('window').style.position = "inherit";
        for (let i of document.getElementsByClassName('win')) i.addEventListener('click', () => document.getElementById('window').style.position = "fixed");

        document.getElementById('docs-win').parentElement.addEventListener('click', () => document.getElementById('window').style.position = "inherit");
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    }, []);
});

