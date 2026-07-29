# Jenkins CI/CD Pipeline

This project uses a Jenkins Declarative Pipeline to automate the complete CI/CD workflow, from source code checkout to Kubernetes deployment.

## Pipeline Workflow

### 1. Checkout Source
- Retrieves the latest source code from the configured Git repository.
- Ensures Jenkins always builds the latest version of the project.

---

### 2. Secret Detection (Gitleaks)
- Scans the repository for accidentally committed secrets such as:
  - API Keys
  - Passwords
  - Access Tokens
  - Private Keys
- Stops the pipeline if any secrets are detected.

---

### 3. SonarQube Analysis
- Performs static code analysis.
- Checks for:
  - Bugs
  - Code Smells
  - Security Vulnerabilities
  - Code Coverage
- Sends the analysis report to the SonarQube server.

---

### 4. SonarQube Quality Gate
- Waits for the SonarQube Quality Gate result.
- The pipeline continues only if the project passes all quality checks.
- Automatically aborts if the Quality Gate fails.

---

### 5. Build Docker Images
- Builds Docker images for:
  - Frontend
  - Backend
- Tags the images using the Jenkins build number.

---

### 6. Trivy Image Scan
- Scans the Docker images for known security vulnerabilities using Trivy.
- Helps identify vulnerable packages before deployment.

---

### 7. DockerHub Login
- Authenticates securely with Docker Hub using Jenkins Credentials.
- Keeps Docker credentials hidden from the pipeline logs.

---

### 8. Push Docker Images
- Pushes the newly built Docker images to Docker Hub.
- Makes the images available for deployment.

---

### 9. Deploy to Kubernetes
- Connects to the Kubernetes cluster using the stored kubeconfig.
- Retrieves MongoDB credentials securely from Jenkins.
- Deploys or updates the application using Kubernetes manifests.

---

# Post Actions

## Success
When the pipeline completes successfully:

- Displays a success summary.
- Shows the Docker image tags.
- Sends a Microsoft Teams notification with:
  - Job Name
  - Build Number
  - Status
  - Image Versions
  - Build URL

---

## Failure
If any stage fails:

- Displays the failure message.
- Attempts an automatic Kubernetes rollback.
- Sends a Microsoft Teams notification indicating the failure and rollback attempt.

---

## Always
Runs regardless of the pipeline result.

- Cleans up temporary files and Docker resources.
- Displays the final pipeline status.
- Sends a final Microsoft Teams notification with the build result.

---

# Jenkins Credentials Used

| Credential ID | Purpose |
|--------------|---------|
| `dockerhub` | Docker Hub authentication |
| `mongodb-creds` | MongoDB username and password |
| `my-kubeconfig` | Kubernetes cluster access |

---

# Tools Used

- Jenkins
- Git
- Gitleaks
- SonarQube
- Sonar Scanner
- Docker
- Trivy
- Docker Hub
- Kubernetes
- Microsoft Teams Webhook

---

# Pipeline Flow

```
Git Repository
       │
       ▼
Checkout Source
       │
       ▼
Secret Detection (Gitleaks)
       │
       ▼
SonarQube Analysis
       │
       ▼
Quality Gate
       │
       ▼
Build Docker Images
       │
       ▼
Trivy Image Scan
       │
       ▼
Docker Hub Login
       │
       ▼
Push Docker Images
       │
       ▼
Deploy to Kubernetes
       │
       ▼
Application Running
       │
       ▼
Teams Notification
```
