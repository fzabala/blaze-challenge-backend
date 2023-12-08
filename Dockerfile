FROM node:18

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "dev"]