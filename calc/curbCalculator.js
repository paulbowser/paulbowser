document.getElementById('curbForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var thickness = parseFloat(document.getElementById('thicknessInput').value);
  var height = parseFloat(document.getElementById('heightInput').value);
  var length = parseFloat(document.getElementById('lengthInput').value);
  var costPerCubicYard = parseFloat(document.getElementById('costPerCubicYardInput').value);

  var crbcuft = ((thickness / 12.0) * (height / 12.0) * length);
  var crbcuyd = crbcuft / 27.0;
  
  var totalCost = crbcuyd * costPerCubicYard;

  var results = "<h2>Results</h2>" +
    "Cubic Feet: " + crbcuft.toFixed(2) + "<br>" +
    "Cubic Yards: " + crbcuyd.toFixed(2) + "<br>" +
    "Total Cost: $" + totalCost.toFixed(2);

  document.getElementById('results').innerHTML = results;
});