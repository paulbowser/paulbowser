const frame=document.getElementById("appFrame");
const select=document.getElementById("appSelect");
const toggle=document.getElementById("themeToggle");

const defaultApp="curbcalc.html";
const savedApp=localStorage.getItem("app")||defaultApp;

function loadApp(name){
  frame.src="apps/"+name;
  select.value=name;
}

loadApp(savedApp);

select.addEventListener("change",()=>{
  localStorage.setItem("app",select.value);
  loadApp(select.value);
});

function setTheme(theme){
  document.body.classList.toggle("dark",theme==="dark");
  localStorage.setItem("theme",theme);
  toggle.textContent=theme==="dark"?"☀️":"🌙";
}

setTheme(localStorage.getItem("theme")||"light");

toggle.addEventListener("click",()=>{
  const isDark=document.body.classList.contains("dark");
  setTheme(isDark?"light":"dark");
});

if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
