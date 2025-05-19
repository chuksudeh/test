FROM node:alpine

WORKDIR /usr/src/index

COPY package.json package-lock.json ./

RUN npm install -g npm@latest

RUN npm install

COPY . .

CMD [ "node", "dist/index" ]