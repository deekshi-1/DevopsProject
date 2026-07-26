#!/bin/bash
set -e

echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin