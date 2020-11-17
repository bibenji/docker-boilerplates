FROM node:8.15.1-alpine

ARG PROJECT_NAME=fulljs

RUN mkdir -p /var/www/${PROJECT_NAME}/
WORKDIR /var/www/${PROJECT_NAME}/

CMD ["yarn", "dev"]