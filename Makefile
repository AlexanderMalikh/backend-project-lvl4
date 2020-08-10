setup:
	npm install
	npx knex migrate:latest

build:
	npm run build

start:
	heroku local -f Procfile

start-backend:
	npx nodemon --exec npx babel-node server/index.js

start-frontend:
	npx webpack-dev-server

lint:
	npx eslint .

test:
	npm run test