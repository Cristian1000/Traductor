FROM node:12.18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node",  "Servidor.js"]