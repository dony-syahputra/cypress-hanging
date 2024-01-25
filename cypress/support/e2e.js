// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands';
// Alternatively you can use CommonJS syntax:
// require('./commands')

//import registerCypressGrep from '@cypress/grep';
//registerCypressGrep();

chai.use(require('chai-json-schema'));
import './commands';
import { removeExampleFromTitle, createCommentFromLog } from '@lib/stringHelper';
import ZephyrProject from '@api/zephyr/zephyrAPI';

let zephyrProject;
let logs = [];

before(function () {
  Cypress.on('log:added', (log) => {
    const message = `${log.consoleProps.Command}: ${log.message}`;
    logs.push(log);
    console.log(message);
  });

  let projectKey;
  if (Cypress.spec.relative.includes('.feature')) {
    // E2E Test using .feature file
    let pickle = this.currentTest._testConfig.unverifiedTestConfig.env.__cypress_cucumber_preprocessor_dont_use_this_spec.pickle;
    projectKey = pickle.tags[0].name.replace('@ProjectKey-', '');
  } else {
    // Integration Test using .spec file
    projectKey = this.currentTest.parent._testConfig.tags.replace('@ProjectKey-', '');
  }
  zephyrProject = new ZephyrProject(projectKey, Cypress.config('zephyrTestCycleKey')[projectKey]);
});

beforeEach(function () {
  //cy.clearAllCookies();
  //cy.clearAllLocalStorage();
  //cy.clearAllSessionStorage();
  logs = [];
});

// To debug, uncomment these lines, run your feature files while opening DevTools in Chrome & check the Console
// You can see the whole this.currentTest attributes there
/* afterEach(function () {
  console.log(this);
  debugger;
}); */
afterEach(function () {
  let testTitle = removeExampleFromTitle(this.currentTest.title);
  let testCaseKey;
  let testSteps;

  if (Cypress.spec.relative.includes('.feature')) {
    let pickle = this.currentTest._testConfig.unverifiedTestConfig.env.__cypress_cucumber_preprocessor_dont_use_this_spec.pickle;
    testCaseKey = pickle.tags[1].name.replace('@', '');
    testSteps = pickle.steps.map((step) => step.text).join('<br>');
  } else {
    testCaseKey = this.currentTest._testConfig.unverifiedTestConfig.tags.replace('@', '');
    testSteps = testTitle;
  }

  if (Cypress.config('zephyrUploadResult') && testCaseKey) {
    let testStatus = this.currentTest.state === 'passed' ? 'Pass' : 'Fail';
    let testComment = createCommentFromLog(this.currentTest, logs);

    zephyrProject.updateBDDScriptByTestCaseKey(testCaseKey, testSteps, testStatus);
    zephyrProject.addTestExecution(testCaseKey, testStatus, testComment);
  }
});
