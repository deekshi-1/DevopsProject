# Frontend Dockerfile

This Dockerfile uses a **multi-stage build** to create an optimized production image for the frontend application. The first stage builds the application, while the second stage serves the compiled files using Nginx.

---

# Dockerfile Stages

## 1. Build Stage

```dockerfile
FROM node:lts-alpine AS build
```

- Uses the lightweight Alpine version of the latest Node.js LTS image.
- Creates a build environment for the frontend application.

---

## 2. Set Working Directory

```dockerfile
WORKDIR /app
```

- Sets `/app` as the working directory inside the container.
- All subsequent commands are executed from this directory.

---

## 3. Copy Package Files

```dockerfile
COPY package*.json ./
```

- Copies `package.json` and `package-lock.json` into the container.
- Separating this step improves Docker layer caching.

---

## 4. Install Dependencies

```dockerfile
RUN npm ci
```

- Installs project dependencies based on the lock file.
- Ensures a clean and consistent installation for production builds.

---

## 5. Copy Application Source

```dockerfile
COPY . .
```

- Copies the entire frontend source code into the container.

---

## 6. Build the Application

```dockerfile
RUN npm run build
```

- Builds the frontend application.
- Generates optimized production files in the `dist` directory.

---

# Production Stage

## 7. Use Nginx Image

```dockerfile
FROM nginx:alpine
```

- Starts a new lightweight Nginx container.
- Keeps the final image small by excluding Node.js and development dependencies.

---

## 8. Copy Nginx Configuration

```dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

- Replaces the default Nginx configuration.
- Configures how the frontend application is served.

---

## 9. Copy Build Files

```dockerfile
COPY --from=build /app/dist /usr/share/nginx/html
```

- Copies the compiled frontend files from the build stage.
- Places them in Nginx's default web root.

---

## 10. Expose Port

```dockerfile
EXPOSE 80
```

- Exposes port **80** for incoming HTTP traffic.

---

## 11. Start Nginx

```dockerfile
CMD ["nginx", "-g", "daemon off;"]
```

- Starts the Nginx web server.
- Runs Nginx in the foreground to keep the container running.

---

# Multi-Stage Build Benefits

- Smaller production image
- Faster deployments
- Improved security by excluding build tools
- Reduced storage and bandwidth usage
- Better Docker layer caching during builds

---

# Docker Build Flow

```
Node.js (Build Stage)
        │
        ▼
Install Dependencies
        │
        ▼
Build React/Vite Application
        │
        ▼
Generate Production Files (dist)
        │
        ▼
Copy Files to Nginx
        │
        ▼
Serve Application on Port 80
```

## Technologies Used

- Docker
- Node.js (LTS Alpine)
- npm
- Nginx (Alpine)
- Multi-Stage Docker Build