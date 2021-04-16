var COURSES = `
{
    "courses": [
        {
            "index": 1,
            "link": "https://www.udemy.com/course/introduction-to-microservices-edyoda/?couponCode=FREEAPR2",
            "Name": "Introduction to Microservices",
            "rating": "3.9",
            "language": "English"
        },
        {
            "index": 2,
            "link": "https://www.udemy.com/course/the-ultimate-mysql-crash-course-2021/?couponCode=MYSQLCOURSE21",
            "Name": "The Ultimate MySQL Crash Course 2021",
            "rating": "0.0",
            "language": "English"
        },
        {
            "index": 3,
            "link": "https://www.udemy.com/course/foundation-course-for-building-an-investment-portfolio/?couponCode=PORTFOLIO-FOUNDATION",
            "Name": "Finance Fundamentals for Building an Investment Portfolio",
            "rating": "3.6",
            "language": "English"
        },
        {
            "index": 4,
            "link": "https://www.udemy.com/course/learn-visual-studio-code-v/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-_OUXFXPJBCs_rqZST037sw&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=TRY10FREE42105",
            "Name": "Visual Studio Code",
            "rating": "4.0",
            "language": "English"
        },
        {
            "index": 5,
            "link": "https://www.udemy.com/course/the-learn-jquery-course/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-jw4if27R4DBrnphXKehbMA&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=TRY10FREE42105",
            "Name": "jQuery Ultimate Course",
            "rating": "4.3",
            "language": "English"
        },
        {
            "index": 6,
            "link": "https://www.udemy.com/course/learn-microsoft-teams/?couponCode=TRY10FREE42105",
            "Name": "Learn Microsoft Teams",
            "rating": "3.6",
            "language": "English"
        },
        {
            "index": 7,
            "link": "https://www.udemy.com/course/adobe-xd-cc-2020-master-course/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-_CKZTvu5sXXp4rOSrweaHw&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=TRY10FREE42105",
            "Name": "Adobe XD CC 2020",
            "rating": "4.2",
            "language": "English"
        },
        {
            "index": 8,
            "link": "https://www.udemy.com/course/learn-photo-editing-with-photoshop-2020/?couponCode=TRY10FREE42105",
            "Name": "Learn Photo Editing with Photoshop 2020",
            "rating": "4.3",
            "language": "English"
        },
        {
            "index": 9,
            "link": "https://www.udemy.com/course/learn-advanced-bootstrap-4/?couponCode=TRY10FREE42105",
            "Name": "Learn Advanced Bootstrap 4",
            "rating": "4.2",
            "language": "English"
        },
        {
            "index": 10,
            "link": "https://www.udemy.com/course/cpanel-course/?couponCode=TRY10FREE42105",
            "Name": "cPanel",
            "rating": "4.1",
            "language": "English"
        },
        {
            "index": 11,
            "link": "https://www.udemy.com/course/learn-economics-from-scratch-eco01/?couponCode=7D9F982EF1CCF4362024",
            "Name": "Learn Economics from scratch, ECO01",
            "rating": "3.9",
            "language": "English"
        },
        {
            "index": 12,
            "link": "https://www.udemy.com/course/setsa-selfempowerment/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-_XCFAPeXm99s8MUp7qTwHw&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=RAMGIFT2021",
            "Name": "Raise Self Awareness. Build Self-Esteem. Feel Freer, Happier",
            "rating": "4.7",
            "language": "English"
        },
        {
            "index": 13,
            "link": "https://www.udemy.com/course/liberez-votre-confiance-en-soi-et-votre-estime-de-soi/?couponCode=6C324115518AF05A4EFC",
            "Name": "CONFIANCE: Booster Votre Confiance Et Estime De Vous M\u00eame",
            "rating": "4,0",
            "language": "Fran\u00e7ais"
        },
        {
            "index": 14,
            "link": "https://www.udemy.com/course/mastering-architectural-night-hdr-photography/?couponCode=HDRAPR2021",
            "Name": "Mastering Architectural, Night & HDR Photography",
            "rating": "3.9",
            "language": "English"
        },
        {
            "index": 15,
            "link": "https://www.udemy.com/course/ocp-java-se-11-developer-exam-1z0-819-practice-tests/?couponCode=FREEDAYS",
            "Name": "OCP Java\u00ae SE 11 Developer Exam 1Z0-819 Practice Tests",
            "rating": "0.0",
            "language": "English"
        },
        {
            "index": 16,
            "link": "https://www.udemy.com/course/learn-economics-from-stratch-eco02/?couponCode=9F26D4D1898ACF56E449",
            "Name": "Learn Economics from scratch, ECO02",
            "rating": "2.5",
            "language": "English"
        },
        {
            "index": 17,
            "link": "https://www.udemy.com/course/comment-creer-votre-cours-en-ligne-a-succes-rapidement/?couponCode=DC3385261AD3883728AD",
            "Name": "Comment Cr\u00e9er Votre Cours En Ligne A Succ\u00e8s Rapidement",
            "rating": "4,4",
            "language": "Fran\u00e7ais"
        },
        {
            "index": 18,
            "link": "https://www.udemy.com/course/developpez-vos-competences-relationnelles-et-sociales/?couponCode=EB224DE94E5343D14C1C",
            "Name": "D\u00e9veloppez Vos Comp\u00e9tences Relationnelles et Sociales",
            "rating": "5,0",
            "language": "Fran\u00e7ais"
        },
        {
            "index": 19,
            "link": "https://www.udemy.com/course/kanban-fundamentos-certificacion/?couponCode=21C46CCD250D11C3758A",
            "Name": "Kanban Introducci\u00f3n basado Certificaci\u00f3n de CertiProf",
            "rating": "4.2",
            "language": "Spanish"
        },
        {
            "index": 20,
            "link": "https://www.udemy.com/course/scrum-master-espanol/?couponCode=3B5FFE1AE83CB7A35E54",
            "Name": "[2021] Scrum Master Certificaci\u00f3n con CertiProf",
            "rating": "4.3",
            "language": "Spanish"
        },
        {
            "index": 21,
            "link": "https://www.udemy.com/course/programlama-dilleriyle-orta-ileri-seviye-etik-hacker-kursu/?couponCode=39D843A52B5862918519",
            "Name": "Programlama Dilleriyle Orta, \u0130leri Seviye Etik Hacker Kursu",
            "rating": "4,0",
            "language": "T\u00fcrk\u00e7e"
        },
        {
            "index": 22,
            "link": "https://www.udemy.com/course/introduccion-a-nodejs-para-verdaderos-principiantes/?couponCode=E69815F0369FC2139681",
            "Name": "Introducci\u00f3n a Nodejs",
            "rating": "5.0",
            "language": "Spanish"
        },
        {
            "index": 23,
            "link": "https://www.udemy.com/course/work-better-with-others/?couponCode=FACEBOOK2021",
            "Name": "Interpersonal skills - work better with others!",
            "rating": "5.0",
            "language": "English"
        },
        {
            "index": 24,
            "link": "https://www.udemy.com/course/beginner-video-production-video-creation-for-youtube/?couponCode=7B3FD28636F90F6D8425",
            "Name": "Beginner: Improve Video Production & Video Creation In 1 Day",
            "rating": "4.7",
            "language": "English"
        },
        {
            "index": 25,
            "link": "https://www.udemy.com/course/google-slides-course/?couponCode=E61971172090D27BAEF2",
            "Name": "Google Slides Presentation Using Canva For Non-Designers",
            "rating": "4.6",
            "language": "English"
        },
        {
            "index": 26,
            "link": "https://www.udemy.com/course/microsoft-excel-the-complete-intro/?couponCode=1A5E064EEC9BD48E1CAC",
            "Name": "Ms Excel/Excel 2021 - The Complete Introduction to Excel",
            "rating": "4.3",
            "language": "English"
        },
        {
            "index": 27,
            "link": "https://www.udemy.com/course/dca-docker-certified-associate-dca-practice-test-2021/?couponCode=63673E341EE95315C8C2",
            "Name": "DCA : Docker Certified Associate (DCA) Practice Test 2021",
            "rating": "0.0",
            "language": "English"
        },
        {
            "index": 28,
            "link": "https://www.udemy.com/course/japanese-for-beginners-based-on-misj-version-2/?couponCode=SECTION_3-OWNERS",
            "Name": "Japanese for beginners based on MISJ (Version 2)",
            "rating": "0.0",
            "language": "\u65e5\u672c\u8a9e"
        },
        {
            "index": 29,
            "link": "https://www.udemy.com/course/misj-novice-program-level-1/?ranMID=39197&ranEAID=bnwWbXPyqPU&ranSiteID=bnwWbXPyqPU-WcN15bibHvwpZ0jsEbpUMw&LSNPUBID=bnwWbXPyqPU&utm_source=aff-campaign&utm_medium=udemyads&couponCode=SECTION-3-OWNERS",
            "Name": "Japanese language course: MISJ NOVICE PROGRAM LEVEL 1",
            "rating": "4.4",
            "language": "English"
        }
    ],
    "Total_course": 29
}
`

var courses = document.getElementById("courses");
var json = JSON.parse(COURSES)
for (i in json.courses) {
    create_course(json.courses[i].link, json.courses[i].Name, json.courses[i].rating, json.courses[i].language );
}


function create_course(course_link, Course_Name, rating, language) {

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
