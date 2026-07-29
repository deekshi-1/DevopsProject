#!/bin/bash
set -e

echo "Building images..."

export BUILD_NUMBER=${BUILD_NUMBER}

docker compose \
-f docker/docker-compose.yaml \
build

echo "Built images:"
docker images | grep deekshithc1