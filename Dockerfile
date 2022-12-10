# syntax=docker/dockerfile:experimental
FROM nginx:stable-alpine

# Set working directory
WORKDIR /app

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy dist folder
COPY dist/ /etc/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]