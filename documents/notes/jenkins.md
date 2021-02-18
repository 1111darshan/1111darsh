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
```
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

```
```
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
```
### pipeline Sysntex
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


## Configure Build Tools in Jenkins and Jenkinsfile

### How to use build tools in Jenkins

### Check if your build tool is already available?
Manage jenkins > Global Tool Configuration

### Install npm and yarn from plugins
Manage jenkins > Manage plugin > Install nodeJs

### Use build tools (gradle and yarn) in Jenkinsfile
```
pipeline {
	agent any 
	stages {	
		stage('run front') {
			steps {
				echo 'exicuting yarn...'
				nodejs('Node-10.17'){
					sh 'yarn install'
				}
			}
		}

		stage('run backend') {
			steps {
				echo 'executing gradle...'
				withGradle(){
					sh './gradlew -v'


				}
			}
		}
						
	}
}
```
```
pipeline {
		agent any
		
		tools {
			grable 'Gradle-6.2'
		} 
		
		stages {	
			stage('run front') {
				steps {
					echo 'exicuting yarn...'
					nodejs('Node-10.17'){
						sh 'yarn install'
					}
				}
			}

			stage('run backend') {
				steps {
					echo 'executing gradle...'
					withGradle(){
						sh './gradlew -v'
					}
				}
			}					
		}
	}
```

### Alternative to using build tools in Jenkinsfile



# Complete Jenkins Pipeline Tutorial | Jenkinsfile explained

Scriped 
- first syntex
- groovt engine
- advanced scripting capabilities, high flexibility	
- difficult to start
  


Declarative
- recent addition
- easier to get started, but not that powerful
- pre-defined structure
  

## Required fields of Jenkins
- "pipline"
- "agent"
- "stages"
  - "steps"
## Post attribute in Jenkins file
 Post 

 Execute some logic AFTER all stages executed
 Conditions:
- always
- success
- failure

```
pipeline {
	agent any
	
	stages {	
		stage('build') {
			steps {
				echo 'exicuting yarn...'
			}
		}					
	}

	post{
		always{

		}
	}
}
```

## Define Conditionals / When expression

CODE_CHANGES = getGitChanges()
pipeline {
		agent any
		
		stages {	
			stage('build') {
				when {
					expression {
						BRANCH_NAME == 'dev' || BRANCH_NAME == 'master' || CODE_CHANGES == true
					}
				}
				steps {
				}
			}					
		}
	}

## Environmentals Variables
```
pipeline {
	agent any
	environmant{
		NEW_VERSION = '1.3.0'
	}

	stages {	
		stage('build') {
			steps {
				echo "building version ${NEW_VERSION}"
			}
		}					
	}
}
```
```
pipeline {
	agent any
	environmant{
		NEW_VERSION = '1.3.0'
		// SERVER_CREDENTIALS = credentials('server-credentials') 
	}

	stages {	
		stage('build') {
			steps {
				echo "building version ${NEW_VERSION}"
				withCredentials([
					usernamePassword(credentials: 'erver-credentials', usernameVariable: USER, passwordVariable: PWD)
				]) {
					sh "some script ${UESR}  ${PWD}"

				}
			}
		}					
	}
}
```

## Using Parameters for a Parameterized Build
Types of Parametes
- string
- choice
- boolenParam
###### ---
	pipeline {
		agent any
		parameters {
			string(name: 'VERSION', defaultValue: '', description:'')
			choice(name: 'VERSION', choices: '['','','']', descritions: '')
		}
		stages {	
			stage('build') {
				steps {
					echo ""
				}
			}					
		}
	}

## Using external Groovy scripts