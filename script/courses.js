var COURSES = `
{
    "courses": [
        {
            "index": 1,
            "link": "https://www.udemy.com/course/introduction-to-microservices-edyoda/?couponCode=FREEAPR2",
            "Name": "Introduction to Microservices",
            "rating": "3.9"
        },
        {
            "index": 2,
            "link": "https://www.udemy.com/course/the-ultimate-mysql-crash-course-2021/?couponCode=MYSQLCOURSE21",
            "Name": "The Ultimate MySQL Crash Course 2021",
            "rating": "0.0"
        },
        {
            "index": 3,
            "link": "https://www.udemy.com/course/foundation-course-for-building-an-investment-portfolio/?couponCode=PORTFOLIO-FOUNDATION",
            "Name": "Finance Fundamentals for Building an Investment Portfolio",
            "rating": "3.6"
        },
        {
            "index": 4,
            "link": "https://www.udemy.com/course/learn-visual-studio-code-v/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-_OUXFXPJBCs_rqZST037sw&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=TRY10FREE42105",
            "Name": "Visual Studio Code",
            "rating": "4.0"
        },
        {
            "index": 5,
            "link": "https://www.udemy.com/course/the-learn-jquery-course/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-jw4if27R4DBrnphXKehbMA&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=TRY10FREE42105",
            "Name": "jQuery Ultimate Course",
            "rating": "4.3"
        },
        {
            "index": 6,
            "link": "https://www.udemy.com/course/learn-microsoft-teams/?couponCode=TRY10FREE42105",
            "Name": "Learn Microsoft Teams",
            "rating": "3.6"
        },
        {
            "index": 7,
            "link": "https://www.udemy.com/course/adobe-xd-cc-2020-master-course/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-_CKZTvu5sXXp4rOSrweaHw&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=TRY10FREE42105",
            "Name": "Adobe XD CC 2020",
            "rating": "4.2"
        },
        {
            "index": 8,
            "link": "https://www.udemy.com/course/learn-photo-editing-with-photoshop-2020/?couponCode=TRY10FREE42105",
            "Name": "Learn Photo Editing with Photoshop 2020",
            "rating": "4.3"
        },
        {
            "index": 9,
            "link": "https://www.udemy.com/course/learn-advanced-svg/?couponCode=TRY10FREE42105",
            "Name": "Learn Advanced SVG",
            "rating": "3.6"
        },
        {
            "index": 10,
            "link": "https://www.udemy.com/course/learn-advanced-bootstrap-4/?couponCode=TRY10FREE42105",
            "Name": "Learn Advanced Bootstrap 4",
            "rating": "4.2"
        },
        {
            "index": 11,
            "link": "https://www.udemy.com/course/cpanel-course/?couponCode=TRY10FREE42105",
            "Name": "cPanel",
            "rating": "4.1"
        },
        {
            "index": 12,
            "link": "https://www.udemy.com/course/server-infrastructure/?couponCode=TRY10FREE42105",
            "Name": "Server Infrastructure",
            "rating": "3.7"
        },
        {
            "index": 13,
            "link": "https://www.udemy.com/course/java-web-services-course/?couponCode=TRY10FREE42105",
            "Name": "Java Web Services",
            "rating": "3.8"
        },
        {
            "index": 14,
            "link": "https://www.udemy.com/course/learn-economics-from-scratch-eco01/?couponCode=7D9F982EF1CCF4362024",
            "Name": "Learn Economics from scratch, ECO01",
            "rating": "3.9"
        },
        {
            "index": 15,
            "link": "https://www.udemy.com/course/setsa-selfempowerment/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-_XCFAPeXm99s8MUp7qTwHw&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=RAMGIFT2021",
            "Name": "Raise Self Awareness. Build Self-Esteem. Feel Freer, Happier",
            "rating": "4.7"
        }
    ],
    "Total_course": 15
}
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
