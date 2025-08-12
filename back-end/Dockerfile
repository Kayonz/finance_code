FROM node:20.13.1-alpine

WORKDIR /back-end

COPY package.json .

RUN npm install --quiet

COPY . .