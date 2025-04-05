FROM node:20

WORKDIR /usr/src/app

COPY ./src/package*.json ./

RUN npm install

COPY ./src .

RUN npm install -g pm2

CMD pm2 start npm --name "server" -- run dev && pm2 start npx --name "tailwind" -- tailwindcss -i ./public/css/main.css -o ./public/css/output.css --watch && pm2 logs
