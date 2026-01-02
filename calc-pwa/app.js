const frame = document.getElementById("appFrame");
const select = document.getElementById("appSelect");
const toggle = document.getElementById("themeToggle");

// Remove options that have data-include="false" so inactive entries
// can remain in the HTML without being shown in the select.
if (select) {
  const opts = Array.from(select.querySelectorAll('option'));
  opts.forEach(opt => {
    const includeAttr = opt.getAttribute('data-include');
    const include = includeAttr === null ? true : !(includeAttr === 'false' || includeAttr === '0');
    if (!include) opt.remove();
  });
}

const defaultApp = select?.options?.[0]?.value || "curbcalc.html";

// Clear legacy theme persistence so system theme stays in control.
localStorage.removeItem("theme");

const themeModes = ["system", "light", "dark"];
let themeMode = "system";
const media = window.matchMedia("(prefers-color-scheme: dark)");

function resolveTheme() {
  if (themeMode === "system") {
    return media.matches ? "dark" : "light";
  }
  return themeMode;
}

function applyTheme() {
  const resolved = resolveTheme();
  if (themeMode === "system") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", themeMode);
  }
  if (toggle) {
    const label = themeMode.charAt(0).toUpperCase() + themeMode.slice(1);
    toggle.textContent = "Theme: " + label;
  }
  postTheme(resolved);
}

function postTheme(resolved) {
  try {
    frame.contentWindow && frame.contentWindow.postMessage(
      { type: "theme", mode: themeMode, value: resolved },
      window.location.origin
    );
  } catch (e) {}
}

function loadApp(name) {
  frame.src = "apps/" + name;
  select.value = name;
  localStorage.setItem("app", name);
}

loadApp(localStorage.getItem("app") || defaultApp);
applyTheme();

frame.addEventListener("load", () => {
  postTheme(resolveTheme());
  setTimeout(() => postTheme(resolveTheme()), 50);
});

select.addEventListener("change", () => loadApp(select.value));

if (toggle) {
  toggle.addEventListener("click", () => {
    const idx = themeModes.indexOf(themeMode);
    themeMode = themeModes[(idx + 1) % themeModes.length];
    applyTheme();
  });
}

media.addEventListener("change", () => {
  if (themeMode === "system") {
    applyTheme();
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
