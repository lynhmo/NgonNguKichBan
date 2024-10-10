# frontend/Dockerfile

# Step 1: Build the React app
FROM node:18 as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm install -g serve

COPY . .

RUN npm run build

CMD ["serve", "-s", "build"]
