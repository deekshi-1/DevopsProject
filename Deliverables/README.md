# Deliverables

## GitHub

The project source code is hosted on GitHub using a clean and structured branching strategy.

### Repository Structure

- **main**
  - Production-ready branch.
  - Always kept stable and clean.
  - Contains only tested and approved code.

- **Dockerfile**
  - Dedicated branch for Docker containerization.
  - Includes Dockerfile and related configuration for building application images.

- **K8s**
  - Dedicated branch for Kubernetes deployment.
  - Contains Kubernetes manifests such as Deployments, Services, Namespaces, ConfigMaps, and Secrets.


## Jenkins

Github Push --> webhook trigger --> Pull the latest code --> Git leaks -->Sonar qube analysis --yes--> Build docker Image -->Trivia image check --> Push image to dockerHub--> K8s namespace secret ingress --> k8s frontend backend pods --> Check health --yes --> deploy
                                                                                               --No--> Fails the pipeline                                                                                                                                  --no--> rollout                         

Detailed jenkins file explantion   [Jenkins.md](jenkins/README.md)

## 🚀 Capstone Project Overviews
### Enterprise CI/CD Platform for a Three-Tier Web Application
- Core Objective: Build an automated CI/CD platform that takes source code from GitHub, performs quality and security checks, builds Docker images, and deploys the application to an on-premises Kubernetes (Kubespray) cluster with zero downtime.

- Key Tech: Jenkins, Docker, Kubernetes, SonarQube, GitHub, Groovy.



## Repository Structure & Branches
### To maintain an organized workflow and separate our development environments, this repository utilizes the following branch structure
