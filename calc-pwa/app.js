const frame = document.getElementById("appFrame");
const select = document.getElementById("appSelect");
const toggle = document.getElementById("themeToggle");

const defaultApp = select?.options?.[0]?.value || "curbcalc.html";

function currentTheme() {
  return localStorage.getItem("theme") || "light";
}

function postTheme() {
  // Post after the iframe has loaded (best-effort)
  try {
    frame.contentWindow && frame.contentWindow.postMessage(
      { type: "theme", value: currentTheme() },
      window.location.origin
    );
  } catch (e) {}
}

function loadApp(name) {
  frame.src = "apps/" + name;
  select.value = name;
  localStorage.setItem("app", name);
}

function setTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
  toggle.textContent = theme === "dark" ? "☀️" : "🌙";

  // Try now, and again shortly in case the iframe is mid-navigation.
  postTheme();
  setTimeout(postTheme, 50);
  setTimeout(postTheme, 250);
}

loadApp(localStorage.getItem("app") || defaultApp);
setTheme(currentTheme());

// When the iframe finishes loading, re-apply theme inside it.
frame.addEventListener("load", () => {
  postTheme();
  setTimeout(postTheme, 50);
});

select.addEventListener("change", () => loadApp(select.value));

toggle.addEventListener("click", () => {
  setTheme(document.body.classList.contains("dark") ? "light" : "dark");
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
