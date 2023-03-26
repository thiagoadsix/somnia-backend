# Somnia

🌙 Somnia is an application for interpreting dreams. Built with Clean Architecture principles using Node.js, TypeScript, Jest, and Serverless Framework with DynamoDB as the database and OpenAPI for dream interpretation.

🚀 Instant Value: All basic tools included and configured:

- NodeJS-v18.15.0
- Typescript-v5.0
- Esm
- Eslint - with some initial rules recommendation
- Jest - for fast unit testing and code coverage
- Type definitions for Node.js and Jest
- Prettier - to enforce consistent code style
- Scripts(#available-scripts) for common operations
- editorconfig - for consistent coding style
- NPM scripts for common operations
- Serverless configuration for AWS Lambda and API Gateway, and other services
- OpenAPI for dream interpretation
- Clean Architecture with use cases, entities, and repositories

## Getting Started

This project is intended to be used with the latest LTS release of Node.js.

### Clone repository

To clone the repository, use the following commands:

```sh
git clone https://github.com/thiagoadsix/somnia
cd somnia
npm i
```

## Available Scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `prebuild` - lint source files and tests before building,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `prettier` - reformat files,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests
