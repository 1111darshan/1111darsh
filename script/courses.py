import requests
import json
from bs4 import BeautifulSoup


def linkdata(url, i):
    courseslink = requests.get(url)
    soup = BeautifulSoup(courseslink.content, 'html.parser')
    # print(soup.prettify())
    """
    <h1 class="udlite-heading-xl clp-lead__title clp-lead__title--small" data-purpose="lead-title">
    Remote Teaching Online // How To Record Lectures at Home
    </h1>
    """
    title = soup.find(
        'h1', class_="udlite-heading-xl clp-lead__title clp-lead__title--small").get_text()
    title = title.strip("\n")
    """
    <span class="udlite-heading-sm star-rating--rating-number--3lVe8" aria-hidden="true" data-purpose="rating-number">4.4</span>
    """
    rating = soup.find(
        'span', class_="udlite-heading-sm star-rating--rating-number--3lVe8").get_text()

    """<div class="clp-lead__element-item clp-lead__locale" data-purpose="lead-course-locale">
        <span class="icon">
        <svg aria-hidden="true" class="udlite-icon udlite-icon-xsmall udlite-icon-color-neutral ">
             <use xlink:href="#icon-language"></use>
        </svg>
        </span>
        English
        </div>
    """
    language = soup.find('div', class_="clp-lead__element-item clp-lead__locale").get_text()
    language = language.strip("\n")
    print(language)
    return {"index": i, "link": url, "Name": title, "rating": rating, "language" : language }


courses_list = []

f = open('links', 'r')
line_list = f.readlines()
i = 0
for line in line_list:
    i += 1
    url = line.strip('\n')
    courses_list.append(linkdata(url, i))

#courses_list

output = {
    "courses": courses_list,
    "Total_course": i
}

print(json.dumps(output))

f2 = open('course.json', 'w')
f2.write(json.dumps(output))
# print(linkdata("https://www.udemy.com/course/introduction-to-microservices-edyoda/?couponCode=FREEAPR2", 1))