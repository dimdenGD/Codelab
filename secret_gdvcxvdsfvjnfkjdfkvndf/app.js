
if (window.location.href.includes(`\x3f\x6b\x65\x79\x3d\x41\x46\x33\x44\x2d\x53\x41\x33\x56\x2d\x31\x31\x56\x58\x2d\x47\x43\x58\x39`)) {
    console.log(`%c>_ Codelab`, `font-style: oblique; padding: 10px; font-width: 1px; font-size: 32px; background: #222; color: #8cff76;`);
    console.log(`%cWelcome to the Codelab dev-console! Main API object: "Codelab" (window.Codelab)`, 'border-radius: 3px; padding: 10px; background: #222; color: #bada55');
    function require(module) {
      if(!Codelab.dependencies[module]) throw new Error("Cannot find module \""+module+"\"");
      if(!Codelab.dependencies[module].api) throw new Error(`"${module}" doesn't have API`);
      return Codelab.dependencies[module].api;
    }
    function toUnicode(theString) {
        var unicodeString = '';
        for (var i=0; i < theString.length; i++) {
            var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
            while (theUnicode.length < 4) {
                theUnicode = '0' + theUnicode;
            }
            theUnicode = '\\u' + theUnicode;
            unicodeString += theUnicode;
        }
        return unicodeString;
    }
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
            selectedTab: false
        },
        selectTab: tabname => {
            // for (let i of document.getElementById('tabs').children) {
            //    if(i.className === "selectedtab") {
            //        Codelab.dependencies[i.innerText.slice(0, -2)].html = document.getElementById('window').innerHTML;
            //        Codelab.windows[i.innerText.slice(0, -2)].html = document.getElementById('window').innerHTML;
            //    };
            // }
            // for (let i of document.getElementById('tabs').children) if (i.id.startsWith('tab')) i.className = "tab";
            // for (let i of document.getElementById('tabs').children) {
            //     if (i.innerText.slice(0, -2).startsWith(tabname)) {
            //         i.className = "selectedtab";
            //         let html = Codelab.dependencies[tabname].html;
            //         document.getElementById('window').innerHTML = "";
            //         document.getElementById('window').insertAdjacentHTML('beforeend', html);
            //         Codelab.utils.selectedTab = [i, Codelab.dependencies[i.innerText.slice(0, -2)]];
            //         return true;
            //     }
            // }
            // return false;
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
        createWindow(name, html, api, js, dependencies, focus) {
            if (!name || !html || !js || !dependencies) return false;
            if(typeof name !== "string" || typeof html !== "string" || typeof js !== "function" || typeof dependencies !== "object") return false;
            if(focus === undefined) focus = true;
            if (!Codelab.utils.checkDeps(dependencies)) {
                return false;
            }
            for(let i of document.getElementById('tabs').children) if(i.innerText.slice(0, -2) === name) return false;

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
                if(document.getElementById('tab-'+tabid)) {
                    tabid++;
                } else break;
            }
            document.getElementById('tabs').insertAdjacentHTML(`beforeend`, `<span id="tab-${tabid}" class="tab">${name} <button onclick="if(document.getElementById('tabs').childElementCount === 1) return; delete Codelab.windows[this.parentElement.innerText.slice(0, -2)];this.parentElement.remove();Codelab.selectTab(document.getElementById('tabs').firstChild.innerText.slice(0, -2)); document.getElementById('win-'+${tabid}).remove();" class="close-btn"> ×</button></span>`);
            document.getElementById('window').insertAdjacentHTML('beforeend', `<div style="position: absolute" id="win-${tabid}">${html}</div>`);
            document.getElementById(`tab-${tabid}`).addEventListener("click", () => {
                if (document.getElementById(`tab-${tabid}`)) Codelab.selectTab(name);
            });
            js();
            if (focus) {
                Codelab.selectTab(name);
            }
            return true;
        }
    };
    Codelab.createWindow("Welcome", `
<span style="width: 1000px; position: absolute; left: 20px; color: gray; font-family: monospace">
    <br>
    Welcome to the Codelab!
    <br>
    This project is currently in BETA, but you can try the API, create your own windows right now!
    <br>
    <br>
Created by dimden, with small help of recapitalverb.
</span>
`, {}, [], true);

    document.getElementById('terminal-btn').addEventListener('click', () => {
        Codelab.createWindow("Terminal", `<ofo></ofo>`, {
            bash: class extends EventEmitter {
                constructor(cmd) {
                    super();
                    if(!cmd) return;
                    if(typeof cmd !== "string") return;
                    stop = false;
                    let ws = new WebSocket("wss://ws.katacoda.com/socket.io/?dockerimage=ubuntu-base-image-v1&course=katacoda.com&id=bash&embedded=true&originalPathwayId=&_csrf=pwMPtRZ9-0sjxsVQAzIolkb25gtwYtd5NJt0&EIO=3&transport=websocket");
                    ws.onopen = () => {
                        setTimeout(() => {
                            ws.send(`42["data",{"host":"HOST1","data":"${cmd}"}]`);
                            ws.send(`42["data",{"host":"HOST1","data":"\\r"}]`);
                        }, 123);
                    };
                    ws.onmessage = msg => {
                        if (!msg.data.startsWith("42")) return;
                        if (!JSON.parse(msg.data.slice(2))[1]) return;
                        msg = JSON.parse(msg.data.slice(2))[1].data;

                        if (msg === "$ ") {
                            stop = true;
                            this.removeAllListeners();
                        };
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
                    term.writeln(`Remote machine closed connection. Reconnecting.`);
                    connect();
                };
                ws.onmessage = msg => {
                    // 42["data",{"host":"HOST1","data":"f"}]
                    if(!msg.data.startsWith("42")) return;
                    if(!JSON.parse(msg.data.slice(2))[1]) return;
                    msg = JSON.parse(msg.data.slice(2))[1].data;
                    term.write(msg);
                };
            }
            connect();
            term.open(document.getElementById('window').lastChild);
            function runTerminal() {
                if (term._initialized) {
                    return;
                }

                term._initialized = true;
                term.resize(Math.floor(window.screen.availWidth/8), Math.floor(window.screen.availHeight/22)+1);

                term.writeln('Welcome to Codelab terminal.');
                term.writeln('');

                term.on('key', function(key, ev) {

                    if(ev.keyCode === 13) {
                        ws.send(`42["data",{"host":"HOST1","data":"\\r"}]`)

                    } else ws.send(`42["data",{"host":"HOST1","data":"${toUnicode(key)}"}]`)
                });

                term.on('paste', function(data) {
                    term.write(data);
                    ws.send(`42["data",{"host":"HOST1","data":"${data}"}]`)
                });
            }
            runTerminal();
        }, [], true);
    })
} else {
    document.body.innerHTML = "<h2>\x34\x30\x31 \x41\x75\x74\x68\x6f\x72\x69\x7a\x61\x74\x69\x6f\x6e \x52\x65\x71\x75\x69\x72\x65\x64</h2><hr><span>\x6e\x67\x69\x6e\x78/1.12.1</span>";
    document.head.innerHTML = "";
}