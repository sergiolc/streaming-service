# Streaming service - coding challenge

## Setup

Run `git clone <project-url>` to clone repository.

Run `npm install` to install dependencies.

## Development

Run `npm run watch` to start serveron watch mode.

## Start

Run `npm start` to start server.

Navigate to `http://localhost:3000/`.

## Run unit tests

Run `npm test` to execute the unit tests via [Mocha].

## API endpoints

`GET /` main route

`GET /users/:userId/streams` return streaming count and status 

ex. response body => { count: 4, status: "NOT_ALLOWED" }

### For testing

`PUT /users/:userId/streams` update streaming count (body = `{ count: 5 }`)

`POST /users/:userId/streams` increment streaming count

`DELETE /users/:userId/streams` decrement streaming count

## Online service

Service is hosted on Heroku: `https://slc-streaming-service.herokuapp.com/`.

## Considerations

For simplicity, the app is implemented with in memory data store. In production the data would be persisted in a distributed database or caching system (memcached/redis) for scalability. That way we could have multiple instances of the service running simultaneously under a load balancer.
