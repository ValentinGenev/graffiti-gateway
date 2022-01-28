FROM node:17.3-alpine
WORKDIR /graffiti-gateway

COPY package.json /graffiti-gateway/
RUN npm install --production

COPY . /graffiti-gateway/
RUN npm run build

EXPOSE 5000

CMD [ "node", "dist/index.js" ]