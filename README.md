# Task Management App

## Backend application developed on [Nest](https://github.com/nestjs/nest)

### Features

- Secure all incoming routes with AuthGuard
- Secure and hash password using bcrypt
- Authenticate and authorize using jwt
- Save and perform CRUD operations using typeorm library [Postgres]
- Validate entities before sending request to server
- Validate env variables and set env variables at run time
- Serialize data using nestjs interceptor to convert class objects to plain objects

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
