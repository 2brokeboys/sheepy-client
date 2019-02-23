FROM node:slim
WORKDIR /app
ADD yarn.lock package.json /app/
RUN yarn
ADD . /app/
RUN npm run build:website
