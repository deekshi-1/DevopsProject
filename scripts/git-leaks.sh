#!/bin/bash
set -e

gitleaks detect \
    --source . \
    --no-git \
    --verbose \
    --exit-code 1 \
    --no-banner