function copyToClipboard(elementId) {

  // Create an auxiliary hidden input
  var aux = document.createElement("input");


  //To remove html string management
  var encodestr = document.getElementById(elementId).innerHTML;

  //create object for parsing
  var parser = new DOMParser;

  var dom = parser.parseFromString(
    '<!doctype html><body>' + encodestr,
    'text/html');

  var decodedString = dom.body.textContent;
  // Get the text from the element passed into the input
  aux.setAttribute("value", decodedString);

  // Append the aux input to the body
  document.body.appendChild(aux);

  // Highlight the content
  aux.select();

  // Execute the copy command
  document.execCommand("copy");

  // Remove the input from the body
  document.body.removeChild(aux);

}







function darkandwhite() {
  var checkBox = document.getElementById("myCheck");
  var background = document.body;
  if (checkBox.checked) {
    background.className = "w3-black";
  } else {
    background.className = "w3-white"
  }
}



function myFunction() {
  var x = document.getElementById("navbar");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}
// document.addEventListener('DOMContentLoaded', function () {
//   var checkbox = document.querySelector('input[type="checkbox"]');
//   var element = document.body;

//   checkbox.addEventListener('change', function () {
//     if (checkbox.checked) {
//       // do this
//       element.className = "w3-blue"
//     } else {
//       // do that
//       element.className = "w3-aqua"
//     }
//   });
// });