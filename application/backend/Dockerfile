FROM node:lts-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package*.json ./

RUN npm ci --omit=dev

COPY --chown=appuser:appgroup . .

USER appuser

EXPOSE 7000

CMD ["node", "src/server.js"]