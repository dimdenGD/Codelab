if (window.location.href.includes(`\x3f\x6b\x65\x79\x3d\x41\x46\x33\x44\x2d\x53\x41\x33\x56\x2d\x31\x31\x56\x58\x2d\x47\x43\x58\x39`)) {
    console.log(`%c>_ Codelab`, `font-style: oblique; padding: 10px; font-width: 1px; font-size: 32px; background: #222; color: #8cff76;`);
    console.log(`%cWelcome to the Codelab dev-console! Main API object: "Codelab" (window.Codelab)`, 'border-radius: 3px; padding: 10px; background: #222; color: #bada55');
    Codelab = {
        windows: {},
        dependencies: {},
        isOpened: tabName => {
            return !!Codelab.windows[tabName];
        },
        isDependencies: arr_of_deps => {
            let o = 0;
            for (let i of arr_of_deps) {
                if (Codelab.dependencies[i]) o++;
            }
            console.log(arr_of_deps.length, o);
            return arr_of_deps.length === o;
        },
        selectTab: tabname => {
            for (let i of document.getElementById('tabs').children) {
                if (i.id.startsWith('tab')) i.className = "tab";
            }
            for (let i of document.getElementById('tabs').children) {
                if (i.innerText.slice(0, -2).startsWith(tabname)) {
                    i.className = "selectedtab";
                    document.getElementById('window').innerHTML = "";
                    let iframe = document.createElement('iframe');
                    let html = Codelab.dependencies[tabname].html;
                    document.getElementById('window').appendChild(iframe);
                    iframe.style = `
                        border-style: none;
                        position: absolute;
                      `;
                    iframe.contentWindow.document.open();
                    iframe.contentWindow.document.write(html);
                    iframe.contentWindow.document.body.style = `color: white; font-family: monospace`;
                    iframe.contentWindow.document.close();
                    return true;
                }
            }
            return false;
        },
        createWindow(name, html, api, dependencies, focus) {
            if (!name || !html || !api || !dependencies) return false;
            if (!Codelab.isDependencies(dependencies)) {
                return false;
            }

            Codelab.windows[name] = {
                name: name,
                html: html
            };
            Codelab.dependencies[name] = {
                name: name,
                api: api,
                html: html
            };
            let tabid = document.getElementById('tabs').childElementCount === 0 ? 0 : document.getElementById('tabs').childElementCount / 2;
            document.getElementById('tabs').insertAdjacentHTML(`beforeend`, `<span id="tab-${tabid}" class="tab">${name} <button onclick="this.parentElement.remove();Codelab.selectTab(document.getElementById('tabs').firstChild.innerText.slice(0, -2));" style="top: 1px; right: 1px;color: dimgray; background-color: rgba(0,0,0,0); font-size: 16px; border-style: none; padding:0"> ×</button></span><span> </span>`)
            document.getElementById(`tab-${tabid}`).addEventListener("click", () => {
                if (document.getElementById(`tab-${tabid}`)) Codelab.selectTab(name);
            });
            if (focus) {
                Codelab.selectTab(name);
            }
        }
    };
} else {
    document.body.innerHTML = "<h2>\x34\x30\x31 \x41\x75\x74\x68\x6f\x72\x69\x7a\x61\x74\x69\x6f\x6e \x52\x65\x71\x75\x69\x72\x65\x64</h2><hr><span>\x6e\x67\x69\x6e\x78/1.12.1</span>";
    document.head.innerHTML = "";
}