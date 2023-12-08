# Blaze Challenge (Backend)

This is the backend project for https://github.com/fzabala/blaze-challenge-frontend.git

## What do I need?
- Docker
- Docker-compose

## How to run it?

- Create your own `.env` based on `.env.example`
  - `cp .env.example .env`
  - Replace `API_FOOTBALL_KEY` with your own value
- Install dependencies
  - `npm install`
- Run the container
  - `docker-compose up --build`

## How to run migrations?

- Go to the backend container
  - `docker exec -ti blaze-challe nge_blaze_backend_1 sh`
- Once there, run the migrations
  - `npm run migrate`

## How to connect with frontend?
- Inspect the container to get the IPAddress, using something like this and use it in your frontend `.env` file
  - `docker inspect blaze-challenge_blaze_backend_1 | grep \"IPAddress\"`

## How to test it?

- Create your own `.env.test` based on `.env.test.example`
  - `cp .env.example .env`
  - Replace `API_FOOTBALL_KEY` with your own value
- Run the tests
  - `npm run test`
