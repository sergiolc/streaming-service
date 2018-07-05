# Streaming service - coding challenge

## Setup

Run `git clone https://github.com/sergiolc/streaming-service` to clone repository.

Run `npm install` to install dependencies.

## Development

Run `npm run watch` to start serveron watch mode.

## Start

Run `npm start` to start server.

Navigate to `http://localhost:8080`.


## Project structure

This project aims to provide an overview of how a streaming platform could be implemented. It uses mock data storage and mock messaging queue(implemented with RxJS/Observable).
There are actually 2 services in this project:
- API
    
    Service providing endpoints to retrieve and manipulate data. Client apps connect to this service and request to watch a video. This request is then added to a queue to be processed by the `worker service`. Once the worker has processed the request, the request's status is changed(allowed/denied) and the request is added to another queue which is processed by the `api` and send to the client app using socket.io.

    API endpoints (management of users and videos is not implemented)

    `GET /` healthy check endpoint.

    USERS:

    `GET /users` return list of users. Can also be filtered using by name (`?name=<name>`).

    `GET /users/:userId` return user.

    `GET /users/:userId/streams` return user's live streams.

    VIDEOS:

    `GET /videos` return list of videos.

    `GET /videos/stop?user=<userId>` stop all streams (remove from streams store). 
    > For tests only. Called when user logs out fom the client app.

    `GET /users/:videoId` return video.

    `GET /videos/:videoId/request?user=userId` request to stream the video.

    `GET /videos/:videoId/stop?user=userId` stop/remove stream from the user's streams list). 
    > It's called when the user stops watching a video.


- WORKER

    Service responsible for processing stream requests, checking the limit allowed for concurrent videos per user.

## Scalability
- Distributed database, messaging system and caching system.
- Multiple running instances of API and WORKER services. Using Kubernetes would ease and automate the management of multiple instances/containers based on resources usage / network load. It would help scaling up or down according to the services needs.

![Streaming Service Diagram](streaming-service.jpg?raw=true "Streaming Service Diagram")

## Online service

Service is hosted on Heroku: https://slc-streaming-service.herokuapp.com/.

Web App for tests hosted on Heroku: https://slc-streaming-ui.herokuapp.com/.

## Considerations

In a production app, the state of the video streaming could be improved and handled by the endpoint responsible for providing the video data instead of when the user selects the video or clicks `Play/Stop`.

Ex. Create a middleware which identifies when the request/stream has started or has been closed/finished. This way, the solution would allow the user to pause video A, watch video B and then resume video A.
