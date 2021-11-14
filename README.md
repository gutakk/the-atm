# The ATM


## [Live Demo](https://the-atm.herokuapp.com)


## Languages and Tools
* [Typescript](https://www.typescriptlang.org/)
* [React-Redux](https://react-redux.js.org/) with [Redux toolkits](https://redux-toolkit.js.org/)
* [TailwindCSS](https://tailwindcss.com/)
* [Cypress](https://www.cypress.io/) for UI testing
* [Github Actions](https://github.com/gutakk/the-atm/actions) for CI/CD purpose

## Prerequisite
* [NodeJS version 16 or above](https://nodejs.org/en/download/package-manager/)

## Usage
### Start development server steps
#### Install dependencies
```js
npm install
```
#### Start development server
```js
npm run dev
```
To visit app locally: `localhost:300`

### Run unit tests
```js
npm test
```

### Run UI tests
```js
// Browser
npm run cypress:open

// Headless
npm run cypress:run
```
