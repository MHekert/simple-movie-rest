# [API documentation](https://app.swaggerhub.com/apis/MHekert/simple-movie-rest/0.1.0)

# development environment setup guide

## Prerequisites

-   [installed node.js](https://nodejs.org/en/download/)
-   [installed MongoDB](https://docs.mongodb.com/manual/installation/)
-   [installed yarn](https://yarnpkg.com/lang/en/docs/install/)
-   [installed git](https://git-scm.com/download)

## How to run locally

-   clone or download repository
    `git clone https://github.com/MHekert/simple-movie-rest`
-   change directory to cloned/downloaded one
    `cd /path/to/project/directory`
-   create .env file ([go to example](#.env))`
-   install dependencies
    `yarn install`
-   start MongoDB - linux: `sudo mongod` - windows: [follow installation guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
-   run application
    `yarn start`

## useful scripts

-   transpile typescript to javascript
    `yarn build`
-   transpile typescript and start application
    `yarn start`
-   run application without typescript transpilation
    `yarn justStart`
-   transpile typescript and run tests
    `yarn test`
-   run tests without typescript transpilation
    `yarn justTest`

## .env

### example

```
NODE_ENV=development
PORT=8080
OMDBAPI_KEY=APIKEY
MONGODB_URI=mongodb://localhost:27017/simpleRest
MONGODB_URI_TEST=mongodb://localhost:27017/simpleRestTest
```

### explanations

-   `NODE_ENV`- optional, default value:`development`. [Read more](http://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production)
-   `PORT` - port on which application will run
-   `OMDBAPI_KEY` - API key for [OMDb API](http://www.omdbapi.com)
-   `MONGODB_URI` - URI to MongoDB database which will be used on runtime
-   `MONGODB_URI_TEST` - URI to MongoDB database which will be used for tests
