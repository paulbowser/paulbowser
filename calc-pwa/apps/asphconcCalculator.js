document.getElementById('materialForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var material = document.querySelector('input[name="material"]:checked');
  var width = parseFloat(document.getElementById('widthInput').value);
  var length = parseFloat(document.getElementById('lengthInput').value);
  var depth = parseFloat(document.getElementById('depthInput').value);
  var costPerSqFt = parseFloat(document.getElementById('costPerSqFtInput').value);

  var depthInFeet = depth / 12.0;
  var sqft = width * length;
  var cuyd = (width * length * depthInFeet) / 27.0;
  var tons = (150.0 * width * length * depthInFeet) / 2000.0;
  var totalCost = costPerSqFt * sqft;

  var results = "<h2>Results</h2>" +
    "Square Feet: " + sqft + "<br>";

  if (material) {
    if (material.value === 'asphalt') {
      results += "Tons: " + tons.toFixed(2);
    } else if (material.value === 'concrete') {
      results += "Cubic Yards: " + cuyd.toFixed(2);
    }
  } else {
    results += "Please select a material.";
  }

  results += "<br>Total Cost: $" + totalCost.toFixed(2);

  document.getElementById('results').innerHTML = results;
});