module = {
	name: "RESTClient",
	author: "recapitalverb & dimden",
	desc: "Test and debug REST APIs like a cat, not a dog. 🐈 Meow!",
	version: '0.0.2',
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
        border-top-width: 1px;
        border-top-color: #2f2f37;
        border-top-style: solid;
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
        top: 95px;
        width: 550px;
        border-right-width: 1px;
        border-right-color: #2f2f3f;
        border-right-style: solid;
        left: 200px;
    }
    
    #rest-result {
        position: fixed;
        height: 100%;
        top: 95px;
        width: 550px;
        border-right-width: 1px;
        border-right-color: #2f2f3f;
        border-right-style: solid;
        left: 750px;
    }
    
    #rest-type-tab {
        position: absolute;
        left: 220px;
        top: 25%;
    }
    
    #rest-url {
        position: absolute;
        left: 260px;
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
				width: 370px;
    }
    
    #rest-send {
        position: absolute;
        left: 650px;
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
        left: 650px;
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
        position: absolute;
        top: 0;
        height: 100%;
        left: 750px;
        width: 1px;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: lightgray;
    }
    
</style>
<div id="rest-win">
    <div id="rest-top">
        <div id="rest-logo">
            <span>REST Client</span>
        </div>
        <span id="rest-type-tab"></span>
        <input id="rest-url" placeholder="url://"/>
        <button id="rest-send">Send</button>
        <div id="rest-vl"></div>
    </div>
    <div id="rest-left">
        <div id="rest-search"></div>
        <div id="rest-folders"></div>
    </div>
    <div id="rest-editor"></div>
    <div id="rest-result"></div>
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


            Codelab.dependencies.RESTClient.api.editors.editor.setValue(Codelab.dependencies.RESTClient.api.tabs[tabname].editor, -1);
            Codelab.dependencies.RESTClient.api.editors.output.setValue(Codelab.dependencies.RESTClient.api.tabs[tabname].output, -1);
            document.getElementById('rest-url').value = Codelab.dependencies.RESTClient.api.tabs[tabname].url;
            Codelab.dependencies.RESTClient.api.tabs[tabname].tab.children[1].className = "rest-selectedname";

            Codelab.dependencies.RESTClient.api.changing = false;
            return true;
        },
	    createTab: tabname => {
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
                method: "GET",
                type: "json",
                editor: "",
                output: "",
                tab: document.getElementById(`rest-tab-${tabid}`),
                url: ""
            };

            document.getElementById(`rest-tab-${tabid}`).children[1].addEventListener('click', () => {
                Codelab.dependencies.RESTClient.api.selectTab(document.getElementById(`rest-tab-${tabid}`).children[1].innerText);
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
			output.getSession().setMode("ace/mode/json");
			output.setOption("showPrintMargin", false);
			output.setReadOnly(true);
            output.container.style.pointerEvents="none";
            output.renderer.setStyle("disabled", true);
            output.blur();
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
				fetch(url, {
					// method: "REST",
					// body: output.getValue(),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(resp => resp.json())
				.then(json => {
                    Codelab.dependencies.RESTClient.api.tabs[Codelab.dependencies.RESTClient.api.getSelected().children[1].innerText].output = JSON.stringify(json, null, 2);
					output.setValue(JSON.stringify(json, null, 2), -1);
				})
				.catch(err => Codelab.console.error(err.name, err.message))
			});
			setTimeout(() => {
				for(let i of document.getElementsByClassName("ace-monokai")) i.style.backgroundColor = "#232328";
				for(let i of document.getElementsByClassName("ace_gutter")) i.style.background = "#2a2931";
                Codelab.dependencies.RESTClient.api.createTab('Unnamed');
                document.getElementById('rest-url').addEventListener('keyup', () => {
                    Codelab.dependencies.RESTClient.api.tabs[Codelab.dependencies.RESTClient.api.getSelected().children[1].innerText].url = document.getElementById('rest-url').value;
                });
            }, 250)
		}
	},
	dependencies: [],
	focus: true,
	windowed: true
};