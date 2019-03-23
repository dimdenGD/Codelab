module = {
	name: "RESTClient",
	author: "recapitalverb",
	desc: "Test and debug REST APIs like a cat, not a dog. 🐈",
	version: '0.0.1',
	html:`
<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
<div id="restcli">
    <span id="json">
    	<span id="jsontop">&nbsp;&nbsp;JSON</span>
    	<button id="send">Send</button>
    </span>
    <div id="editor-json"></div>
</div>
<style>
#restcli {
    background-color: #313131;
}

#restcli-top {
    background-color: white;
}

#json {
    color: dimgray;
    font-family: "Rubik", sans-serif;
    position: fixed;
    width: 50%;
    background-color: rgb(42, 41, 49);
}

#jsontop {
		font-family: inherit;
		text-align: center;
		position: absolute;
		left: 40%;
		top: 8px;
}

#send {
		background-color: #00b7d7;
		border: none;
		text-align: center;
		font-family: inherit;
		float: right;
		padding: 10px 15px;
}

#editor-json {
    position: fixed;
    display: table;
    left: 0;
    top: 90px;
    width: 50%;
    height: 50%;
    font-size: 18px;
}
</style>
	`,
	api: {},
	js: () => {
		let script = document.createElement('script');
		script.src = `https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ace.js`;
		document.head.appendChild(script);
		script.onload = () => {
			let editor = ace.edit("editor-json");
			editor.setTheme("ace/theme/monokai");
			editor.setOption("showPrintMargin", false);
			editor.session.setMode("ace/mode/json");
			// document.getElementById("send").addEventListener("click", ()=>{
			// 	fetch("https://discordapp.com/api/invites/qlabs", {
			// 		method: 'REST',
			// 		body: editor.getValue(), // string or object
			// 		headers:{
			// 			'Content-Type': 'application/json'
			// 		}
			// 	})
			// 	.then(response => response.json())
			// 	.then(console.log)
			// })
			// something something request then console.log
			setTimeout(() => {
				for(let i of document.getElementsByClassName("ace-monokai")) i.style.backgroundColor = "#232328";
				for(let i of document.getElementsByClassName("ace_gutter")) i.style.background = "#2a2931";
			}, 500)
		}
	},
	dependencies: [],
	focus: true,
	windowed: true
};