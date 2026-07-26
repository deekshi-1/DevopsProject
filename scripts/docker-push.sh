#!/bin/bash
set -e

docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}
docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}

docker push ${FRONTEND_IMAGE}:latest
docker push ${BACKEND_IMAGE}:latest