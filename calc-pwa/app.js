const frame = document.getElementById("appFrame");
const select = document.getElementById("appSelect");

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

function loadApp(name) {
  frame.src = "apps/" + name;
  select.value = name;
  localStorage.setItem("app", name);
}

function setTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  toggle.textContent = theme === "dark" ? "☀️" : "🌙";

  // Try now, and again shortly in case the iframe is mid-navigation.
  postTheme();
  setTimeout(postTheme, 50);
  setTimeout(postTheme, 250);
}

loadApp(localStorage.getItem("app") || defaultApp);

select.addEventListener("change", () => loadApp(select.value));

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
