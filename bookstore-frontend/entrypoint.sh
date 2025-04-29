#!/bin/sh
# This would be saved as entrypoint.sh in your container

# Set default BACKEND_URL if not provided
BACKEND_URL=${BACKEND_URL:-http://bookstore-backend:8081}

# Extract just the host and port, without protocol or trailing path
BACKEND_HOST=$(echo $BACKEND_URL | sed -e 's|^[^/]*//||' -e 's|/.*$||')

# Check if there's an actual path component (after the host:port)
# If the URL contains a path after the host, extract it, otherwise use "/"
BACKEND_PATH=$(echo $BACKEND_URL | grep -o '/[^:]*$' || echo '/')

# If no path is found or it's empty, default to '/'
if [ -z "$BACKEND_PATH" ]; then
  BACKEND_PATH="/"
fi

echo "Using backend host: $BACKEND_HOST"
echo "Using backend path: $BACKEND_PATH"

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