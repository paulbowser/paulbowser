document.getElementById('sidewalkForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var width = parseFloat(document.getElementById('widthInput').value);
  var length = parseFloat(document.getElementById('lengthInput').value);
  var thickness = parseFloat(document.getElementById('thicknessInput').value);
  var costPerCubicYard = parseFloat(document.getElementById('costPerCubicYardInput').value);

  var thkInFeet = thickness / 12.0;
  var sqft = width * length;
  var cuft = width * length * thkInFeet;
  var cuyd = cuft / 27.0;
  var totalCost = cuyd * costPerCubicYard;

  var results = "<h2>Results</h2>" +
    "Square Feet: " + sqft.toFixed(2) + "<br>" +
    "Cubic Feet: " + cuft.toFixed(2) + "<br>" +
    "Cubic Yards: " + cuyd.toFixed(2) + "<br>" +
    "Total Cost: $" + totalCost.toFixed(2);

  document.getElementById('results').innerHTML = results;
});