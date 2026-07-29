# Devops Project 1
Welcome to the DevopsProject repository. This project showcases a comprehensive, enterprise-grade 3-tier DevOps implementation 

## 📁Repository Structure
The project deliverables are organized inside the deliverables directory:

- Application – Contains the frontend and backend source code for the project.
- Docker – Contains the Docker Compose configuration used to build and run the application's containerized environment.
- Jenkins – Contains the CI/CD pipeline configurations and automation scripts for the project.
- Kubernetes – Contains Kubernetes manifests and deployment scripts for orchestrating the application.
- Scripts – Contains Bash scripts used to automate repetitive tasks and simplify the CI/CD pipeline.

## 🚀 Capstone Project Overviews
### Enterprise CI/CD Platform for a Three-Tier Web Application
- Core Objective: Build an automated CI/CD platform that takes source code from GitHub, performs quality and security checks, builds Docker images, and deploys the application to an on-premises Kubernetes (Kubespray) cluster with zero downtime.

- Key Tech: Jenkins, Docker, Kubernetes, SonarQube, GitHub, Groovy.



## Repository Structure & Branches
### To maintain an organized workflow and separate our development environments, this repository utilizes the following branch structure
- main : The primary branch containing the final, production-ready codebase and the complete project setup.
- Docker-local : Dedicated to local development, deployment, and testing of the 3-tier web application.
- K8s: Contains the source code, pipelines, and configuration files for deploying the 3-tier web application using Jenkins, Docker, and Kubernetes (K8s).

## Project Structure

```text
DevopsProject
│   README.md
│   sonar-project.properties
│   
├───application
│   ├───backend
│   │   │   .dockerignore
│   │   │   .gitignore
│   │   │   Dockerfile
│   │   │   package-lock.json
│   │   │   package.json
│   │   │   
│   │   └───src
│   │       │   app.js
│   │       │   server.js
│   │       │   
│   │       ├───config
│   │       │       db.js
│   │       │       
│   │       ├───controllers
│   │       │       noteController.js
│   │       │       
│   │       ├───middleware
│   │       │       asyncHandler.js
│   │       │       errorHandler.js
│   │       │       notFound.js
│   │       │       
│   │       ├───models
│   │       │       Note.js
│   │       │       
│   │       ├───routes
│   │       │       route.js
│   │       │       
│   │       └───service
│   │               noteService.js
│   │               
│   └───frontend
│       │   .dockerignore
│       │   .gitignore
│       │   Dockerfile
│       │   eslint.config.js
│       │   index.html
│       │   nginx.conf
│       │   package-lock.json
│       │   package.json
│       │   README.md
│       │   vite.config.js
│       │   
│       ├───public
│       │       favicon.svg
│       │       icons.svg
│       │       
│       └───src
│           │   api.js
│           │   App.css
│           │   App.jsx
│           │   index.css
│           │   main.jsx
│           │   
│           └───assets
│                   hero.png
│                   react.svg
│                   vite.svg
│                   
├───Deliverables
│   │   README.md
│   │   
│   └───Screenshots
│       ├───Docker
│       ├───DockerHub
│       ├───Jenkins
│       ├───K8s
│       └───SonarQube
├───docker
│       docker-compose.yaml
│       
├───jenkins
│       Jenkinsfile
│       
├───kubernetes
│   │   ingress.yaml
│   │   namespace.yaml
│   │   secret.yaml
│   │   
│   ├───backend
│   │       backend-deployment.yaml
│   │       backend-service.yaml
│   │       configmap.yaml
│   │       
│   └───frontend
│           frontend-deployment.yaml
│           frontend-service.yaml
│           
└───scripts
        cleanup.sh
        docker-build.sh
        docker-login.sh
        docker-push.sh
        git-leaks.sh
        k8s-deploy.sh
        trivy-scan.sh
        undo-rollback.sh
```  

## Documentation
 All comprehensive documentation and detailed explanations of the requested project deliverables can be found in the Deliverables directory.

 [Go to Deliverables](Deliverables/README.md)


# 📖 Navigation
Please refer to the specific README.md files located inside each corresponding deliverable folder  for detailed architecture diagrams, setup instructions, configuration files, and implementation guides.

