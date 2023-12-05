document.getElementById('materialForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var width = parseFloat(document.getElementById('widthInput').value);
  var length = parseFloat(document.getElementById('lengthInput').value);
  var depth = parseFloat(document.getElementById('depthInput').value);
  var material = document.querySelector('input[name="material"]:checked');

  var sqft = width * length;
  var cuyd = (width * length * depth) / 27;
  var tons = (width * length * (depth / 110) / 18000);

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

  document.getElementById('results').innerHTML = results;
});