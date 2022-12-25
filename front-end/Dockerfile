FROM node:18-alpine As development

WORKDIR /usr/src/app

# RUN chown -R node:node /usr/src/app

COPY --chown=node:node package.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]
