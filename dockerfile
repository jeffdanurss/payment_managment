# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy necessary files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the source code
COPY . .

# Build the application if needed (e.g., for TypeScript projects)
# RUN npm run build

# Stage 2: Final image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy dependencies and code from the build stage
COPY --from=builder /app .

# Expose the port the app runs on
EXPOSE 3010

# Command to run the application
CMD ["npm", "start"]