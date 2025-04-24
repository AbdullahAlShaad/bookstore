#!/bin/sh
# This would be saved as entrypoint.sh in your container

# Replace the backend URL in the nginx.conf with the environment variable
BACKEND_URL=${BACKEND_URL:-http://bookstore-backend:8081}

# Remove the protocol prefix (http:// or https://) for the proxy_pass
BACKEND_HOST=$(echo $BACKEND_URL | sed -e 's|^[^/]*//||' -e 's|/.*$||')
BACKEND_PATH=$(echo $BACKEND_URL | grep -o '/.*$' || echo '')

# If no path is found, default to '/'
if [ -z "$BACKEND_PATH" ]; then
  BACKEND_PATH="/"
fi

# Generate nginx configuration with the environment variable
cat > /etc/nginx/conf.d/default.conf << EOF
server {
    listen 80;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    location /env.js {
        default_type "application/javascript";
        alias /usr/share/nginx/html/env.js;
    }

    location /api/ {
        proxy_pass http://${BACKEND_HOST}${BACKEND_PATH};
        rewrite ^/api/(.*)\$ /\$1 break;  # This removes the '/api' prefix before forwarding to the backend
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Execute nginx
exec nginx -g "daemon off;"