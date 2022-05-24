FROM node:14

WORKDIR /app

COPY package*.json ./
RUN yarn install
COPY . ./
RUN yarn production
RUN cd production

COPY . .

EXPOSE 8080 8080

CMD [ "yarn", "start" ]