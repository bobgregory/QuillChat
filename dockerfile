FROM node:14
WORKDIR /app
COPY . .
WORKDIR /app
RUN npm install --silent
CMD [ "node",  "index.js" ]
