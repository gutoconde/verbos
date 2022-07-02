# build:
#> sudo docker build --tag verbosapi:1.0 https://github.com/gutoconde/verbos.git#main
# execucao:
#> sudo docker run -d --restart=always -p 3000:3000 --name verbosapi verbosapi:1.0
#Build Stage
FROM node:14-alpine as build-stage
WORKDIR /api
COPY database/verbos.db ./database/verbos.db
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]