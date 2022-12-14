# syntax=docker/dockerfile:experimental
FROM nginx:stable-alpine

# Set working directory
WORKDIR /app

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types

# Copy dist folder
COPY dist/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]