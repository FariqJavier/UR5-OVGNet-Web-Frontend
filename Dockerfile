# Use an official Node.js image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Install pnpm
RUN corepack enable

# Copy package files first for efficient caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Expose port 3000 for Next.js
EXPOSE 3000

# Start Next.js in development mode
CMD ["pnpm", "dev"]
