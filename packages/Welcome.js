module = {
	name: "Welcome",
	author: "dimden",
	desc: "Welcome window.",
	version: '1.0.0',
	html:`<span style="width: 1000px; position: absolute; left: 20px; color: gray; font-family: monospace">
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
</div>`,
	api: {},
	js: () => {},
	dependencies: [],
	focus: true,
	windowed: true
};