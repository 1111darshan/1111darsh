# Jenkins Notes
## Jenkins Container Setup

	docker run -p 8080:8080 -p 5000:5000 -d -v jenkins-home:/var/jenkins_home jenkins\jenkins
	
Check jenkins container runing 
	
	docker ps
	docker logs [cotainer-id]


#### Types of Jenkins Projects

	Frestayle 
		simple, single task
		 e.g. run test

	Pipeline 
		whole delivery cycle 
		e.g. test | bulild | ...

	Multibranch Pipeline
		like pipeline for multibranch branches


## Create Multibranch Pipeline with Git Repo

> New Item > Enter am item name [  ] > Multibranch Pipeline >

> Branch Sourse
	
Project Repository [git clone url<e.g https://gitlab.com/...../.git>] 

Discover  Branch 
> ./[brahcn-name] 
##### or
>  dev|master|feature.*
  


## Types of credentionals

Creadintial scopes

	System => only available on jenkins server NOT for jenkins jobs
	Globel => Everywhere accessible
	Project => Limited to project, Only with multibranch pipeline


Creadintial Types

	Usename & Passwoed 
	Certificate
	Secret Files
	`New types  based on plugin`

## Jenkinsfile

	pipeline {
		agent any 
		stages {	
			stage('build') {
				steps {
					echo 'building the appications...'

				}
			}

			stage('test') {
				steps {
					echo 'testing the appications...'
				}
			}

			stage('deploy') {
				steps {
					echo 'deploying the appication'
			
				}
			}									
		}
	}

##
	pipeline {
		agent any 
		stages {	
			stage('build') {
				steps {
					echo 'building the appications...'
					
					script{
						def test = 2 + 2 > 3 ? 'cool' : 'not cool' 
					} 

				}
			}

			stage('test') {
				steps {
					echo 'testing the appications...'
				}
			}

			stage('deploy') {
				steps {
					echo 'deploying the appication'
			
				}
			}									
		}
	}

### pileline Sysntex
Scriped
- first syntax
- Groovy engine
- advanced scripting capabilities, high flexibility
- difficult to start

Declatative
- recent addition
- easier to get started, but not that powerful
- pre-defined structured
  
### Required Fields of Jenkinsfile
- "pipeline" must be top-level
- "agent" - where to execute
- "stages" - where the "work" happens
  - "stage" and "steps"

Restart from stage

## Trigger jenkins build automatically Git integration

Push notifaction => Version Control notifies Jenkins on new commit

polling => Jenking polls in regular intervalls

