#!/bin/bash
set -e

kubectl apply -f kubernetes/namespace.yaml

kubectl create secret generic backend-secret \
--namespace ${NAMESPACE} \
--from-literal=MONGO_URI="${MONGO_URI}" \
--dry-run=client \
-o yaml | kubectl apply -f -

kubectl apply -f kubernetes/backend/configmap.yaml
kubectl apply -f kubernetes/backend/backend-deployment.yaml
kubectl apply -f kubernetes/backend/backend-service.yaml
kubectl apply -f kubernetes/frontend/frontend-deployment.yaml
kubectl apply -f kubernetes/frontend/frontend-service.yaml
kubectl apply -f kubernetes/ingress.yaml

kubectl set image deployment/backend backend=${BACKEND_IMAGE}:${BUILD_NUMBER} -n ${NAMESPACE}
kubectl set image deployment/frontend frontend=${FRONTEND_IMAGE}:${BUILD_NUMBER} -n ${NAMESPACE}

kubectl rollout status deployment/backend -n ${NAMESPACE} --timeout=180s
kubectl rollout status deployment/frontend -n ${NAMESPACE} --timeout=180s

kubectl get pods -n ${NAMESPACE}
kubectl get svc -n ${NAMESPACE}
kubectl get ingress -n ${NAMESPACE}

NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="ExternalIP")].address}')
if [ -z "$NODE_IP" ]; then
  NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}')
fi

FRONTEND_NODEPORT=$(kubectl get svc frontend-service -n ${NAMESPACE} -o jsonpath='{.spec.ports[0].nodePort}')

echo ""
echo "=== Application access (no LoadBalancer) ==="
echo "NodePort (direct):  http://${NODE_IP}:${FRONTEND_NODEPORT}/"

INGRESS_SVC=$(kubectl get svc -A -l app.kubernetes.io/name=ingress-nginx -o jsonpath='{.items[0].metadata.name}' 2>/dev/null || true)
INGRESS_NS=$(kubectl get svc -A -l app.kubernetes.io/name=ingress-nginx -o jsonpath='{.items[0].metadata.namespace}' 2>/dev/null || true)

if [ -n "$INGRESS_SVC" ] && [ -n "$INGRESS_NS" ]; then
  INGRESS_NODEPORT=$(kubectl get svc -n "${INGRESS_NS}" "${INGRESS_SVC}" -o jsonpath='{.spec.ports[?(@.port==80)].nodePort}' 2>/dev/null || true)
  if [ -n "$INGRESS_NODEPORT" ]; then
    echo "Ingress (via nginx): http://${NODE_IP}:${INGRESS_NODEPORT}/"
  else
    echo "Ingress controller has no NodePort on port 80."
    echo "Expose it with:"
    echo "  kubectl patch svc ${INGRESS_SVC} -n ${INGRESS_NS} -p '{\"spec\":{\"type\":\"NodePort\"}}'"
    echo "Then re-run this deploy or check: kubectl get svc -n ${INGRESS_NS}"
  fi
else
  echo "Ingress controller not found. Install nginx ingress or use NodePort above."
fi