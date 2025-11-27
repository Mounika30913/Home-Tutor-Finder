# Step 1: Build the Vite app
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

# Fix Windows permission issue
RUN chmod -R 755 /app/node_modules/.bin

COPY . .

RUN npm run build

# Step 2: Run a production server
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
