#!/bin/bash
set -e

kubectl apply -f kubernetes/namespace.yaml

kubectl apply -f kubernetes/configmap.yaml
kubectl apply -f kubernetes/backend-deployment.yaml
kubectl apply -f kubernetes/backend-service.yaml
kubectl apply -f kubernetes/frontend-deployment.yaml
kubectl apply -f kubernetes/frontend-service.yaml
kubectl apply -f kubernetes/ingress.yaml

kubectl set image deployment/backend backend=${BACKEND_IMAGE}:${BUILD_NUMBER} -n ${NAMESPACE}
kubectl set image deployment/frontend frontend=${FRONTEND_IMAGE}:${BUILD_NUMBER} -n ${NAMESPACE}

kubectl rollout status deployment/backend -n ${NAMESPACE} --timeout=180s
kubectl rollout status deployment/frontend -n ${NAMESPACE} --timeout=180s

kubectl get pods -n ${NAMESPACE}
kubectl get svc -n ${NAMESPACE}
kubectl get ingress -n ${NAMESPACE}