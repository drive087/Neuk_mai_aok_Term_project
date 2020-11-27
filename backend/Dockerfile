FROM node:14.15.1

WORKDIR /srv/app/nm-server

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 8000 8001

CMD [ "npm", "run", "dev" ]