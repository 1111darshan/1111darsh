# [Docker](https://youtu.be/3c-iBn73dDE)

# Docker container

- Intro and Course Overview
- What is Docker?
- What is a Container?
- Docker vs Virtual Machine
- Docker Installation
- Main Docker Commands
- Debugging a Container
- Demo Project Overview - Docker in Practice
- Developing with Containers
- Docker Compose - Running multiple services
- Dockerfile - Building our own Docker Image
- Private Docker Repository - Pushing our built Docker Image into a private Registry on AWS
- Deploy our containerized app
- Docker Volumes - Persist data in Docker
- Volumes Demo - Configure persistence for our demo project
- Wrap Up

## What is Docker?
- A way to package application  with all the necessary dependencies and configuration
- Protable artifact, easily shared and moved around 
- Makes development and deployment more efficient


## where do containeres live?
Container Repository
Private repositories
Public repository for Docker
```
     docker run postgras:10.10
     docker run -d radis
     docker ps
     
     docker run -p 
     docker exec 
```



## Main Docker Commands
    
Pull a docker images from Docker Hub
> docker pull 

     docker pull radis

Check a docker images in system
     
     docker images

Run a Radis continer (Create a docker continer)

     docker run radis
> using tags

     docker run radis:4.0 

Run Container in detach mood

     docker run -d radis
> using port

     docker run -p6000:6379 radis
     docker run -p6001:6379 radis
> usuing name 

     docker run -d -p6001:6379 --name [caintainer-name] radis

Start contaier 
>docker start

     docker start [container id/name ]

Stop contaier
> docker stop

       docker stop [container id/name ]

Check Running container 

     docker ps

Check All container

     dockr ps -a

### Contianer Port and Host port

     [Host port]:[container port]

## Debugging a Container

>docker logs 

     docker logs [cointainer name/id] 

>docker exec -t

     docker exec -it  [cointainer-id] /bin/bash     

## Demo Project Overview - Docker in Practice


Docker Hub > Mongo DB , js >~commit~> Git > jenkins > Docker Repository > 
   
HTML, JS -- [Frontend](./index.html)

Node     -- [Backend](./server.js)
 
database -- [Mongodb](https://hub.docker.com/_/mongo) 


### Doceker Network
```
     docker network ls
     
     docker network create mongo-network

     docker run -d \
     -p 27017:27017 \
     -e MONGO_INITDB_ROOT_USERNAME=admin \
     -e MONGO_INITDB_ROOT_PASSWORD=password \
     --name mongodb \
     --net mongo-netework \  
     mongo


     docker run -d \
    -p 8081:8081 \
    -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
    -e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
    --net mongo-network  \
    --name mongo-express \
    -e ME_CONFIG_MONGODB_SERVER="mongodb" \
    mongo-expres
```
## Docker Compose - Running multiple services
[mongo-docker-compose.yaml](./mongo-docker-compose.yaml)

```
version: '3'
services:
  my-app:
    image: <usaername>/my-app:0.1
    ports:
     - 3000:3000
  mongodb:
    image: mongo
    ports:
     - 27017:27017
    volumes:
      - mongo-data:/data/db
    enviroment:
     - MONGO_INITDB_ROOT_USERNAME=admin 
     - MONGO_INITDB_ROOT_PASSWORD=password
    
  mongo-express:
    image: mongo-express
    ports:
     - 8081:8081
    enviroment:
     - ME_CONFIG_MONGODB_ADMINUSERNAME=admin
     - ME_CONFIG_MONGODB_ADMINPASSWORD=password
     - ME_CONFIG_MONGODB_SERVER="mongodb"  

volumes:
  mongo-data:
    driver: local
```
> docker-compose -f mongo.yaml up
>
> docker-compose -f mongo.yaml down
 
## Dockerfile - Building our own Docker Image
Blueprint of docker images

- FROM :-  Main image
- ENV :-  Optionally define environment variables
- RUN :-  execute any Linux Commands 
- COPY :- execute on a host. cp [host path] [cointainer path]
- CMD :- entrypoint command
 
[Dockerfile](./Dockerfile)

     FROM node
     ENV ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
     ME_CONFIG_MONGODB_ADMINPASSWORD=password

     RUN  mkdir -p /home/app
     COPY ./app /home/app

     CMD ["node", "/home/app/server.js"]

> docker build -t [image-name] [path-of-Dockerfile]

     docker build -t my-app 


## Private Docker Repository - Pushing our built Docker Image into a private Registry on AWS

AWS Console >> ECR >> Create Repository

```
docker images

docker login

aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 476536695493.dkr.ecr.us-east-2.amazonaws.com
```

### ImgaheNaming
``` 
docker pull 476536695493.dkr.ecr.us-east-2.amazonaws.com/image-name:tags
docker tag my-app:1.0 476536695493.dkr.ecr.us-east-2.amazonaws.com/image-name:tags
docker push 476536695493.dkr.ecr.us-east-2.amazonaws.com/image-name:tags
```
## Deploy our containerized app


## Docker Volumes - Persist data in Docker
user for data persistance

3 Volume Types
- Host Volume
     `docker run -v [host-path]:[cointainer-path]`
- Anonotmous Volumes
     `docker run -v [cointainer-path]`
- Named volumes
    `docker run -v name:[cointeiner-path]`


## Volumes Demo - Configure persistence for our demo project



## Wrap Up
