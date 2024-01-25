# Cypress Test Automation

## **Prerequisites**

Before you continue, ensure you meet the following requirements:

- Visual Code: https://code.visualstudio.com/
- Version nodejs: 20.5.1
- Version Cypress: 13.2.0
- Install dependency at current working directory: `npm install`

More detailed pre-setup can be found on this Confluence Page: [Pre Setup for Writing Cypress Automation Tests](https://bfifinance.atlassian.net/l/cp/AV06WKUc)

## **How to Run**

```
npm run <command>
```

Available `<command>` are available at `package.json` file, inside `scripts` block
or by opening cypress gui by using this command and select feature file to run

```
npx cypress open
```

Do not forget to create `cypress.env.json` file beforehand, to set environment variables needed for your test

Example file

```
{
    "agency-spv": {
        "baseUrl": "",
        "user": "",
        "password": ""
    },
    "dms-edocservice": {
        "baseUrl"  : "",
        "user" : "",
        "password" : ""
    }
}


```

Do not forget to set your Zephyr test cycle on `cypress.config.js` under `e2e` file beforehand

```
  e2e: {
    ...
    zephyrTestCycleKey: { // use projectKey as attribute name, example BA: "BA-R14"
      BA: "BA-R14"
    }
  }
```

Or if you want to run without uploading to Zephyr, just simply update this config

```
  e2e: {
    ...
    zephyrUploadResult: false, //default value is false - true means upload test result to zephyr.
  }
```

## **Folder Structure**

```
Folder structure of UI test
    cypress
    ├── e2e                           # E2E tests folder
    │   ├── agency-spvcockpit         # Platform folder
    │   │   ├── login                 # Feature folder
    │   │   │   ├── login.feature     # Feature file
    │   │   │   ├── login.js          # Step definitions file
    ├── pom                           # Page object folder
    │   ├── agency-spvcockpit         # Platform folder
    │   │   ├── loginPage.js          # Page object class
    ├── fixtures                      # Data folder
    │   ├── agency-spvcockpit         # Platform folder
    │   │   ├── prices.json           # JSON data
    ├── lib                           # Lib folder to put any helper functions, ie randomizeString, etc
    ├── support                       # Support folder includes commands.js and e2e.js
    ├── cypress.config.js             # Configuration file
    ├── cypress.env.json              # Environment configuration (ie URL, API Key, Credentials), never pushed to repo
    └── ...
```

```
Folder structure of API test
    cypress
    ├── integration                   # Integration tests folder
    │   ├── agency-spvcockpit         # Platform folder
    │   │   ├── authAPI.spec.js       # Test file
    │   │   ├── dashboardAPI.spec.js  # Test file
    ├── api                           # API classes folder
    │   ├── agency-spvcockpit         # Platform folder
    │   │   ├── authAPI.js            # API class
    │   │   ├── dashboardAPI.js       # API class
    ├── schema                        # Schema folder
    │   ├── agency-spvcockpit         # Platform folder
    │   │   ├── tokenSchema.js        # JSON Schema file
    │   │   ├── errMsgSchema.js       # JSON Schema file
    └── ...
```

## **Sample Implementation**

Sample code for UI test available at `/e2e/sample`
Sample code for API test available at `/integration/sample`

## **Cache Login Session**

To avoid relogin each time you run the test, use cy.session. Sample of this available at `/e2e/sample/commonAction.js` and `/api/sample/authAPI.js`

```
  cacheToken(username, password) {
    // save the token to cy session, can be access by localStorage.token
    // add validate to ensure the getToken is again called once token is expired
    cy.session(
      ['loginByAPI', username],
      () => {
        this.getToken(username, password).then((response) => {
          window.localStorage.setItem('token', response.body.access_token);
          window.localStorage.setItem('tokenExpiredAt', new Date().getTime() + (response.body.expires_in - 30) * 1000);
        });
      },
      {
        validate() {
          expect(new Date().getTime() < localStorage.tokenExpiredAt).to.be.true;
        },
        cacheAcrossSpecs: true
      }
    );
  }
```

## **Code Structure**

Code structure, naming conventions, linter and CI/CD configuration are explained in detail in this Confluence Page: [Code Structure for Cypress](https://bfifinance.atlassian.net/l/cp/wVvT00nM)
