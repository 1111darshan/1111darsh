# What is kuberbetes?

Open source container orchestarion tool.
 
	pod:		Abstraction over container
	Service:	Permanent IP Address
	Ingress:	
	ConfigMap:	External configuration of your application
	Secrat:		Use to store a secrat data
	Volumes:
	Deployment:
	StatefulSet:
	namespace:


### Layers of Abstraction
Deployement |<| Replicaset |<| Pod |<| Continer 

## Commands
	kubectl get node
	kubectl get deployments
	kubectl get pod

	kubectl create deployment NAME --image=image [--dry-run] [option]
	kubectl create deploymenr nginx-depl --image=nginx
	kubectl get replicaset

	kubectl edit deployement nginx-depl
### Debugging
	Kubectl logs <pod name>
	kubectl describe pod <pod name>
	kubectl exec -it <pod name> -- bin/bash
	kubectl delete deployment mongo-depl
	kubectl create deployment name image
	kubectl apply -f config-file.yaml

## namesapce

	kubectl get all -n my-namespace
	kubectl apply -f mysql-configmap.yaml --namespace=my-namespace
	kubectl get all -n my-namespace
	kubectl get congihmap -n my-namespace


kubens 

kubens my-namespace


## Deolpyment
	apiVersion: apps/v1
	kind: Deployment
	matadata: 
		name: nginx-deployment
		lables:
			app:nginx
	spec:	
		replicas: 1
		selector:
			matchLables:
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
					- containerPort: 80



### Ingress
	apiVersion: networking.k8s.io/v1beta1
	kind: Ingress
	name: myapp-ingress
	spec:
		rules:
		- host: myapp.com
		http:
			paths:
			- backend:
				serviceName: myapp-internal-service
				servicePort: 8080

###	Internal Service
	apiVersion: v1
	kind: Service
	metadata: 
		name: myapp-internal-service
	spec:
		selector:
			app: myapp
		ports:
			- protocol: TCP
			port: 8080
			targetport: 8080



### Persistenat Volume 

Ingress Controller

minikube addons enable ingress 


### k8s Volumes

1 persistent volume

2 persistent Volume claim

3 stroage class






