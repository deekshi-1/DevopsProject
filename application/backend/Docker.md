# Backend Dockerfile

This Dockerfile uses a **multi-stage build** to create a lightweight production image for the backend application. The first stage installs the required dependencies, while the second stage creates the final runtime image.

---

# Dockerfile Stages

## 1. Builder Stage

```dockerfile
FROM node:20-alpine AS builder
```

- Uses the lightweight Alpine version of Node.js 20.
- Creates a separate build stage for installing dependencies.

---

## 2. Set Working Directory

```dockerfile
WORKDIR /app
```

- Sets `/app` as the working directory inside the container.
- All commands are executed from this directory.

---

## 3. Copy Package Files

```dockerfile
COPY package*.json ./
```

- Copies `package.json` and `package-lock.json` into the container.
- Improves Docker layer caching by installing dependencies before copying the application code.

---

## 4. Install Production Dependencies

```dockerfile
RUN npm ci --omit=dev
```

- Installs only the production dependencies.
- Excludes development packages to reduce the final image size and improve security.

---

## 5. Copy Application Source

```dockerfile
COPY . .
```

- Copies the complete backend source code into the builder stage.

---

# Production Stage

## 6. Create Runtime Image

```dockerfile
FROM node:20-alpine
```

- Starts a new, clean Node.js 20 Alpine image.
- Ensures the final image contains only the files needed to run the application.

---

## 7. Set Working Directory

```dockerfile
WORKDIR /app
```

- Sets the working directory for the runtime container.

---

## 8. Copy Required Files

```dockerfile
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
```

- Copies the production dependencies from the builder stage.
- Copies the application source code.
- Includes the package files for reference and dependency management.

---

## 9. Expose Application Port

```dockerfile
EXPOSE 7000
```

- Exposes port **7000** for incoming requests to the backend application.

---

## 10. Start the Application

```dockerfile
CMD ["node", "src/server.js"]
```

- Starts the Node.js backend server.
- Executes the application's entry point (`server.js`).

---

# Multi-Stage Build Benefits

- Smaller production image
- Faster image downloads and deployments
- Improved security by excluding development dependencies
- Better Docker layer caching
- Cleaner separation between build and runtime environments

---

# Docker Build Flow

```
Node.js Builder Stage
        │
        ▼
Copy Package Files
        │
        ▼
Install Production Dependencies
        │
        ▼
Copy Application Source
        │
        ▼
Create Runtime Image
        │
        ▼
Copy Dependencies & Source Code
        │
        ▼
Start Backend Server (Port 7000)
```

## Technologies Used

- Docker
- Node.js 20 (Alpine)
- npm
- Multi-Stage Docker Build
```