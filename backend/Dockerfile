From node:lts

ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "npm", "run", "start" ]