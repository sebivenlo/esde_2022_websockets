FROM node:16


WORKDIR /Users/appcomm/Desktop/esde_2022_websockets


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]