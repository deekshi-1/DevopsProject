#!/bin/bash
set -e
docker tag ${FRONTEND_IMAGE}:latest ${FRONTEND_IMAGE}:${BUILD_NUMBER}
docker tag ${BACKEND_IMAGE}:latest ${BACKEND_IMAGE}:${BUILD_NUMBER}

docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}
docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}

docker push ${FRONTEND_IMAGE}:latest
docker push ${BACKEND_IMAGE}:latest