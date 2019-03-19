console.log(`%c>_ Codelab`, `font-style: oblique; padding: 10px; font-width: 1px; font-size: 32px; background: #222; color: #8cff76;`);

document.getElementById('btn').addEventListener('click', () => {
   let key = document.getElementById('key').value;
   if(key === `AF3D-SA3V-11VX-GCX9`) {
      window.location.href = `https://dimden.tk/codelab/secret_gdvcxvdsfvjnfkjdfkvndf?key=` + key;
   } else {
      pb = particleground(document.getElementById("particles"), {lineColor: "#ff0000"})
   }
});