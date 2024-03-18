FROM node:18.19-alpine as build

WORKDIR /app-frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4200

CMD ["npm", "start"]