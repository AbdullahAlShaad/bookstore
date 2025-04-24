# Bookstore Application

A  online bookstore with modern UI and robust API backend.

## Project Overview

The Bookstore Application is a full-stack web application designed to provide an online platform for bookstore. It consists of a React-based frontend for user interaction and a backend API to handle business logic and data management.

### Components

- **Frontend**: React application with responsive design
- **Backend**: API server with RESTful endpoints
- **Deployment**: Kubernetes-based using Helm charts

## Features

- Book browsing and searching
- User authentication and profile management

## Technology Stack

### Frontend
- React.js
- Redux for state management
- React Router for navigation
- CSS/SCSS for styling

### Backend
- RESTful API architecture
- Authentication and authorization

### DevOps
- Docker containers
- Kubernetes for orchestration
- Helm charts for deployment
- Nginx Ingress for routing

## Development Setup

### Prerequisites

- Node.js and npm
- Docker and Docker Compose
- Kubernetes cluster (for production deployment)
- Helm 3.0+

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/AbdullahAlShaad/bookstore.git
   cd bookstore
   ```

### Running with Docker Compose

For a more production-like environment:

```bash
docker-compose up -d
```

This will start both frontend and backend services with the correct configuration. Access the application at http://localhost:3000

## Deployment

### Kubernetes Deployment with Helm

See the [Helm Chart README](./k8s/bookstore-chart/README.md) for detailed deployment instructions.

Quick start:

```bash
# Add the Nginx Ingress controller if not already installed
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install ingress-nginx ingress-nginx/ingress-nginx

# Install the bookstore application
kubectl create namespace bookstore
helm install bookstore ./helm/bookstore -f ./helm/values.yaml -n bookstore
```

## Project Structure

```
bookstore/
├── bookstore-frontend/              # React frontend application
│   ├── public/            # Static files
│   ├── src/               # React source code
│   │   ├── components/    # React components
│   │   ├── services/      # API service integrations
│   ├── Dockerfile         # Frontend Docker configuration
│   └── package.json       # Frontend dependencies
├── bookstore-api-server/               # Backend API server
│   ├── handler/              # API endpoint handlers
│   │── main.go/   # API endpoint handlers
│   ├── Dockerfile         # Backend Docker configuration
├── k8s/                  # Kubernetes Helm charts
│   ├── bookstore-chart/         # Main application chart
│   │   ├── charts/        # Subchart definitions
│   │   └── templates/     # K8s resource templates
│   └── values.yaml        # Default configuration values
├── docker-compose.yml     # Local development configuration
└── README.md              # This file
```

## Configuration

### Environment Variables

#### Frontend
- `REACT_APP_API_URL`: URL of the backend API

#### Backend
- `PORT`: Port on which the server listens

### Kubernetes Configuration

See the [Helm Chart README](./k8s/bookstore-chart/README.md) for detailed kubernetes deployment instructions.
