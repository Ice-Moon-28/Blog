FROM node:16

WORKDIR /app
COPY ./build /app/build

RUN npm install -g serve 

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"] 