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
- `Disaster recovery` - backup and restore
  

## Main K8s Components
---
pod:
- Smallest unit of K8s
- Abstraction over Continer
- Usually 1 application per pod
- Each Pod gets its own IP address
- New IP address on re-creation


Service:
- Permanent IP address
- Lifecycle of Pod and Service NOT Connected
- Load balancer
  
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
    - acts as a gatekeeper for aunthentication
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

>kubectl apply -f [filename]

>kubectl delete -f [filename]
  
e.g.
    
    kubectl create deployment nginx-depl --image=nginx
    kubectl get deployment
    kubectl get replicaset

###  layers of Abstraction

`Deployment`   manages a > `ReplicaSet` manages a >`Pod` is an abstraction of >`Container`


Debugging pods

    kubectl create deployment mongo-depl --image=mongo
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

Namespace
- Organice resources in namespaces
- Virtual cluster inside a cluster 

4 Namespaces per Default
- kube-system
  - Do not creatre or modify in kube-system  
  - system processes
- kube-public
  - publicely accessible date
  - A confingmap, which, contains cluster information
- kube-node-least
  - heartbeats of node
  - each node has associated lease object in namespace
  - determines tht availability of a node
- kubernetes-deshboard
  - only with minikube
- default 


Create a namesapce with a configuration file
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: mysql-confingmap
  namespace: my-namespace
data:
  db_url: mysql-service.database
```
`What is name space?`
- Cluster inside a cluster
- Default Namespaces

`Need of namespaces`
- Resources grouped in Namespaces
  - ig. Database, Monitoring ....
- Conflicts: Many treams, same application 
- Resource Sharing: Staging and Development
- Resource Sharing: Blue/Green Deployment
- Access and Resources Limits on Namespaces
  

`You can't access most resources from another Namaspaces`

Each NS must define own ConfigMap

> Compoinents, which can't be created within a Namespace
- live globally in a cluster
- you can't isolate them


```
kubectl api-resources --namespaced=false
kubectl api-resources --namespaced=true
```
### Change active namespace 
kubens 
```
kubens my-namespace
```

## K8s Ingress explained
```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-app
spec:
  rules:
  - host: myapp.com
    http:
      paths:      //URL path 
      - backend:
          serviceName: kubernetes-dashboard
          servicePort: 80
``` 
Routing rules:
    Forward request to the internal service.

Host:
-  vaild domain address
-  map domain name to Node's IP address, which is th entrypoint  

  

You need an implemetation for Ingress! Which is Ingress Controller
- evaluates and provesses Ingress rules
- evaluates all the rules 
- manages rediractions
- entrypoint to cluster
- many third-party implementations 
- K8s Nginx Ingress Controller 
    
## Helm - Package Manager
// todo


## Persisting Data in K8s with Volumes
1. Persistent Volume 
2. Persistent Volume Claim
3. Storage class
    

Stroage Requiments
- Stroage that doesn't depend on the pod lifecycle.
- Storage must be available on all node
- Storage needs to servive even if cluster crashes.

### Persistent Volume          
- a cluster resource 
- created via YAML file
  - kind: PersistentVolume
  - spec: e.g. How much storage? 

#### NFS Stroage
```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-name
spec:
  capacity:
    storage: 5Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Recycle
  storageClassName: slow
  mountOptions:
    - hard
    - nfsvers=4.0
  nfs:
    path: /dir/path/on/nfs/server
    server: nfs-server-ip-address

```

####  Google Cloud
```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: test-volume
  labels:
    failure-domain.beta.kubernetes.io/zone: us-central1-a__us-central1-b
spec:
  capacity:
    storage: 400Gi
  accessModes:
  - ReadWriteOnce
  gcePersistentDisk:
    pdName: my-data-disk
    fsType: ext4
```

#### local stroage

``` 
apiVersion: v1
kind: PersistentVolume
metadata:
  name: example-pv
spec:
  capacity:
    storage: 100Gi
  volumeMode: Filesystem
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Delete
  storageClassName: local-storage
  local:
    path: /mnt/disks/ssd1
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - example-node   
```
  

### Stroage Class
kind: StrageClass
 
  -  via "Provisioner" attribute
  -  each stroage beckend has own provisioner
  -  internal provisioner - "kubernetes.io"
  -  external provisioner
  

// review ^^^^^^

## Deploying Stateful Apps with StatefulSet
  
Statefulset for statful application
statful applications
- examples of stateful applications: 
  databases:- mysql, elasticsearch, mongoDB
applications that stores data    


## K8s Services explained
  
1. ClusterIP Services
   1. default   type of service
   - microservice app deployed
   - side-car container
2. Headless services
3. NodePort Service
4. LoadBalancer
       
-Each Pod has its own IP address, Pods are eohemeral, pods are destroyed frequently
- service:
  - Stable IP address
  - loadbalancing
  - loose coupling
  - within and outside cluster



### ClusterIP
- microservice container
- side-car container
  
  > 10.2.1.x Node 1
  
  > 10.2.2.x Node 2 
  
  > 10.2.3.x Node 3  


### headless services
 - Client wants to communicate with 1 specific Pod directly
 - pods want to talk directly with specific pod
 - So, not redomly selected
 - Use case: statful application, like mysql
  

3 Sevice Type attributes

ClusterIP
```
apiVersion: v1
kind: service
metadata:
  name: my-service
spec:
  type:ClusterIP
```
Nodeport
```
apiVersion: v1
kind: service
metadata:
  name: my-service
spec:
  type:NodePort
```

Loadbalancer
```
apiVersion: v1
kind: service
metadata:
  name: my-service
spec:
  type:LoadBalancer
```


NodePort Range: 30000-32767


### LoadBalancer Service
Becomes accessible externally through cloud providers LoadBalancer
NodePort and ClusterIP Service are created automatically