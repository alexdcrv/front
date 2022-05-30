FROM node:14

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y libglu1 && apt-get install -y libjpeg-dev

COPY . .

EXPOSE 8080 8080

CMD [ "yarn", "start" ]