module = {
    "name": "Terminal",
    "author": "dimden",
    "desc": "The Terminal API with bash.",
    "version": '1.0.4',
    "html": "<ofo></ofo>",
    "api": {
        bash: class extends EventEmitter {
            constructor(cmd) {
                super();
                if(!cmd) return;
                if(typeof cmd !== "string") return;
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
                    };
                    // "data" event for new output
                    if (!stop) this.emit("data", msg);
                };
            }
        }
    },
    "js": () => {
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
            runTerminal()},
    "dependencies": [],
    "focus": false,
    "windowed": false
};