FROM node:18.19-alpine3.18

WORKDIR /app

# Copia el package.json y package-lock.json a /app
COPY package*.json /app/

# Instala las dependencias
RUN npm install

COPY . /app

VOLUME ["/app/player-photos", "/app/team-photos"]

EXPOSE 3000

CMD ["node", "index.js"]