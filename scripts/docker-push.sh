#!/bin/bash
set -e

docker tag ${FRONTEND_IMAGE}:${BUILD_NUMBER} ${FRONTEND_IMAGE}:latest
docker tag ${BACKEND_IMAGE}:${BUILD_NUMBER} ${BACKEND_IMAGE}:latest

docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}
docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}

docker push ${FRONTEND_IMAGE}:latest
docker push ${BACKEND_IMAGE}:latest