import requests, json
from bs4 import BeautifulSoup


def linkdata(url, i):
    courseslink = requests.get(url, timeout=(5,10 ))
    soup = BeautifulSoup(courseslink.content, 'html.parser')

    free = soup.find_all('b')
    print(free)

linkdata("https://www.udemy.com/course/gcp-professional-cloud-architect-practice-exams-mar-21/?couponCode=9FAB74158E507CD3E123" , 1)


# f = open('course.json', 'r')
# y = json.loads(f.read())


# courses = y['courses']
# for course in courses:
#     print(course['index'] )

