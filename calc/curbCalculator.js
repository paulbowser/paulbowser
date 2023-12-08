document.getElementById('curbForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var height = parseFloat(document.getElementById('heightInput').value);
  var length = parseFloat(document.getElementById('lengthInput').value);
  var thickness = parseFloat(document.getElementById('thicknessInput').value);
  var costPerLinearFt = parseFloat(document.getElementById('costPerLinearFtInput').value);

  var totalCost = length * costPerLinearFt;
  var cuft = (height / 12) * length * (thickness / 12);

  var results = "<h2>Results</h2>" +
    "Cubic Feet: " + cuft.toFixed(2) + " <br>" +
    "Total Cost: $" + totalCost.toFixed(2);

  document.getElementById('results').innerHTML = results;
});