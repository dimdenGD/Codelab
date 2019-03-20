module = {
    name: "WebBuilder",
    html: '<div id="editor"></div>',
    api: {},
    js: () => {

        let script = document.createElement('script');
        script.src = `https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ace.js`;
        document.getElementsByTagName('head')[0].appendChild(script);

        script.onload = () => {
            let editor = ace.edit("editor");
            editor.setTheme("ace/theme/monokai");
            editor.session.setMode("ace/mode/javascript");
            let a = document.getElementById('editor');
            a.style.position = "fixed";
            a.style.width = "100%";
            a.style.height = "100%";
            setTimeout(() => {
                for(let i of document.getElementsByClassName("ace-monokai")) {
                    i.style.backgroundColor = "#232328";
                }
                document.getElementsByClassName('ace_gutter')[0].style.background = "#2a2931";
            }, 500);
        }
    },
    dependencies: true,
    focus: true,
    windowed: true
};