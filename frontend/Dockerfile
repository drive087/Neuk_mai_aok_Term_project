FROM node:14.15.1

WORKDIR /srv/app/nm-client

COPY package.json .

RUN npm install
#RUN npm install react-scripts -g

COPY . .

EXPOSE 3000

CMD npm run start
