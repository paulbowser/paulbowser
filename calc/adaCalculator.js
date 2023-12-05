document.getElementById('circleForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var rad = parseFloat(document.getElementById('radiusInput').value);
  var mcir = parseFloat(document.getElementById('circumferenceInput').value);

  var pi = Math.PI;
  var area = (pi * rad * rad).toFixed(2);
  var circu = (2 * pi * rad).toFixed(2);
  var percircu = (mcir / circu).toFixed(2);
  var actsqft = (area * percircu).toFixed(2);
  var cuyd = ((actsqft * 0.5) / 27).toFixed(2);

  var results = "<h2>Results</h2>" +
    "Radius: " + rad + "<br>" +
    "Measured Circle: " + mcir + "<br>" +
    "Area of Circle: " + area + "<br>" +
    "Circumference: " + circu + "<br>" +
    "Percent of Circumference: " + percircu + "<br>" +
    "Actual Sq.Ft.: " + actsqft + "<br>" +
    "Cubic Yards: " + cuyd;

  document.getElementById('results').innerHTML = results;
});