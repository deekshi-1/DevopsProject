FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

USER appuser

EXPOSE 7000

CMD ["node","index.js"]
