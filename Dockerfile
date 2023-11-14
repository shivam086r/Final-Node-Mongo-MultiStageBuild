# Stage 1: Build and compile the Node.js application
FROM node:14 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Stage 2: Create the final image
FROM node:14-alpine

WORKDIR /app

# Copy only the necessary files from the previous stage
COPY --from=build /app .

# Install production dependencies (skip dev dependencies)
RUN npm install --only=production

# Expose the port your application runs on
EXPOSE 3000

# Start your Node.js application
CMD ["npm", "start"]
