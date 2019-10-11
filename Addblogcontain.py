
from bs4 import BeautifulSoup as Soup
#filename=input()
filename="Blog3p.html"
print(filename)


f= open(filename,"r+")
line=f.read()


soup = Soup(line)

title = soup.find('h5')
p = soup.new_tag('p')
p.string="""Docker is a container Engine containing Images and  Docker container . Docker images is a Blue Print of a container. And container is a Small size running Virtual Machine.

In old Virtualization System there is hypervisor which provides Hardware Virtualization for a Guest OS. There is new Kernel installed on the hypervisor. If there are 3 OS installed on a Hypervisor, then 2 Different kernels are installed on Hypervisor. All Images(.iso) file contain OS libraries with Kernel. So it’s sizes reaches from 1 GB upto 5 GB. we need minimum 5 to 10 GB of Space and 512 MB to 8 GB of Ram to install the OS and run it.
Instead of all this lengthy process, we have simple and better solution of Docker.
Docker container use host system kernel and it contains only required libraries. It’s images size is also small. Docker engine gives same environment as virtual Machine.
 Yes, but the Question is this Why we need the Docker in a DevOps Work flow?    
Docker provides vitalization architecture so we can use same environment for Developing, Testing and Production Server. Developer Code on their Laptop on a container then it can checks on the tester side that same configuration with tester side and checks if it  is also deployed in Production Server.   
"""

title.insert(0,p)

print(soup)
#fw = open(filename,'w')
#fw.write(str(soup))


