
FROM node:alpine

LABEL version="0.1.0"

COPY ./ /desafio-back

WORKDIR /desafio-back

RUN yarn && yarn build

CMD yarn start
