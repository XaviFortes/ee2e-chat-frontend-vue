# syntax=docker/dockerfile:experimental
FROM nginx:stable-alpine

# Install node
RUN apk add --no-cache nodejs npm

# Copy package.json
COPY package.json /app/package.json

# Set working directory
WORKDIR /app

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Install dependencies
RUN npm install
# Build
RUN npm run build

# Copy dist
COPY dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]