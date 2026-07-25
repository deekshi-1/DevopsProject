#!/bin/bash
# '|| true' ensures the pipeline doesn't crash if the undo fails
kubectl rollout undo deployment/backend -n ${NAMESPACE} || true
kubectl rollout undo deployment/frontend -n ${NAMESPACE} || true