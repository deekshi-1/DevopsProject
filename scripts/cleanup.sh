#!/bin/bash

docker logout || true
docker image prune -f || true