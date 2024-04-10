# Stage 1: Build TypeScript files
FROM node:latest AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript files
RUN npm run build

# Stage 2: Production image
FROM node:slim AS production
WORKDIR /app

# Copy built files from previous stage
COPY --from=build /app/dist ./dist
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 8080 

# Command to run the application
CMD ["node", "dist/index.js"]