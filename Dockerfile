# Use an official Node.js base image
FROM node:16

# Create a working directory for your application
WORKDIR /usr/src/app

# Copy your project files into the container
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Expose the port your application will be running on
EXPOSE 3001

# Command to start your application
CMD ["node", "app.js"]
