#!/bin/bash
set -e

trivy image \
    --severity HIGH,CRITICAL \
    --exit-code 1 \
    ${FRONTEND_IMAGE}:${BUILD_NUMBER}

trivy image \
    --severity HIGH,CRITICAL \
    --exit-code 1 \
    ${BACKEND_IMAGE}:${BUILD_NUMBER}