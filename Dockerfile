# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Install deps first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Copy source and build
COPY . .
RUN npm run build

# ---- Serve stage ----
FROM nginx:1.27-alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
