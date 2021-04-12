var COURSES = `

`

var courses = document.getElementById("courses");
var json = JSON.parse(COURSES)
for (i in json.courses) {
    create_course(json.courses[i].link, json.courses[i].Name, json.courses[i].rating);
}


function create_course(course_link, Course_Name, rating) {

    var card = document.createElement("div");
    var att = document.createAttribute("class");
    att.value = "w3-container w3-card  w3-margin-bottom click-me";
    card.setAttributeNode(att)
    courses.appendChild(card);


    var as = document.createElement("a")
    var link = document.createAttribute("href")
    as.style = "text-decoration: none"
    link.value = course_link
    as.setAttributeNode(link)
    card.appendChild(as)


    var h2 = document.createElement("h2");
    h2.value = "course";
    var att1 = document.createAttribute("class");
    att1.value = " w3-text-grey w3-padding-16"
    var coursename = document.createTextNode(Course_Name)
    h2.appendChild(coursename)
    h2.setAttributeNode(att1)
    as.appendChild(h2);

    var starrating = document.createElement("div")
    var attrating = document.createAttribute("class")
    attrating.value = "rating"
    starrating.setAttributeNode(attrating)
    var ratingtaxt = document.createTextNode("  "+rating)
    
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
    

}
