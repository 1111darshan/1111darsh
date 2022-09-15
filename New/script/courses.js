
async function getAPI(){
    let host = "http://127.0.0.1:5500"
    let response = await fetch(host + "/New/json/course.json");
    let data = await response.json()
    return data;
  }


getAPI().then(data => fillcourse(data) );
var courses = document.getElementById("courses");
function fillcourse(json) {

for (i in json.courses) {
    
    create_course(json.courses[i].index ,json.courses[i].link, json.courses[i].Name, json.courses[i].rating, json.courses[i].language );
}
}

function create_course(index,course_link, Course_Name, rating, language) {

    var card = document.createElement("div");
    var att = document.createAttribute("class");
    att.value = "click-me";
    card.setAttributeNode(att)
    courses.appendChild(card);


    var as = document.createElement("a")
    var link = document.createAttribute("href")
    as.style = "text-decoration: none"
    var index = document.createTextNode(index+". ")
    link.value = course_link
    as.setAttributeNode(link)
    card.appendChild(as)




    var h2 = document.createElement("h2");
    h2.value = "course";
    var att1 = document.createAttribute("class");
    att1.value = " w3-text-grey w3-padding-16"
    var coursename = document.createTextNode(Course_Name)
    h2.appendChild(index)
    h2.appendChild(coursename)
    h2.setAttributeNode(att1)
    as.appendChild(h2);

    var starrating = document.createElement("div")
    var attrating = document.createAttribute("class")
    attrating.value = "rating"
    starrating.setAttributeNode(attrating)
    var ratingtaxt = document.createTextNode("  "+rating)
    var language = document.createTextNode(" \t "+language)

    for (var i = 0, j = 0; i < 5; i++, j++) {
        var star = document.createElement("span")
        var att2 = document.createAttribute("class");
        if (j < parseInt(rating)) {
            att2.value = "fa fa-star checked"
        }
        else {
            att2.value = "fa fa-star"
        }
        star.setAttributeNode(att2)
        starrating.appendChild(star)
    }
    h2.appendChild(starrating)
    starrating.appendChild(ratingtaxt)
    starrating.appendChild(language)
}
