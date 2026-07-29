#!/bin/bash

kubectl rollout undo deployment/backend -n ${NAMESPACE} || true
kubectl rollout undo deployment/frontend -n ${NAMESPACE} || true