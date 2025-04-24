# Bookstore Helm Chart

This Helm chart deploys a complete bookstore application with frontend and backend components on Kubernetes.

## Overview

The Bookstore application consists of:
- A React-based frontend service
- A backend API service
- Nginx Ingress configuration for external access

## Prerequisites

Before installing this chart, you must have:

- Kubernetes cluster up and running (version 1.19+)
- Helm 3.0+ installed
- Nginx Ingress Controller deployed in your cluster

### Installing the Nginx Ingress Controller

If you don't have the Nginx Ingress Controller installed, you can install it using:

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx
```

## Installation


### Install the Chart

To install the chart with the release name `bookstore`:

```bash
helm install bookstore ./bookstore -f values.yaml
```

### Upgrading the Chart

To upgrade an existing installation:

```bash
helm upgrade bookstore ./bookstore -f values.yaml
```

## Configuration

The following table lists the configurable parameters of the Bookstore chart and their default values.

### Global Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `global.namespace` | Namespace to deploy resources | `bookstore` |
| `global.imageRegistry` | Global container registry | `abdullahalshaad` |
| `global.imagePullPolicy` | Global image pull policy | `Always` |
| `global.version` | Default version/tag for containers | `3.0` |
| `global.tolerations` | Global tolerations for pods | See values.yaml |

### Frontend Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `frontend.enabled` | Enable frontend deployment | `true` |
| `frontend.replicaCount` | Number of frontend replicas | `1` |
| `frontend.image.repository` | Frontend image repository | `bookstore-frontend` |
| `frontend.image.tag` | Frontend image tag | `3.0` |
| `frontend.env` | Environment variables for frontend | `REACT_APP_API_URL: "/api"` |
| `frontend.service.type` | Frontend service type | `ClusterIP` |
| `frontend.service.port` | Frontend service port | `80` |
| `frontend.resources` | Frontend resource requests/limits | See values.yaml |

### Backend Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `backend.enabled` | Enable backend deployment | `true` |
| `backend.replicaCount` | Number of backend replicas | `1` |
| `backend.image.repository` | Backend image repository | `bookstore-backend` |
| `backend.image.tag` | Backend image tag | `3.0` |
| `backend.env` | Environment variables for backend | `PORT: "8081"` |
| `backend.service.type` | Backend service type | `ClusterIP` |
| `backend.service.port` | Backend service port | `8081` |
| `backend.resources` | Backend resource requests/limits | See values.yaml |

### Ingress Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `ingress.enabled` | Enable ingress | `true` |
| `ingress.className` | Ingress class name | `nginx` |
| `ingress.host` | Hostname for the ingress | `bookstore.live.com` |
| `ingress.annotations` | Ingress annotations | `nginx.ingress.kubernetes.io/ssl-redirect: "false"` |
| `ingress.tls` | TLS configuration | `[]` |

## Accessing the Application

Once deployed, the application will be accessible at:

```
http://bookstore.live.com
```

Note: You need to ensure that DNS is configured to point to your ingress controller's external IP, or add an entry to your hosts file.

## Uninstalling the Chart

To uninstall/delete the `bookstore` deployment:

```bash
helm uninstall bookstore
```

## Customization

To override the default values, create your own `values.yaml` file and specify the values you want to change. Then run:

```bash
helm install bookstore ./bookstore -f your-values.yaml
```

### Example: Increasing Replica Count

```yaml
frontend:
  replicaCount: 3

backend:
  replicaCount: 2
```

### Example: Changing Host Domain

```yaml
ingress:
  host: "books.mycompany.com"
```

## Troubleshooting

### Checking Pod Status

```bash
kubectl get pods -n bookstore
```

### Viewing Logs

Frontend logs:
```bash
kubectl logs -l app=bookstore-frontend -n bookstore
```

Backend logs:
```bash
kubectl logs -l app=bookstore-backend -n bookstore
```

### Checking Ingress

```bash
kubectl get ingress -n bookstore
```

## Notes

- The frontend expects the backend API to be available at `/api` path
- Both services are configured with resource limits to ensure stability
- Master node scheduling is enabled through tolerations