FROM node:16

WORKDIR /app

COPY package*.json ./
RUN apt-get update && apt-get install -y libglu1 && apt-get install -y libjpeg-dev
RUN yarn install
COPY . ./
RUN yarn production
RUN cd production

COPY . .

EXPOSE 8080 8080

CMD [ "yarn", "start" ]