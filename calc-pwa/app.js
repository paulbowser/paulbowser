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

loadApp(localStorage.getItem("app") || defaultApp);

select.addEventListener("change", () => loadApp(select.value));

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
