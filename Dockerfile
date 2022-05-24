FROM node:14

WORKDIR ../app

COPY package*.json ./

COPY . .

EXPOSE 8080 8080

CMD [ "yarn", "start" ]