# Cypress automation for the Sauce Labs Swag Store saucedemo.com 

This project only includes the Cypress code for automation, not the saucedemo.com application. By default, baseUrl is set to https://www.saucedemo.com/, but could be modified to use a locally running instance of https://github.com/saucelabs/sample-app-web
This test project demonstrates:
* Custom commands
* Dynamic test creation from fixture data
* Lightweight page object
* Approaches to verifying complex objects/data
* Use of fakerJS for input generation

Requires Node and NPM

# Setup
```shell
npm install
```

# Running Cypress
``` shell
npx cypress open
```
