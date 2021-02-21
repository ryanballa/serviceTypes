# Requirements

This project was built on Node v14.15.4

# How to Run

Run "yarn install" in both the API an UI directories. 

The UI can be run without the API but will not be completely functional. The UI handles when the API is unavailable though. 

In API run "yarn dev"

In UI run "yarn start"

The UI can be seen at http://localhost:8080

Tests can be run "yarn test" for unit and "yarn test:cypress" for integration.

# Project Details

The UI was built using React, Snowpack, and Bootstrap. The API was created from scratch based on the project requirements using Tinyhttp. 

# Testing

The UI is tested lightly with some unit tests and more thoroughly tested with integration tests using Cypress. I normally would have higher ratio of unit tests but Snowpack testing practices with React and web-test-runner are limited (this is the first time using Snowpack). Setting up Jest, which is what I normally use, was proving to be more difficult. Integration tests work well here to fully test the UI.
