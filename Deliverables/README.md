# Deliverables

## Architecture Diagram

<p align="center">
  <img src="Screenshots/architecture diagram.png" alt="Enterprise CI/CD Architecture" width="100%">
</p>

___

## GitHub

The project source code is hosted on GitHub using a clean and well-structured branching strategy.

### Repository Structure

#### `main`
- Production-ready branch.
- Always kept stable and clean.
- Contains only tested and approved code.

#### `Dockerfile`
- Dedicated branch for Docker containerization.
- Contains the Dockerfile and related configuration required to build application images.

#### `K8s`
- Dedicated branch for Kubernetes deployment.
- Contains Kubernetes manifests, including:
  - Deployments
  - Services
  - Namespaces
  - ConfigMaps
  - Secrets

___

## Jenkins

The following flowchart provides an overview of the Jenkins CI/CD pipeline workflow.

<p align="center">
  <img src="Screenshots/Jenkins/jenkins flowchart.png" alt="Jenkins Pipeline Workflow" width="100%">
</p>

For a detailed explanation of the Jenkins pipeline, refer to the [Jenkins README](jenkins/README.md).



### Jenkins Configuration
<table>
  <tr>
    <td align="center">
      <img src="Screenshots/Jenkins/jenkinsconfig1.png" width="500"/>
    </td>
    <td align="center">
      <img src="Screenshots/Jenkins/jenkinsconfig2.png" width="500"/>
    </td>
  </tr>
</table>

### Project Screenshots

<table>
  <tr>
    <th>Credentials</th>
    <th>Tools</th>
  </tr>
  <tr>
    <td align="center">
      <img src="Screenshots/Jenkins/credentials.png" width="500"/>
    </td>
    <td align="center">
      <img src="Screenshots/Jenkins/tools.png" width="500"/>
    </td>
  </tr>

  <tr>
    <th>System Settings</th>
    <th>Installed Plugins</th>
  </tr>
  <tr>
    <td align="center">
      <img src="Screenshots/Jenkins/system.png" width="500"/>
    </td>
    <td>
      <ul>
        <li>Sonar Scanner</li>
        <li>Git</li>
        <li>Docker Pipeline</li>
        <li>Kubernetes CLI Plugin</li>
        <li>Pipeline: Stage View</li>
      </ul>
    </td>
  </tr>
</table>



### Pipeline Configuration

<p align="center">
  <img src="Screenshots/Jenkins/jenkins flowchart.png" alt="Jenkins Pipeline Configuration" width="60%">
</p>

---
### Webhook

<table>
  <tr>
    <th>Jenkins</th>
    <th>Github</th>
  </tr>
  <tr>
    <td align="center">
      <img src="Screenshots/Jenkins/jenkisnbuildtrigger.png" width="500"/>
    </td>
    <td align="center">
      <img src="Screenshots/Jenkins/githubWeebhook.png" width="500"/>
    </td>
  </tr>
</table>  

---

### Pipeline Notifications


The pipeline includes comprehensive post-build actions to handle successful deployments, failures, cleanup, and Microsoft Teams notifications.

#### Success

- Displays a success summary in the Jenkins console.
- Lists the generated frontend and backend Docker images.
- Sends a success notification to the configured Microsoft Teams channel containing:
  - Job name
  - Build number
  - Build status
  - Docker image tags
  - Build URL

#### Failure

- Displays the failure summary.
- Attempts an automatic Kubernetes rollback using the rollback script.
- Reports whether the rollback was successful.
- Sends a failure notification to Microsoft Teams containing:
  - Job name
  - Build number
  - Build status
  - Rollback status
  - Build URL

#### Always

This stage runs regardless of the pipeline result.

- Executes the cleanup script.
- Removes temporary resources.
- Prints the final pipeline status.
- Sends a final notification to Microsoft Teams containing:
  - Job name
  - Build number
  - Final build status
  - Build URL

#### Jenkins `post` Block

```groovy
post {

    success {

        echo """
        =======================================
        Pipeline Completed Successfully

        Frontend Image : ${FRONTEND_IMAGE}:${BUILD_NUMBER}
        Backend Image  : ${BACKEND_IMAGE}:${BUILD_NUMBER}

        Application deployed successfully.
        =======================================
        """

        office365ConnectorSend(
            webhookUrl: "${TEAMS_WEBHOOK}",
            message: """
✅ *Jenkins Pipeline Succeeded*

**Job:** ${env.JOB_NAME}
**Build:** #${env.BUILD_NUMBER}
**Status:** SUCCESS

Frontend Image:
${FRONTEND_IMAGE}:${BUILD_NUMBER}

Backend Image:
${BACKEND_IMAGE}:${BUILD_NUMBER}

Build URL:
${env.BUILD_URL}
"""
        )
    }

    failure {

        echo """
        =======================================
        Pipeline Failed

        Rolling back deployments...
        =======================================
        """

        script {
            try {
                withKubeConfig(credentialsId: 'my-kubeconfig') {
                    sh "bash scripts/k8s-rollback.sh"
                }
                echo "Rollback completed successfully."
            } catch (Exception e) {
                echo "Rollback failed: ${e.getMessage()}"
            }
        }

        office365ConnectorSend(
            webhookUrl: "${TEAMS_WEBHOOK}",
            message: """
❌ *Jenkins Pipeline Failed*

**Job:** ${env.JOB_NAME}
**Build:** #${env.BUILD_NUMBER}
**Status:** FAILURE

Rollback attempted.

Build URL:
${env.BUILD_URL}
"""
        )
    }

    always {

        sh "bash scripts/cleanup.sh"

        echo "Pipeline Finished"

        office365ConnectorSend(
            webhookUrl: "${TEAMS_WEBHOOK}",
            message: """
ℹ️ *Pipeline Finished*

**Job:** ${env.JOB_NAME}
**Build:** #${env.BUILD_NUMBER}

Final Status: ${currentBuild.currentResult}

Build URL:
${env.BUILD_URL}
"""
        )
    }
}
```
<p align="center">
  <img src="Screenshots/Jenkins/jenkins flowchart.png" alt="Jenkins Pipeline Configuration" width="60%">
</p>

___


## Docker
Docker file explanation

  - Frontend  [Dockerfile README](jenkins/README.md).
  - Backend   [Dockerfile README](jenkins/README.md). 

Docker Compose Explanation  [Dockerfile README](jenkins/README.md).



##

