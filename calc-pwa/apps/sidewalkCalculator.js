document.getElementById('sidewalkForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var width = parseFloat(document.getElementById('widthInput').value);
  var length = parseFloat(document.getElementById('lengthInput').value);
  var thickness = parseFloat(document.getElementById('thicknessInput').value);
  var costPerSqFt = parseFloat(document.getElementById('costPerSqFtInput').value);

  var thkInFeet = thickness / 12.0;
  var sqft = width * length;
  var totalCost = sqft * costPerSqFt;

  var results = "<h2>Results</h2>" +
    "Square Feet: " + sqft.toFixed(2) + "<br>" +
    "Total Cost: $" + totalCost.toFixed(2);

  document.getElementById('results').innerHTML = results;
});

if (window.FormPersist) {
  FormPersist.init("sidewalkForm", "sidewalkcalc", { resetButtonId: "sidewalkReset", resultsId: "results" });
}
