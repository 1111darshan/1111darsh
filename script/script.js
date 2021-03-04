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







// // get markdown content  
// var body_location = './documents/notes/K8s.md';
        
// function getText(myUrl){
//     var result = null;
//     $.ajax( { url: myUrl, 
//               type: 'get', 
//               dataType: 'html',
//               async: false,
//               success: function(data) { result = data; } 
//             }
//     );
//     FileReady = true;
//     return result;
// }

// var markdown_source = getText(body_location);

// // convert markdown to html
// var output = markdown.toHTML( markdown_source );
// document.write(output);



function darkandwhite() {
  var checkBox = document.getElementById("myCheck");
  var background = document.body;
 
  




  if (checkBox.checked){
    background.className = "w3-blue";
    
    
    
  } else {
    background.className = "w3-aqua"
    

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