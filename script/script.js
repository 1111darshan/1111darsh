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

function load() {
  var checkBox = document.getElementById("myCheck");
  var checkBox2 = document.getElementById("lan");
  var mood = localStorage.getItem("mood")
  // var lan = localStorage.getItem("lan")
  if (mood != null)
    checkBox.checked = true;
  darkandwhite()
  var date = new Date();
  var hour = date.getHours();
  if (hour > 16) {
    var wish = "Good Evening !!"
    // var wish_g = "શુભ સાંજ"
  } else if (hour > 12) {
    var wish = "Good Afternoon !!"
    // var wish_g = "શુભ બપોર"
  } else if (hour >= 0) {
    var wish = "Good Morning !!"
    // var wish_g = "સુપ્રભાત"
  }
  // if (lan != null) {
  //   checkBox2.checked = true;
  //   wish = wish_g
  // }
  document.getElementById("Good-wish").innerHTML = wish;


  const Http = new XMLHttpRequest();
  const url = 'https://hc-ping.com/fcfbcbc7-f8be-406a-89a9-04c343c559b9';
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange = (e) => {

  }

}
function darkandwhite() {
  var checkBox = document.getElementById("myCheck");
  var background = document.body; 
  if (checkBox.checked) {
    background.className = "w3-black";
    localStorage.setItem("mood", "Dark");
  } else {
    background.className = "w3-white"
    localStorage.removeItem('mood');
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

function chatbot() {
  var chatbox = document.getElementById("chatbox");
  chatbox.style.visibility = "visible";

}

function closechatbox() {
  var chatbox = document.getElementById("chatbox");
  chatbox.style.visibility = "hidden";
}


// function changelan() {
//   var checkBox = document.getElementById("lan");

//   if (checkBox.checked) {
//     location.replace("./indexgj.html")
//     localStorage.setItem("lan", "GUJ");
//   } else {
//     location.replace("./index.html")
//     localStorage.removeItem('lan');
//   }

// }