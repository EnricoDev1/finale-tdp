FROM node:20

WORKDIR /usr/src/app

COPY ./src/package*.json ./

RUN npm install

COPY ./src .

RUN npm install -g pm2

CMD pm2 start ./node_modules/.bin/nodemon --name "server" server.js \
  && pm2 start "npx tailwindcss -i ./public/css/main.css -o ./public/css/output.css --watch" --name "tailwind" \
  && pm2 logs
