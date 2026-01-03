var curbForm = document.getElementById('curbForm');
if (curbForm) {
  curbForm.addEventListener('submit', function(event) {
  event.preventDefault();

  var height = parseFloat(document.getElementById('heightInput').value);
  var length = parseFloat(document.getElementById('lengthInput').value);
  var thickness = parseFloat(document.getElementById('thicknessInput').value);
  var costPerLinearFt = parseFloat(document.getElementById('costPerLinearFtInput').value);

  var totalCost = length * costPerLinearFt;
  var cuft = (height / 12) * length * (thickness / 12);

  var results = "<h2>Results</h2>" +
    "Total Material Volume in Cubic Feet: " + cuft.toFixed(2) + "<br>" +
    "Total Linear Feet: " + length.toFixed(2) + "<br>" + // Display entered length as total linear feet
    "Total Cost: $" + totalCost.toFixed(2);

  document.getElementById('results').innerHTML = results;
  });
}

if (window.FormPersist) {
  FormPersist.init("curbForm", "curbcalc", { resetButtonId: "curbReset", resultsId: "results" });
}

function bindCurbPersistFallback() {
  var ids = ["heightInput", "lengthInput", "thicknessInput", "costPerLinearFtInput"];
  var prefix = "curbcalc:";
  var reset = document.getElementById("curbReset");
  var handlers = [];

  ids.forEach(function(id) {
    var field = document.getElementById(id);
    if (!field) return;
    var key = prefix + id;
    var stored = localStorage.getItem(key);
    if (stored !== null && field.value === "") {
      field.value = stored;
    }
    var store = function() {
      localStorage.setItem(key, field.value);
    };
    field.addEventListener("input", store);
    field.addEventListener("change", store);
    field.addEventListener("blur", store);
    handlers.push({ field: field, store: store });
  });

  if (reset) {
    reset.addEventListener("click", function() {
      ids.forEach(function(id) {
        localStorage.removeItem(prefix + id);
      });
    });
  }
}

bindCurbPersistFallback();
