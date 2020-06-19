FROM node:lts-buster-slim

COPY /app /app
WORKDIR /app
RUN npm install

EXPOSE 5000/tcp
ENTRYPOINT ["node", "/app/server.js"]
