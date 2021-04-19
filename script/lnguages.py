import json
f = open('course.json', 'r')

data = f.read()
lan = {''}
y = json.loads(data)
for course in  y['courses']:
    lan.add(course['language'])
print(lan)