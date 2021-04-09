import requests, json
from bs4 import BeautifulSoup
url = "https://www.udemy.com/course/ibm-security-qradar-fundamental-administration-deployment/?couponCode=694BAAE802907FDC85DD"
def linkdata(url):

    courseslink = requests.get(url)
    soup = BeautifulSoup(courseslink.content, 'html.parser')
    #print(soup.prettify())
    """
    <h1 class="udlite-heading-xl clp-lead__title clp-lead__title--small" data-purpose="lead-title">
    Remote Teaching Online // How To Record Lectures at Home
    </h1>
    """
    title = soup.find('h1', class_="udlite-heading-xl clp-lead__title clp-lead__title--small" ).get_text()
    title = title.strip("\n")
    """
    <span class="udlite-heading-sm star-rating--rating-number--3lVe8" aria-hidden="true" data-purpose="rating-number">4.4</span>
    """
    rating = soup.find('span', class_="udlite-heading-sm star-rating--rating-number--3lVe8").get_text()

    return { "link" : url, "Name" : title, "rating" : rating }
 
single_data = linkdata(url)

courses_list=[]

f = open('links', 'r')
line_list = f.readlines()
for line in line_list:
    url = line.strip('\n')
    courses_list.append(linkdata(url))

courses_list

output = {
    "courses": courses_list
} 

print(json.dumps(output))

f2 = open('course.json', 'w')
f2.write(json.dumps(output))

