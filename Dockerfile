# # Stage 1: Build the Vite application
# FROM oven/bun:latest AS bun_builder

# # RUN mkdir -p /app

# WORKDIR /app 

# COPY ./client ./

# RUN bun install 

# RUN bun run build

# # Stage 2: Serve the built application with Nginx
# FROM nginx:alpine

# COPY --from=bun_builder /app/dist /usr/share/nginx/html

# # Configure Nginx as a reverse proxy for the Bun application
# COPY nginx.conf /etc/nginx/nginx.conf

# # Expose the port Nginx will listen on
# EXPOSE 8080

# # WORKDIR /app

# # COPY ./start.sh /app
# # Command to start Nginx
# CMD ["nginx", "-g", "daemon off;"]

# ENTRYPOINT [ "./start.sh" ] 

FROM node:20-alpine AS build

RUN mkdir -p /app
WORKDIR /app
COPY ./client/ /app



RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
# # Configure Nginx as a reverse proxy for the Bun application
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx","-g","daemon off;"]