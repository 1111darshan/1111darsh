var COURSES = `
{
    "courses": [
        {
            "index": 1,
            "link": "https://www.udemy.com/course/network-protocol-analysis-using-wireshark-part-1/?couponCode=VINOAPR3",
            "Name": "Network Protocol Analysis Using Wireshark Part-1",
            "rating": "4.4"
        },
        {
            "index": 2,
            "link": "https://www.udemy.com/course/learn-website-design/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-Eu8Xq38ZsL1vua5lN.g7bQ&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=3DAYSFREE",
            "Name": "Professional Website Design + WordPress Website Development",
            "rating": "0.0"
        },
        {
            "index": 3,
            "link": "https://www.udemy.com/course/html-css-certification-course-for-beginners/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-DTCZngTgSWeEcP.ZBaxnxw&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=YOUACCEL39550",
            "Name": "HTML & CSS - Certification Course for Beginners",
            "rating": "4.3"
        },
        {
            "index": 4,
            "link": "https://www.udemy.com/course/remote-teaching-how-to-record-lectures-at-home/?couponCode=91A17BDDB8BE0594D583",
            "Name": "Remote Teaching Online // How To Record Lectures at Home",
            "rating": "4.4"
        },
        {
            "index": 5,
            "link": "https://www.udemy.com/course/ibm-security-qradar-fundamental-administration-deployment/?couponCode=694BAAE802907FDC85DD",
            "Name": "IBM Security QRadar Fundamental Administration & Deployment",
            "rating": "0.0"
        },
        {
            "index": 6,
            "link": "https://www.udemy.com/course/gcp-professional-cloud-architect-practice-exams-mar-21/?couponCode=9FAB74158E507CD3E123",
            "Name": "GCP | Professional Cloud Architect | Practice Exams | MAR 21",
            "rating": "4.6"
        },
        {
            "index": 7,
            "link": "https://www.udemy.com/course/outsourcing-tripling-productivity/?couponCode=3DAYSFREE",
            "Name": "Outsourcing + Google Tools + Tripling Productivity Tactics",
            "rating": "0.0"
        },
        {
            "index": 8,
            "link": "https://www.udemy.com/course/getting-started-with-microsoft-excel/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-ynkFZmKZWP5I5wJUghseZg&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=37F25010F9947E16E452",
            "Name": "Microsoft Excel Zero to Advanced: Data Analysis & Dashboards",
            "rating": "4.5"
        },
        {
            "index": 9,
            "link": "https://www.udemy.com/course/learn-affinity-publisher-from-scratch-in-less-time/?couponCode=FINDMEFAKHARAYUB",
            "Name": "Learn Affinity Publisher from Scratch in Less Time",
            "rating": "0.0"
        },
        {
            "index": 10,
            "link": "https://www.udemy.com/course/social-media-marketing-boost/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-SKYEReRzSrLT0p8Z9cvn3g&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=3DAYSFREE",
            "Name": "Social Media Marketing: Boost Business w/ Content & Stories",
            "rating": "0.0"
        },
        {
            "index": 11,
            "link": "https://www.udemy.com/course/build-grow-shopify-store/?couponCode=3DAYSFREE",
            "Name": "Build & Grow Your Shopify Store: Ecommerce & Dropshipping",
            "rating": "5.0"
        }
    ],
    "Total_course": 11
}
`

let reader = new FileReader();
var file = fetch('courses.json');



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
