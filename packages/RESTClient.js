module = {
	name: "RESTClient",
	author: "recapitalverb & dimden",
	desc: "Test and debug REST APIs like a cat, not a dog. 🐈 Meow!",
	version: '1.0.0',
	html:`
<style>
    #rest-top {
        position: fixed;
        top: 55px;
        left: 0;
        width: 100%;
        height: 40px;
        background-color: white;
        color: #1f1d1f;
        font-family: Montserrat;
        z-index: 5;
    }
    
    #rest-logo {
        left: 0;
        position: absolute;
        top: 0;
        background-color: #313131;
        height: 100%;
        width: 200px;
        color: white;
        text-align: center;
    }
    
    #rest-logo > span {
        top: 25%;
        left: 25%;
        color: #b1ffb1;
        position: absolute;
        font-weight: bolder;
    }
    
    #rest-left {
        position: fixed;
        top: 79px;
        left: 0;
        width: 200px;
        height: 100%;
        background-color: #1c1c1e;
        box-shadow: -1px 0px 0px 0px #2b2b3b inset;
        font-family: Montserrat;
    }
    
    #rest-folders {
        position: relative;
        top: 60px;
        height: 100%;
    }
    
    .rest-folder {
        position: relative;
        width: 100%;
        height: 35px;
        border-bottom-width: 1px;
        border-bottom-color: #2f2f37;
        border-bottom-style: solid;
        text-align: center;
        		-webkit-touch-callout: none;
				-webkit-user-select: none;
				-khtml-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
    }
    
    .rest-type {
        position: absolute;
        left: 10px;
        top: 25%;
    }
    
    .rest-type-get {
        color: lawngreen;
    }
    
    .rest-type-post {
        color: #e786fa;
    }
    
    .rest-type-delete {
        color: red;
    }
    
    .rest-type-put, .rest-type-options, .rest-type-head, .rest-type-patch {
        color: darkorange;
    }
    
    .rest-name {
        position: absolute;
        color: gray;
        top: 25%;
    }
    
     .rest-selectedname {
        position: absolute;
        color: white;
        top: 25%;
    }
    
     .rest-selectedname:hover {
        position: absolute;
        color: #efefef;
        top: 25%;
    }
    
    .rest-name:hover {
        position: absolute;
        color: lightgray;
        top: 25%;
    }
    
    #rest-editor {
        position: fixed;
        height: 100%;
        top: 126px;
        width: 550px;
        border-right-width: 1px;
        border-right-color: #2f2f3f;
        border-right-style: solid;
        left: 200px;
    }
    
    #rest-result {
        position: fixed;
        height: 100%;
        top: 126px;
        width: 550px;
        border-right-width: 1px;
        border-right-color: #2f2f3f;
        border-right-style: solid;
        left: 750px;
    }
    
    #rest-type-tab {
        position: absolute;
        left: 208px;
        top: 25%;
    }
    
    #rest-url {
        position: absolute;
        left: 300px;
        top: 15%;
        background-color: white !important;
        color: #0f0f0f !important;
        font-size: 15px;
				-webkit-touch-callout: none;
				-webkit-user-select: none;
				-khtml-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
		width: 335px;
    }
    
    #rest-send {
        position: absolute;
        left: 680px;
        top: 0;
        height: 100%;
        background-color: white;
        border-style: none;
        border-radius: 2px;
        font-family: Montserrat;
        padding: 2px 5px 5px 5px;
        color: #0f0f0f;
        font-size: 15px;
    }
    
    #rest-send:hover {
        position: absolute;
        left: 680px;
        top: 0;
        height: 100%;
        background-color: #e7e7e7;
        border-style: none;
        border-radius: 2px;
        font-family: Montserrat;
        padding: 2px 5px 5px 5px;
        color: #0f0f0f;
        font-size: 15px;
    }
    
    #rest-vl {
        position: fixed;
        top: 0;
        height: 100%;
        left: 748px;
        width: 1px;
        border-right-width: 1px;
        border-right-style: solid;
        z-index: 5;
        border-right-color: #252525;
    }
    
    #rest-vl-top {
        position: absolute;
        top: 0;
        height: 100%;
        left: 748px;
        width: 1px;
        border-right-width: 1px;
        border-right-style: solid;
        z-index: 6;
        border-right-color: lightgray;
    }
    
    #rest-type-select {
        width: 12px;
        top: 20%;
        border-style: none;
        font-family: Montserrat;
    }
    
    #rest-add {
        top: 25px;
        position: absolute;
        left: 3px;
    }
    
    #rest-add-input {
        width: 140px;
        left: 10px;
        position: relative;
    }
    
    #rest-add-btn {
        border-style: none;
        border-radius: 2px;
        background-color: rgba(0,0,0,0);
        color: gray;
        font-family: Montserrat;
        font-size: 16px;
        font-weight: bolder;
        left: 10px;
        position: relative;
    }
    
    #rest-add-btn:hover {
        border-style: none;
        border-radius: 2px;
        background-color: rgb(49,49,49);
        color: gray;
        font-family: Montserrat;
        font-size: 16px;
        font-weight: bolder;
        left: 10px;
        position: relative;
    }
    
    #rest-status {
        padding: 2px;
        position: absolute;
        top: 25%;
        left: 810px;
        color: white;
        font-family: Montserrat;
    }
    
    #rest-options {
        position: fixed;
        left: 200px;
        top: 95px;
        width: 100%;
        height: 30px;
        background-color: #1f1f1f;
        background-color: #1f1f1f;
        border-bottom-color: gray;
        border-bottom-width: 1px;
    }
    
    .rest-opt-btn {
        color: gray;
        font-family: Montserrat;
        font-size: 16px;
        position: absolute;
        height: 100%;
        padding-top: 6px;
        padding-left: 2px;
        padding-right: 2px;
                -webkit-touch-callout: none;
				-webkit-user-select: none;
				-khtml-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
    }
    
    .rest-res-btn-selected {
        color: white;
        font-family: Montserrat;
        font-size: 16px;
        position: absolute;
        height: 100%;
        padding-top: 5px;
        padding-left: 2px;
        padding-right: 2px;
                -webkit-touch-callout: none;
				-webkit-user-select: none;
				-khtml-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
    }
    
    .rest-opt-btn-selected {
        color: white;
        font-family: Montserrat;
        font-size: 16px;
        position: absolute;
        height: 100%;
        padding-top: 5px;
        padding-left: 2px;
        padding-right: 2px;
                -webkit-touch-callout: none;
				-webkit-user-select: none;
				-khtml-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
    }
    
    .rest-opt-btn:hover {
        background-color: #313131;
        color: gray;
        font-family: Montserrat;
        font-size: 16px;
        position: absolute;
        height: 100%;
        padding-top: 6px;
        padding-left: 2px;
        padding-right: 2px;
                -webkit-touch-callout: none;
				-webkit-user-select: none;
				-khtml-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
    }
    
    #rest-opt-edit {
        left: 20px;
    }
    
    #rest-opt-auth {
        left: 70px;
    }
    
    #rest-opt-headers {
        left: 190px;
    }
    
    #rest-res-response {
        left: 560px;
    }
    
    #rest-res-headers {
        left: 645px;
    }
    
    #rest-win1-auth {
        position: fixed;
        height: 100%;
        top: 126px;
        width: 530px;
        border-right-width: 1px;
        border-right-color: #2f2f3f;
        border-right-style: solid;
        left: 200px;
        z-index: 2;
        background-color: #232328;
    }
    
    #rest-win1-headers {
        position: fixed;
        height: 100%;
        top: 126px;
        width: 550px;
        border-right-width: 1px;
        border-right-color: #2f2f3f;
        border-right-style: solid;
        left: 200px;
        z-index: 2;
        background-color: #232328;
    }
    
    #rest-win2-headers {
        position: fixed;
        height: 100%;
        top: 126px;
        width: 550px;
        border-right-width: 1px;
        border-right-color: #2f2f3f;
        border-right-style: solid;
        left: 750px;
        background-color: #232328;
    }
    
    #rest-win1-auth {
        font-family: Montserrat;
        color: gray;
        left: 220px;
    }
    
    #rest-win1-auth > select, textarea {
        background-color: #313131;
        border-style: none;
        border-radius: 2px;
        font-family: Montserrat;
        color: gray;
        max-width: 300px;
        max-height: 200px;
    }
    
    #rest-win1-headers {
        font-family: Montserrat;
        color: gray;
        left: 220px;
    }
    
    #rest-win1-headers > select, textarea {
        background-color: #313131;
        border-style: none;
        border-radius: 2px;
        font-family: Montserrat;
        color: gray;
        max-width: 300px;
        max-height: 200px;
    }
    
    #rest-out-headers {
        position: fixed;
        height: 100%;
        top: 126px;
        width: 550px;
        border-right-width: 1px;
        border-right-color: #2f2f3f;
        border-right-style: solid;
        left: 790px;
        font-family: Montserrat;
        color: gray;
    }
    
</style>
<div id="rest-win">
    <div id="rest-top">
        <div id="rest-logo">
            <span>REST Client</span>
        </div>
        <span id="rest-type-tab">
        <span id="rest-method"></span>
        <select id="rest-type-select">
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
            <option>HEAD</option>
            <option>OPTIONS</option>
            <option>PATCH</option>
        </select>
        </span>
        <input id="rest-url" placeholder="url://"/>
        <button id="rest-send">Send</button>
        <div id="rest-vl"></div>
         <div id="rest-vl-top"></div>
        <span id="rest-status"></span>
    </div>
    <div id="rest-left">
        <div id="rest-add">
            <input id="rest-add-input" maxlength="10" placeholder="Name" />
            <button id="rest-add-btn">+</button>
        </div>
        <div id="rest-folders"></div>
    </div>
    <div id="rest-options">
        <span class="rest-opt-btn" id="rest-opt-edit">Body</span>
        <span class="rest-opt-btn" id="rest-opt-auth">Authorization</span>
        <span class="rest-opt-btn" id="rest-opt-headers">Headers</span>
        <span class="rest-opt-btn" id="rest-res-response">Response</span>
        <span class="rest-opt-btn" id="rest-res-headers">Headers</span>
    </div>
    <div id="rest-win1">
        <div class="rest-win1-cl" id="rest-editor"></div>
        <div class="rest-win1-cl" id="rest-win1-auth" hidden>
        <br>
        <span>Type: </span>
        <select id="rest-auth-type">
            <option>None</option>
            <option>Basic</option>
            <option>Bearer</option>
            <option>Digest</option>
            <option>HOBA</option>
            <option>Mutual</option>
            <option>Negotiate</option>
            <option>OAuth</option>
            <option>SCRAM-SHA-1</option>
            <option>SCRAM-SHA-256</option>
            <option>vapid</option>
            <option>AWS4-HMAC-SHA256</option>
        </select>
        <br>
        <br>
        <span>Credentials:</span>
        <br>
        <textarea id="rest-auth-creds"></textarea>
        </div>
        <div class="rest-win1-cl" id="rest-win1-headers" hidden>
            <br>
            <span>Headers:</span>
            <br>
            <br>
            <textarea id="rest-headers-input"></textarea>
            <br>
            <br>
            <span>Mode: </span>
            <select id="rest-mode">
                <option>cors</option>
                <option>no-cors</option>
                <option>same-origin</option>
                <option>cors-anywhere</option>
            </select>
        </div>
    </div>
    <div id="rest-win2">
        <div class="rest-win2-cl" id="rest-result"></div>
        <div class="rest-win2-cl" id="rest-win2-headers" hidden>
            <br>
            <br>
            <span id="rest-out-headers"></span>
        </div>
    </div>
</div>
	`,
	api: {
	    tabs: {},
        changing: false,
        getSelected: () => {
            for(let i of document.getElementById('rest-folders').children) if(i.children[1].className === "rest-selectedname") return i;
            return false;
        },
        selectTab: tabname => {
            if(!tabname) return false;
            if(typeof tabname !== "string") return false;
	        if(!Codelab.dependencies.RESTClient.api.tabs[tabname]) return false;
            Codelab.dependencies.RESTClient.api.changing = true;
            for(let i of document.getElementById('rest-folders').children) i.children[1].className = "rest-name";
            let a = Codelab.dependencies.RESTClient.api.tabs[tabname];

            document.getElementById('rest-method').innerText = a.method.toUpperCase();
            document.getElementById('rest-status').style.backgroundColor = a.status[0];
            document.getElementById('rest-status').innerText = a.status[1];
            Codelab.dependencies.RESTClient.api.editors.editor.setValue(a.editor, -1);
            Codelab.dependencies.RESTClient.api.editors.output.setValue(a.output, -1);
            document.getElementById('rest-url').value = a.url;
            a.tab.children[1].className = "rest-selectedname";

            let b = a.auth.split(" ");
            document.getElementById('rest-auth-type').value = b[0] || "None";
            document.getElementById('rest-auth-creds').value = b[1] || "";
            let c = a.headers;
            document.getElementById('rest-headers-input').value = c.toString().replace('[object Object]', "");
            document.getElementById('rest-out-headers').innerText = a.outheaders;


            Codelab.dependencies.RESTClient.api.changing = false;
            return true;
        },
	    createTab: (tabname, method = "GET", editor = "", url = "", auth = "", headers = "")  => {
	        if(!tabname) return Codelab.console.error('RESTClient', 'Error, you can\'t create tabs without name!');
	        if(Codelab.dependencies.RESTClient.api.tabs[tabname]) return Codelab.console.error('RESTClient', 'Error, you can\'t create tabs with same name!');
	        if(tabname.length > 12) return Codelab.console.warn('RESTClient', `Name is too large!`);
	        if(typeof tabname !== "string") return false;

            let tabid = 0;
            while (true) {
                if (document.getElementById('rest-tab-' + tabid)) {
                    tabid++;
                } else break;
            }
            document.getElementById('rest-folders').insertAdjacentHTML('beforeend', `<div id="rest-tab-${tabid}" class="rest-folder"><span id="rest-tab-type-${tabid}" class="rest-type rest-type-get">GET</span> <span class="rest-name">${tabname}</span></div>`)
            Codelab.dependencies.RESTClient.api.tabs[tabname] = {
                name: tabname,
                method: method,
                editor: editor,
                output: "",
                tab: document.getElementById(`rest-tab-${tabid}`),
                url: url,
                status: ["white", ""],
                headers: headers,
                auth: auth,
                outheaders: ""
            };

            document.getElementById(`rest-tab-${tabid}`).children[1].addEventListener('click', () => {
                Codelab.dependencies.RESTClient.api.selectTab(document.getElementById(`rest-tab-${tabid}`).children[1].innerText);
            });

                let dbl = function(n) {
                    document.getElementById(`rest-tab-${tabid}`).children[1].addEventListener('dblclick', () => {
                        if (Codelab.dependencies.RESTClient.api.getSelected().children[1].innerText === n) {
                            let name = prompt("Rename tab:", n);
                            if(!name) return;
                            let a = Codelab.dependencies.RESTClient.api.tabs[Codelab.dependencies.RESTClient.api.getSelected().children[1].innerText];
                            a.name = name;
                            document.getElementById(`rest-tab-${tabid}`).children[1].innerText = name;
                            renameProperty(n, name, Codelab.dependencies.RESTClient.api.tabs);
                        }
                    });
                };


                document.getElementById(`rest-tab-${tabid}`).children[1].addEventListener('dblclick', () => {
                    if (Codelab.dependencies.RESTClient.api.getSelected().children[1].innerText === tabname) {
                        let name = prompt("Rename tab:", tabname);
                        if(!name) return;
                        let a = Codelab.dependencies.RESTClient.api.tabs[Codelab.dependencies.RESTClient.api.getSelected().children[1].innerText];
                        a.name = name;
                        document.getElementById(`rest-tab-${tabid}`).children[1].innerText = name;
                        renameProperty(tabname, name, Codelab.dependencies.RESTClient.api.tabs);
                        dbl(name);
                    }
                });

            Codelab.dependencies.RESTClient.api.selectTab(tabname);

            return true;
        }
    },
	js: () => {
		let script = document.createElement('script');
		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ace.js';
		document.head.appendChild(script);
		script.onload = function () {
		    Codelab.dependencies.RESTClient.api.tabs = {};
			let editor = ace.edit("rest-editor");
			editor.setTheme("ace/theme/monokai");
			editor.getSession().setMode("ace/mode/json");
			editor.setOption("showPrintMargin", false);

			let output = ace.edit("rest-result");
			output.setTheme("ace/theme/monokai");
            output.getSession().setUseWorker(false);
            editor.getSession().setUseWorker(false);
            output.getSession().setMode("ace/mode/json");
			output.setOption("showPrintMargin", false);
			output.setReadOnly(true);
            output.renderer.$cursorLayer.element.style.opacity = 0;
            Codelab.dependencies.RESTClient.api.editors = {
                editor: editor,
                output: output
            };

            editor.getSession().on('change', function() {
                if(!Codelab.dependencies.RESTClient.api.changing) Codelab.dependencies.RESTClient.api.tabs[Codelab.dependencies.RESTClient.api.getSelected().children[1].innerText].editor = editor.getValue();
            });

            document.getElementById("rest-send").addEventListener("click", function () {
				let url = document.getElementById("rest-url").value;
				if (!url) return Codelab.console.error('Input Error', 'Cannot fetch from empty URL.');
				let abc = Codelab.dependencies.RESTClient.api.tabs[Codelab.dependencies.RESTClient.api.getSelected().children[1].innerText];
				let method = abc.method;
				let init = {
				    method: method,
				};
                init.mode = document.getElementById('rest-mode').value;

				if(init.mode === "cors-anywhere") {
				    url = `https://cors-anywhere.herokuapp.com/${url}`;
                    delete init.mode;
                }

				console.log(init.mode);

                let h;

				if(abc.headers !== "") {
				    if(typeof abc.headers === "string") {
                        h = Codelab.utils.yaml2json(abc.headers);
                        h = new Headers(h);
                    }
				    else h = new Headers();
                } else h = new Headers();

				init.headers = h;

				if(abc.auth.split(" ")[0] !== "None") {
				    init.headers.set("Authorization", abc.auth);
                }

				if(method === "POST" || method === "PUT" || method === "PATCH") init.body = editor.getValue();
				if(method === "GET") {
				    let data = editor.getValue();
				    data = Codelab.utils.jsonToQueryString(data);
				    url += data;
                }
				let headers;
				fetch(url, init)
				.then(async resp => {
                    headers = Codelab.utils.headers2json(resp.headers);
                    let a = document.getElementById('rest-status');
				    a.innerText = resp.status;
				    console.log(resp);
				    a.style.backgroundColor = resp.status < 200 ? "#4286f4" : (resp.status >= 200 && resp.status < 300) ? "#4cff3f" : (resp.status >= 300 && resp.status < 400) ? "#efff3f" : "#ff3f3f";
				    return headers["content-type"] ? headers["content-type"].startsWith('application/json') ? resp.json() : resp.text() : resp.text();
				})
				.then(json => {
                    output.getSession().selection.clearSelection();
                    if(headers["content-type"]) {
                        if (headers["content-type"].startsWith('application/json')) {
                            abc.output = JSON.stringify(json, null, 2);
                            output.setValue(JSON.stringify(json, null, 2), -1);
            } else {
                            abc.output = json;
                            output.setValue(json);
                        }
                    } else {
                        abc.output = json;
                        output.setValue(json);
                    }
                    let oh = document.getElementById('rest-out-headers');
                    let ho = "";
                    for(let i in headers) {
                        ho += `${i}: ${headers[i]}\n`;
                    }
                    oh.innerText = ho;
                    abc.outheaders = ho;
				})
				.catch(e => {output.setValue(JSON.stringify({Error: e.name, Message: e.message}, null, 3))})
			});
			setTimeout(() => {
				for(let i of document.getElementsByClassName("ace-monokai")) i.style.backgroundColor = "#232328";
				for(let i of document.getElementsByClassName("ace_gutter")) i.style.background = "#2a2931";
                Codelab.dependencies.RESTClient.api.createTab('Unnamed');
                document.getElementById('rest-url').addEventListener('keyup', () => {
                    Codelab.dependencies.RESTClient.api.tabs[Codelab.dependencies.RESTClient.api.getSelected().children[1].innerText].url = document.getElementById('rest-url').value;
                });
                document.getElementById('rest-type-select').addEventListener('change', e => {
                    let a = document.getElementById('rest-type-select');
                    let b = Codelab.dependencies.RESTClient.api.tabs[Codelab.dependencies.RESTClient.api.getSelected().children[1].innerText];
                    b.method = a.value;
                    Codelab.dependencies.RESTClient.api.getSelected().children[0].innerText = a.value;
                    Codelab.dependencies.RESTClient.api.getSelected().children[0].className = `rest-type rest-type-${a.value.toLowerCase()}`;
                    document.getElementById('rest-method').innerText = a.value;
                });

                document.getElementById("rest-add-input").addEventListener("keyup", function(event) {
                        event.preventDefault();
                        if (event.keyCode === 13) {
                            document.getElementById("rest-add-btn").click();
                        }
                    });

                document.getElementById('rest-add-btn').addEventListener('click', () => {
                    Codelab.dependencies.RESTClient.api.createTab(document.getElementById("rest-add-input").value);
                    document.getElementById("rest-add-input").value = "";
                });

                renameProperty = function (oldName, newName, obj) {
                    if (oldName === newName) {
                        return obj;
                    }
                    if (obj.hasOwnProperty(oldName)) {
                        obj[newName] = obj[oldName];
                        delete obj[oldName];
                    }
                    return obj;
                };

                Codelab.utils.jsonToQueryString = (json) => {
                    if(typeof json === "string") json = JSON.parse(json);
                    return "?" + new URLSearchParams(json).toString();
                };
                Codelab.utils.headers2json = headers => {
                    let o = {};
                    headers.forEach(function(value, name) {
                        o[name] = value;
                    });
                    return o;
                };

                document.getElementById('rest-opt-edit').addEventListener('click', () => {
                    for(let i of document.getElementsByClassName('rest-opt-btn-selected')) i.className = 'rest-opt-btn';
                    for(let i of document.getElementsByClassName('rest-win1-cl')) i.hidden = true;

                    document.getElementById('rest-editor').hidden = false;
                    document.getElementById('rest-opt-edit').className = 'rest-opt-btn-selected';
                });

                document.getElementById('rest-opt-auth').addEventListener('click', () => {
                    for(let i of document.getElementsByClassName('rest-opt-btn-selected')) i.className = 'rest-opt-btn';
                    for(let i of document.getElementsByClassName('rest-win1-cl')) i.hidden = true;

                    document.getElementById('rest-win1-auth').hidden = false;
                    document.getElementById('rest-opt-auth').className = 'rest-opt-btn-selected';
                });

                document.getElementById('rest-opt-headers').addEventListener('click', () => {
                    for(let i of document.getElementsByClassName('rest-opt-btn-selected')) i.className = 'rest-opt-btn';
                    for(let i of document.getElementsByClassName('rest-win1-cl')) i.hidden = true;

                    document.getElementById('rest-win1-headers').hidden = false;
                    document.getElementById('rest-opt-headers').className = 'rest-opt-btn-selected';
                });

                document.getElementById('rest-res-response').addEventListener('click', () => {
                    for(let i of document.getElementsByClassName('rest-res-btn-selected')) i.className = 'rest-opt-btn';
                    for(let i of document.getElementsByClassName('rest-win2-cl')) i.hidden = true;

                    document.getElementById('rest-result').hidden = false;
                    document.getElementById('rest-res-response').className = 'rest-res-btn-selected';
                });

                document.getElementById('rest-res-headers').addEventListener('click', () => {
                    for(let i of document.getElementsByClassName('rest-res-btn-selected')) i.className = 'rest-opt-btn';
                    for(let i of document.getElementsByClassName('rest-win2-cl')) i.hidden = true;

                    document.getElementById('rest-win2-headers').hidden = false;
                    document.getElementById('rest-res-headers').className = 'rest-res-btn-selected';
                });

                 document.getElementById('rest-auth-creds').disabled = false;

                document.getElementById('rest-auth-type').addEventListener('change', () => {
                    if(document.getElementById('rest-auth-type').value === "None") document.getElementById('rest-auth-creds').disabled = true;
                    else document.getElementById('rest-auth-creds').disabled = false;
                    Codelab.dependencies.RESTClient.api.tabs[Codelab.dependencies.RESTClient.api.getSelected().children[1].innerText].auth =
                        document.getElementById('rest-auth-type').value + document.getElementById('rest-auth-creds').value;
                });

                document.getElementById('rest-auth-creds').addEventListener('keyup', () => {
                    Codelab.dependencies.RESTClient.api.tabs[Codelab.dependencies.RESTClient.api.getSelected().children[1].innerText].auth =
                        document.getElementById('rest-auth-type').value + " " + document.getElementById('rest-auth-creds').value;
                });

                document.getElementById('rest-headers-input').addEventListener('keyup', () => {
                    Codelab.dependencies.RESTClient.api.tabs[Codelab.dependencies.RESTClient.api.getSelected().children[1].innerText].headers =
                        document.getElementById('rest-headers-input').value.toString().replace('[object Object]', "");
                });

                Codelab.utils.yaml2json = str => {
                    // LMAO IT WORKS I DID IT IN FEW MINUTES
                    let o = {};
                    let l = "";
                    let b = "";
                        let lines = str.split("\n");
                        for (let i of lines) {
                            if (i.includes(":") && !i.startsWith("	") && !i.endsWith(":")) {
                                let a = i.split(":");
                                o[a[0]] = a[1];
                                l = [a[0], a[1]];
                            } else if (i.endsWith(":")) {
                                let a = i.split(":");
                                o[a[0]] = {};
                                b = a[0];
                            } else if (i.startsWith("	") && i.includes(":")) {
                                let a = i.split(":");
                                o[b][a[0].slice(1)] = a[1].slice(1);
                            } else {
                                l[1] += "\n" + i;
                                o[l[0]] = l[1];
                            }
                        }
                        return o;
                };

                Codelab.dependencies.RESTClient.api.save = () => {
                    let ls = {
                        tabs: Codelab.dependencies.RESTClient.api.tabs
                    };
                    ls = JSON.stringify(ls);

                    localStorage.RESTClient = ls;
                    return true;
                };

                Codelab.dependencies.RESTClient.api.load = () => {
                    if(!localStorage.RESTClient) return false;
                    let ls = JSON.parse(localStorage.RESTClient);

                    for(let i in Codelab.dependencies.RESTClient.api.tabs) delete Codelab.dependencies.RESTClient.api.tabs[i];
                    for(let i of document.getElementById('rest-folders').children) i.remove();

                    for(let i in ls.tabs) {
                        Codelab.dependencies.RESTClient.api.createTab(i, ls.tabs[i].method, ls.tabs[i].editor, ls.tabs[i].url, ls.tabs[i].auth, ls.tabs[i].headers);
                    }
                };

                setTimeout(() => {
                    Codelab.dependencies.RESTClient.api.load();
                }, 350);

            }, 350)
		}
	},
	dependencies: [],
	focus: true,
	windowed: true,
    footer: `<button id="rest-save" class="footer-btn" onclick="Codelab.dependencies.RESTClient.api.save()">Save</button>
<button id="rest-load" class="footer-btn" onclick="Codelab.dependencies.RESTClient.api.load()">Load</button>
<button id="rest-clear" class="footer-btn" onclick="delete localStorage.RESTClient">Clear</button>`
};