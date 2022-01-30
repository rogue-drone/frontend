FROM node:lts-slim

ENV PATH /usr/share/node_modules/.bin:$PATH

WORKDIR /app
COPY package*.json ./

RUN yarn global add vite
RUN yarn --dev

COPY . .

EXPOSE 3000

CMD [ "yarn", "run", "dev", "--host=0.0.0.0" ]