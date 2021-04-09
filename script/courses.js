var COURSES = `{
"courses":
[
{"link" : "https://www.udemy.com/course/successful-cross-cultural-management/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-MX1VkOpVD0qEXpkfL5QvYg&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=APR2021",
"Name" : "Successful cross-cultural management"},

{"link" : "https://www.udemy.com/course/network-protocol-analysis-using-wireshark-part-1/?couponCode=VINOAPR3",
"Name" : "Network Protocol Analysis Using Wireshark Part-1"},

{"link" : "https://www.udemy.com/course/learn-website-design/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-Eu8Xq38ZsL1vua5lN.g7bQ&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=3DAYSFREE", 
"Name" : "Professional Website Design + WordPress Website Development"},

{"link" : "https://www.udemy.com/course/html-css-certification-course-for-beginners/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-DTCZngTgSWeEcP.ZBaxnxw&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=YOUACCEL39550", 
"Name" : "HTML & CSS - Certification Course for Beginners"},

{"link" : "https://www.udemy.com/course/fullstack-go-golang-nodejs-python-php-sci-fi-dev-framework/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-s4DejEHkTvlZF4c6tRsirw&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=A34D13EA49D5CB143FE1", 
"Name" : "Fullstack Go Golang Node.Js Python PHP Sci Fi Dev Framework"},

    {
        "link": "https://www.udemy.com/course/remote-teaching-how-to-record-lectures-at-home/?couponCode=91A17BDDB8BE0594D583",
        "Name": "Remote Teaching Online // How To Record Lectures at Home",
        "rating": "4.4"
    },
    {
        "link": "https://www.udemy.com/course/ibm-security-qradar-fundamental-administration-deployment/?couponCode=694BAAE802907FDC85DD",
        "Name": "IBM Security QRadar Fundamental Administration & Deployment",
        "rating": "0.0"
    },
    {
        "link": "https://www.udemy.com/course/gcp-professional-cloud-architect-practice-exams-mar-21/?couponCode=9FAB74158E507CD3E123",
        "Name": "GCP | Professional Cloud Architect | Practice Exams | MAR 21",
        "rating": "4.6"
    }


]
}`
/*


{"link" : "", 
"Name" : ""}

*/
let reader = new FileReader();
var file = fetch('courses.json');



var courses = document.getElementById("courses");
var json = JSON.parse(COURSES)
for (i in json.courses) {
    create_course(json.courses[i].link, json.courses[i].Name);
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
