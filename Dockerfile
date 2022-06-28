FROM node

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 9000

CMD ["yarn", "start"]
