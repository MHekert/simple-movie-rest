FROM alpine:3.10
WORKDIR /app
COPY . /app
RUN apk add nodejs
RUN apk add yarn
RUN yarn install
RUN yarn build
EXPOSE 80
CMD ["yarn", "justStart"]