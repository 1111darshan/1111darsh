async function getAPI(){
    let host = "http://127.0.0.1:5500"
    let response = await fetch(host + "/New/json/panel.json");
    let data = await response.json()
    return data;
  }

//getAPI().then(data => create_panel(data) );


function create_panel(json) {
    var panel = document.getElementById("panel")
    for (var i = 0; i < 11 ; i++) {
        console.log(json[i].image)
        var img = document.createElement("img");
        var att = document.createAttribute("src") 
        att.value =  json[i].image
        var width= document.createAttribute("class")
        width.value = "nevi"
        img.setAttributeNode(width)
        img.setAttributeNode(att)
        panel.appendChild(img)

    }
    }
