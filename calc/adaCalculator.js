document.getElementById('circleForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var rad = parseFloat(document.getElementById('radiusInput').value);
  var mcir = parseFloat(document.getElementById('circumferenceInput').value);
  var costPerSqFt = parseFloat(document.getElementById('costPerSqFtInput').value);

  var pi = Math.PI;
  var area = pi * rad * rad;
  var circu = 2 * pi * rad;
  var percircu = mcir / circu;
  var actsqft = area * percircu;
  var totalCost = actsqft * costPerSqFt;

  var results = "<h2>Results</h2>" +
    "Radius: " + rad + "<br>" +
    "Measured Circle: " + mcir + "<br>" +
    //"Area of Circle: " + area.toFixed(2) + "<br>" +
    //"Circumference: " + circu.toFixed(2) + "<br>" +
    //"Percent of Circumference: " + percircu.toFixed(2) + "<br>" +
    "Actual Sq.Ft.: " + actsqft.toFixed(2) + "<br>" +
    "Total Cost: $" + totalCost.toFixed(2);

  document.getElementById('results').innerHTML = results;
});