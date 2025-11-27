# Step 1: Build Stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all frontend source code into the container
COPY . .

# Ensure Vite is executable (fixes "vite: Permission denied")
RUN chmod +x node_modules/.bin/vite

# Build the production bundle
RUN npm run build


# Step 2: Production Stage (serve built files with Nginx)
FROM nginx:alpine

# Copy build output from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
