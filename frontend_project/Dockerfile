# ===== Build stage =====
FROM node:20-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Ensure Vite is available (in case it wasn't added properly)
RUN npm install --save-dev vite

# Install project dependencies (including devDependencies)
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Build the production bundle (uses "build" script in package.json)
RUN npm run build

# ===== Serve stage =====
FROM nginx:stable-alpine

# For Vite, the production build output is in "dist"
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
