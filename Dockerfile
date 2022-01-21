FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./
RUN yarn global add vite && yarn --dev

ENV PATH /usr/share/node_modules/.bin:$PATH

RUN echo $PATH
RUN ls / -la
RUN ls /usr/local/share

COPY . .

EXPOSE 3000
RUN chmod +x start.sh

ENTRYPOINT [ "start.sh" ]
CMD [ "yarn", "run", "dev", "--host=0.0.0.0" ]