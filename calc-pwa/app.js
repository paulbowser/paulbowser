const frame=document.getElementById("appFrame");
const select=document.getElementById("appSelect");
const toggle=document.getElementById("themeToggle");

const defaultApp="curbcalc.html";
const savedApp=localStorage.getItem("app")||defaultApp;

function loadApp(name){
  frame.src="apps/"+name;
  select.value=name;
  // Apply current theme inside iframe after navigation
  try { frame.contentWindow && frame.contentWindow.postMessage({type:"theme", value: (localStorage.getItem("theme")||"light")}, "*"); } catch(e) {}
}

loadApp(savedApp);

select.addEventListener("change",()=>{
  localStorage.setItem("app",select.value);
  loadApp(select.value);
});

function setTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
  toggle.textContent = theme === "dark" ? "☀️" : "🌙";
  // Tell the embedded calculator too (best-effort)
  try { frame.contentWindow && frame.contentWindow.postMessage({type:"theme", value: theme}, "*"); } catch(e) {}
}

setTheme(localStorage.getItem("theme")||"light");

toggle.addEventListener("click",()=>{
  const isDark=document.body.classList.contains("dark");
  setTheme(isDark?"light":"dark");
});

if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
