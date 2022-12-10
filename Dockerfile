# syntax=docker/dockerfile:experimental
FROM nginx:stable-alpine

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Install dependencies
RUN --mount=type=cache,target=/root/.npm \
    npm install

# Build
RUN npm run build

# Copy dist
COPY dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]