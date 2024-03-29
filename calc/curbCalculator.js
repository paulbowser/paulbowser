document.getElementById('curbForm').addEventListener('submit', function(event) {
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