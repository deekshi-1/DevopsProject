# Docker Compose Configuration

This `docker-compose.yml` file defines the services required to run the application. It builds and runs the frontend and backend containers, connects them through a shared network, and exposes the required ports.

---

# Docker Compose Version

```yaml
version: "3.9"
```

- Uses Docker Compose file format version **3.9**.
- Supports modern Docker Compose features and syntax.

---

# Services

## 1. Frontend Service

```yaml
frontend:
```

- Defines the frontend application container.

### Image

```yaml
image: deekshithc1/frontend:${BUILD_NUMBER}
```

- Uses the frontend Docker image.
- Tags the image with the Jenkins build number for versioning.

### Build Configuration

```yaml
build:
  context: ../application/frontend
  dockerfile: Dockerfile
```

- Builds the frontend image from the specified Dockerfile.
- Uses the frontend project directory as the build context.

### Container Name

```yaml
container_name: frontend
```

- Assigns the container the name **frontend**.

### Port Mapping

```yaml
ports:
  - "3000:80"
```

- Maps port **3000** on the host to port **80** inside the container.
- The frontend can be accessed at `http://localhost:3000`.

### Dependencies

```yaml
depends_on:
  - backend
```

- Starts the backend service before the frontend.

### Restart Policy

```yaml
restart: unless-stopped
```

- Automatically restarts the container unless it is manually stopped.

### Network

```yaml
networks:
  - app_network
```

- Connects the frontend container to the shared application network.

---

## 2. Backend Service

```yaml
backend:
```

- Defines the backend application container.

### Image

```yaml
image: deekshithc1/backend:${BUILD_NUMBER}
```

- Uses the backend Docker image.
- Tags the image with the Jenkins build number.

### Build Configuration

```yaml
build:
  context: ../application/backend
  dockerfile: Dockerfile
```

- Builds the backend image from its Dockerfile.

### Container Name

```yaml
container_name: backend
```

- Assigns the container the name **backend**.

### Port Mapping

```yaml
ports:
  - "7000:7000"
```

- Maps port **7000** on the host to port **7000** inside the container.
- The backend API is accessible at `http://localhost:7000`.

### Environment Variables

```yaml
environment:
  NODE_ENV: production
  PORT: 7000
```

- Sets the application to run in **production** mode.
- Configures the backend to listen on port **7000**.

### Restart Policy

```yaml
restart: unless-stopped
```

- Automatically restarts the backend container unless it is manually stopped.

### Network

```yaml
networks:
  - app_network
```

- Connects the backend container to the shared application network.

---

# Networks

```yaml
networks:
  app_network:
    driver: bridge
```

- Creates a custom bridge network named **app_network**.
- Allows the frontend and backend containers to communicate securely using their service names.

---

# Docker Compose Workflow

```
Docker Compose
       │
       ▼
Build Frontend Image
       │
       ▼
Build Backend Image
       │
       ▼
Create app_network
       │
       ▼
Start Backend Container
       │
       ▼
Start Frontend Container
       │
       ▼
Frontend ↔ Backend Communication
```

## Features

- Builds frontend and backend images automatically
- Uses Jenkins build number for image versioning
- Runs frontend and backend as separate containers
- Exposes required application ports
- Configures production environment variables
- Automatically restarts containers if they stop unexpectedly
- Connects services using a custom bridge network
- Supports seamless communication between frontend and backend
```