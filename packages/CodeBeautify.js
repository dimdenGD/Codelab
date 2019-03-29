module = {
    name: "CodeBeautify",
    author: "dimden",
    desc: "Beautify your code easily!",
    version: '1.0.0',
    html:`

<style>

    #cb-select {
        background-color: #313131;
        border-style: none;
        border-radius: 2px;
        font-family: Montserrat;
        color: gray;
    }
    
    #cb-logo {
        font-family: Montserrat;
        font-size: 20px;
        font-weight: bolder;
        color: gray;
    }

    #cb-win {
        left: 20px;
        position: fixed;
        font-family: Montserrat;
        color: gray
    }
    
    #cb-options {
        position: fixed;
        left: 560px;
        top: 60px;
        font-size: 16px;
    }
    
    #additional-options {
        background-color: #313131;
        border-style: none;
        border-radius: 2px;
        font-family: Montserrat;
        color: gray;
        max-width: 300px;
        max-height: 200px;
    }
        
    #tabsize, #max-preserve-newlines, #wrap-line-length, #brace-style, #indent-scripts {
        background-color: #313131;
        border-style: none;
        border-radius: 2px;
        font-family: Montserrat;
        color: gray;
    }
    
    #cb-run {
        padding: 5px;
        border-style: none;
        border-radius: 2px;
        font-family: Montserrat;
        font-weight: bold;
        font-size: 17px;
        background-color: #2f2f2f;
        color: gray;
    }
    
    #cb-run:hover {
        padding: 5px;
        border-style: none;
        border-radius: 2px;
        font-family: Montserrat;
        font-weight: bold;
        font-size: 17px;
        background-color: #2f2f2f;
        color: white;
    }
    
    #cb-editor {
        width: 100%;
        height: 42%;
        position: fixed;
        left: 1px;
        top: 360px;
        border-top-style: solid;
        border-top-width: 2px;
        border-top-color: #2a2931;
    }

</style>

<div id="cb-win">
    <br>
    <div id="cb-top">
        <span id="cb-logo">Code Beautify</span>
        <br>
        <span>Based on <a href="https://github.com/beautify-web/js-beautify">js-beautify</a>.</span>
        <br>
        <br>
        <select id="cb-select">
            <option>JS</option>
            <option>HTML</option>
            <option>CSS</option>
            <option>JSON</option>
        </select>
        <br>
        <br>
        
        <button id="cb-run">Beautify Code</button>      
        <div id="cb-options">
            <table>
                <tbody><tr>
                  <td>
                    <select name="tabsize" id="tabsize">
                      <option value="1">Indent with a tab character</option>
                      <option value="2">Indent with 2 spaces</option>
                      <option value="3">Indent with 3 spaces</option>
                      <option value="4">Indent with 4 spaces</option>
                      <option value="8">Indent with 8 spaces</option>
                    </select>
                    <br>
            
                    <select name="max-preserve-newlines" id="max-preserve-newlines">
                      <option value="-1">Remove all extra newlines</option>
                      <option value="1">Allow 1 newline between tokens</option>
                      <option value="2">Allow 2 newlines between tokens</option>
                      <option value="5">Allow 5 newlines between tokens</option>
                      <option value="10">Allow 10 newlines between tokens</option>
                      <option value="0">Allow unlimited newlines between tokens</option>
                    </select>
                    <br>
            
                    <select name="wrap-line-length" id="wrap-line-length">
                      <option value="0">Do not wrap lines</option>
                      <option value="40">Wrap lines near 40 characters</option>
                      <option value="70">Wrap lines near 70 characters</option>
                      <option value="80">Wrap lines near 80 characters</option>
                      <option value="110">Wrap lines near 110 characters</option>
                      <option value="120">Wrap lines near 120 characters</option>
                      <option value="160">Wrap lines near 160 characters</option>
                    </select>
                    <br>
            
                    <select id="brace-style">
                      <option value="collapse">Braces with control statement</option>
                      <option value="expand">Braces on own line</option>
                      <option value="end-expand">End braces on own line</option>
                      <option value="none">Attempt to keep braces where they are</option>
                    </select>
            
                    <p style="margin:6px 0 0 0">HTML &lt;style&gt;, &lt;script&gt; formatting:</p>
                    <select id="indent-scripts">
                      <option value="keep">Keep indent level of the tag</option>
                      <option value="normal">Add one indent level</option>
                      <option value="separate">Separate indentation</option>
                    </select>
            
                    <p style="margin:6px 0 0 0">Additional Settings (JSON):</p>
                    <textarea id="additional-options" rows="5" cols="32">{}</textarea>            
                  </td>
                  <td>
                    <input class="checkbox" type="checkbox" id="end-with-newline">
                    <label for="end-with-newline">End script and style with newline?</label>
                    <br>
                    <input class="checkbox" type="checkbox" id="e4x">
                    <label for="e4x">Support e4x/jsx syntax</label>
                    <br>
                    <input class="checkbox" type="checkbox" id="comma-first">
                    <label for="comma-first">Use comma-first list style?</label>
                    <br>
                    <input class="checkbox" type="checkbox" id="detect-packers">
                    <label for="detect-packers">Detect packers and obfuscators?</label>
                    <br>
                    <input class="checkbox" type="checkbox" id="brace-preserve-inline">
                    <label for="brace-preserve-inline">Preserve inline braces/code blocks?</label>
                    <br>
                    <input class="checkbox" type="checkbox" id="keep-array-indentation">
                    <label for="keep-array-indentation">Keep array indentation?</label>
                    <br>
                    <input class="checkbox" type="checkbox" id="break-chained-methods">
                    <label for="break-chained-methods">Break lines on chained methods?</label>
                    <br>
                    <input class="checkbox" type="checkbox" id="space-before-conditional">
                    <label for="space-before-conditional">Space before conditional: "if(x)" / "if (x)"</label>
                    <br>
                    <input class="checkbox" type="checkbox" id="unescape-strings">
                    <label for="unescape-strings">Unescape printable chars encoded as \\xNN or \\uNNNN?</label>
                    <br>
                    <input class="checkbox" type="checkbox" id="jslint-happy">
                    <label for="jslint-happy">Use JSLint-happy formatting tweaks?</label>
                    <br>
                    <input class="checkbox" type="checkbox" id="indent-inner-html">
                    <label for="indent-inner-html">Indent &lt;head&gt; and &lt;body&gt; sections?</label>
                    <br>
                    <input class="checkbox" type="checkbox" id="indent-empty-lines">
                    <label for="indent-empty-lines">Keep indentation on empty lines?</label>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
        <div id="cb-editor"></div>
    </div>
</div>    
    `,
    api: {},
    js: () => {

        Codelab.dependencies.CodeBeautify.api.inProgress = false;

    let script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.9.1/beautify.js";
    document.head.appendChild(script);

    let script2 = document.createElement('script');
    script2.src = "https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.9.1/beautify-css.js";
    document.head.appendChild(script2);

    let script3 = document.createElement('script');
    script3.src = "https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.9.1/beautify-html.js";
    document.head.appendChild(script3);

    let script4 = document.createElement('script');
    script4.src = 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ace.js';
    document.head.appendChild(script4);

    script.onload = () => {
        script2.remove();
        Codelab.dependencies.CodeBeautify.api.js = js_beautify;

        function mergeObjects(allOptions, additionalOptions) {
            var finalOpts = {};
            var name;

            for (name in allOptions) {
                finalOpts[name] = allOptions[name];
            }
            for (name in additionalOptions) {
                finalOpts[name] = additionalOptions[name];
            }
            return finalOpts;
        }

        document.getElementById('cb-run').addEventListener('click', () => {
            if(Codelab.dependencies.CodeBeautify.api.inProgress) return;
            Codelab.dependencies.CodeBeautify.api.inProgress = true;
            let select = document.getElementById('cb-select');
            let language = select.value;
            let opts = {};

            let additional_options = $('#additional-options').val();

            opts.indent_size = $('#tabsize').val();
            opts.indent_char = parseInt(opts.indent_size, 10) === 1 ? '\t' : ' ';
            opts.max_preserve_newlines = $('#max-preserve-newlines').val();
            opts.preserve_newlines = opts.max_preserve_newlines !== "-1";
            opts.keep_array_indentation = $('#keep-array-indentation').prop('checked');
            opts.break_chained_methods = $('#break-chained-methods').prop('checked');
            opts.indent_scripts = $('#indent-scripts').val();
            opts.brace_style = $('#brace-style').val() + ($('#brace-preserve-inline').prop('checked') ? ",preserve-inline" : "");
            opts.space_before_conditional = $('#space-before-conditional').prop('checked');
            opts.unescape_strings = $('#unescape-strings').prop('checked');
            opts.jslint_happy = $('#jslint-happy').prop('checked');
            opts.end_with_newline = $('#end-with-newline').prop('checked');
            opts.wrap_line_length = $('#wrap-line-length').val();
            opts.indent_inner_html = $('#indent-inner-html').prop('checked');
            opts.comma_first = $('#comma-first').prop('checked');
            opts.e4x = $('#e4x').prop('checked');
            opts.indent_empty_lines = $('#indent-empty-lines').prop('checked');

            if (additional_options && additional_options !== '{}') {
                try {
                    additional_options = JSON.parse(additional_options);
                    opts = mergeObjects(opts, additional_options);
                } catch (e) {
                    $('#additional-options-error').show();
                }
            }

            if(language === "JS" || language === "JSON") {
                Codelab.dependencies.CodeBeautify.api.editor.setValue(js_beautify(Codelab.dependencies.CodeBeautify.api.editor.getValue(), opts), -1);
            } else if(language === "CSS") {
                Codelab.dependencies.CodeBeautify.api.editor.setValue(css_beautify(Codelab.dependencies.CodeBeautify.api.editor.getValue(), opts), -1);
            } else if(language === "HTML") {
                Codelab.dependencies.CodeBeautify.api.editor.setValue(html_beautify(Codelab.dependencies.CodeBeautify.api.editor.getValue(), opts), -1);
            }
            Codelab.dependencies.CodeBeautify.api.inProgress = false;

        })

    };
    script2.onload = () => {
        script2.remove();
        Codelab.dependencies.CodeBeautify.api.css = css_beautify;
    };
    script3.onload = () => {
        script3.remove();
        Codelab.dependencies.CodeBeautify.api.html = html_beautify;
    };
    script4.onload = () => {
        script4.remove();
        let editor = ace.edit('cb-editor');
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/javascript");
        editor.setOption("showPrintMargin", false);
        editor.getSession().setUseWorker(false);

        Codelab.dependencies.CodeBeautify.api.editor = editor;

        let select = document.getElementById('cb-select');
        select.addEventListener('change', () => {
            editor.getSession().setMode("ace/mode/"+select.value.toLowerCase().replace(/js$/g, 'javascript'));
        });
        setTimeout(() => {
            for (let i of document.getElementsByClassName("ace-monokai")) i.style.backgroundColor = "#232328";
            for (let i of document.getElementsByClassName("ace_gutter")) i.style.background = "#2a2931";
        }, 350);
    };

    },
    dependencies: [],
    focus: true,
    windowed: true
};