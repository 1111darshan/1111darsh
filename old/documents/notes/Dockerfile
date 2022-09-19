FROM node

ENV ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
    ME_CONFIG_MONGODB_ADMINPASSWORD=password

RUN  mkdir -p /home/app
COPY ./app /home/app

CMD ["node", "/home/app/server.js"]