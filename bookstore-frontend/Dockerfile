# Stage 1: Build React app
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf


# Add startup script to inject env.js
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
