#!/bin/bash
set -e

cd docker
docker compose build

docker tag ${FRONTEND_IMAGE}:latest ${FRONTEND_IMAGE}:${BUILD_NUMBER}
docker tag ${BACKEND_IMAGE}:latest ${BACKEND_IMAGE}:${BUILD_NUMBER}