# kubernetes

 - Intro and Course Overview
 - What is K8s
 - Main K8s Components
 - K8s Architecture
 - Minikube and kubectl - Local Setup
 - Main Kubectl Commands - K8s CLI
 - K8s YAML Configuration File
 - Demo Project: MongoDB and MongoExpress
 - Organizing your components with K8s Namespaces
 - K8s Ingress explained
 - Helm - Package Manager
 - Persisting Data in K8s with Volumes
 - Deploying Stateful Apps with StatefulSet
 - K8s Services explained

## What is K8s
---
### Official defination of Kubernetes
- Open source `container` orchestration tool
- Developed by Google
- Help you `manage containerized application` in `different deployment environments`
### Need for
- Trend from Monolisth to Microservices
- Increased usage of containers
- Demenad for a proper way of managing those hundreds of container

### Feature do orchestration
- `Hign availability` or no downtime
- `scalability` or high perfomance
- `Dusaster recovery` - backup and restore
  

## Main K8s Components
---
pod:
- Smallest unit of K8s
- Abstraction over Continer
- Usually 1 application per pod
- Each Pod gets its own IP address
- new Ip address on re-creation


Service:
- permanent IP address
- lifecycle of Pod and Service NOT Connected
- load balancer
---
- External Service
- Internal Service

Ingress(External Service):

ConfigMap:
- external Configuration of your application

Secrat:
- used to store secret data
- base64 encoded
  
Volumes:
- stroage

Deployment:
- blue print for my-app pods
- you create Deployment
- abstraction of Pods
  
StatefulSet
- for statfuls app
  
`Deploying StatfulSet not east`
     

## K8s Architecture
---
### Node Processer( Worker machiene in k8s cluster)
- Each Node has miltiple Pods on it
- 3 Processer must be installed on every Node
- Worker Nodes do the actual Work

1. Kubelet
   - Kubelet inreracts with both -the container and node
   - kubelet starts the pod with a container inside

2. Kube proxy :- forwding requets
3. Container runtime

### Master Process
1. API server 
    - cluster gateway
    - acts as a gatekeeprt for aunthentication
2.  Scheduler
    - scheduler just decides on which Node new pod should be scheduled
    - where to put the Pod?
3.  Controller manager
    - detacts cluster stat changes
4.  etcd
    - etcd is the cluster brain
    - Cluster changas get stored in the key value store
       
## Minikube and kubectl - Local Setup
   
// todo

## Main Kubectl Commands - K8s CLI
  
Basic kubectl commands

### CRUD commands

- Create deployment :- `kubectl create deployment [name]`
- Edit deployment :-  `kubectl edit deployment [name]`
- Delete deployment :-  `kubectl delete deployment [name]`
  
### Status of different K8s components 
- `kubectl get node | pod | services | replicaset | deployment`

### debugging pods
- log to console :- `kubectl logs [pod-name]`
- Get interactive Terminal :- `kubectl exec -it [pod name] -- bin/bash`
- kubectl describe pod [pode-name]

### Use configuration file for CRUD
kubectl apply -f [filename]
kuvectl delete -f [filename]
  
e.g.
    
    kubectl create deployment nginx-depl --image=nginx
    kubectl get deployment
    kubectl get replicaset

###  layers of Abstraction

`Depoyment`   manages a > `ReplicaSet` manages a >`Pod` is an abstraction of >`Container`


Debugging pods

    kubectl cearate deployment mongo-depl --image=mongo
    kubectl describe pod [pode-name]
    kubectl logs mongo-depl-XXX-xxx
    kubectl exec -it mongo-depl-XXX-xxx -- bin/bash
    
    kubectl delete deployment nginx-depl

    kubectl apply -f filenname.yaml
    kubectl delete -f filename.yaml

  
## K8s YAML Configuration File

[nginx-deployments.yaml](./k8s/nginx-deployments.yaml)

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.16
        ports:
        - containerPort: 8080
  
```  
kubectl apply -f nginx-deployments.yaml


[nginx-service.yaml](./K8s/nginx-service.yaml)
```
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080 // pod target port 
```

kubectl apply -f nginx-service.yaml

## K8s YAML Configuration File
Each configuration file has 3 parths

1. `metadata` :: name
2. `specification` :: 
3. `status` ::

Blueprint of Pod
Deployment manage Pods

Template  
- has it's own metadate and spec section
- applied to pod
- blueprint of Pod


selector: 
    matchLable:
    app: nginx


kubectl describe service nginx-service

kubectl get pod -o wide

## Demo Project: MongoDB and MongoExpress
// TODO
- `2` Deployment / Pod
  - MongoDB
  - MongoExpress
- `2` Service
  - Internal service
  - External service Mongo express
- `1` ConfigMap
  - BD URL
- `1` Secrat
  - DB User
  - DB pwd

To create a secrat   
echo -n 'username' | base64

// todo

## Organizing your components with K8s Namespaces


## K8s Ingress explained
## Helm - Package Manager
## Persisting Data in K8s with Volumes
## Deploying Stateful Apps with StatefulSet
## K8s Services explained