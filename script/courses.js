var COURSES = `{
    "courses":
    [
        {"link" : "https://www.udemy.com/course/successful-cross-cultural-management/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-MX1VkOpVD0qEXpkfL5QvYg&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=APR2021",
         "Name" : "Successful cross-cultural management"},
  
        {"link" : "https://www.udemy.com/course/network-protocol-analysis-using-wireshark-part-1/?couponCode=VINOAPR3",
         "Name" : "Network Protocol Analysis Using Wireshark Part-1"},
        {"link" : "https://www.udemy.com/course/learn-website-design/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-Eu8Xq38ZsL1vua5lN.g7bQ&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=3DAYSFREE", 
        "Name" : "Professional Website Design + WordPress Website Development"}
        
    ]
}`
/*

{"link" : "", 
"Name" : ""}

*/
var courses = document.getElementById("courses");
var json = JSON.parse(COURSES)
for (i in json.courses) {
    create_course(json.courses[i].link,json.courses[i].Name); 
  }


function create_course(course_link, Course_Name) {
    
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
}
