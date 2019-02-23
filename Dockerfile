FROM node:slim AS builder
WORKDIR /app
ADD yarn.lock package.json /app/
RUN yarn
ADD . /app/
RUN npm run build:website

FROM scratch
COPY --from=builder /app/dist /
