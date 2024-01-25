// API Doc: https://support.smartbear.com/zephyr-scale-cloud/api-docs

export default class ZephyrAPI {
  constructor(projectKey, testCycleKey) {
    this.baseUrl = Cypress.env('zephyr').baseUrl;
    this.accountId = Cypress.env('zephyr').accountId;
    this.apiKey = Cypress.env('zephyr').apiKey;
    this.projectKey = projectKey;
    this.testCycleKey = testCycleKey;
    this.isTestCaseStatusesCached = false;
  }

  addTestCaseStatus(statusName) {
    const options = {
      method: 'POST',
      url: `${this.baseUrl}/statuses`,
      headers: {
        authorization: `Bearer ${this.apiKey}`
      },
      body: {
        projectKey: this.projectKey,
        name: statusName,
        type: 'TEST_CASE'
      },
      failOnStatusCode: false
    };

    return cy.request(options);
  }

  getTestCaseStatuses() {
    const options = {
      method: 'GET',
      url: `${this.baseUrl}/statuses?projectKey=${this.projectKey}&statusType=TEST_CASE&maxResults=20`,
      headers: {
        authorization: `Bearer ${this.apiKey}`
      },
      failOnStatusCode: false
    };

    return cy.request(options).then((response) => {
      return response.body;
    });
  }

  getCachedTestCaseStatuses() {
    let fixtureFilePath = 'cypress/fixtures/zephyr/' + this.projectKey + 'TestCaseStatuses.json';

    if (!this.isTestCaseStatusesCached) {
      this.addTestCaseStatus('Automated').then(() => {
        this.addTestCaseStatus('Failed').then(() => {
          this.getTestCaseStatuses().then((statuses) => {
            cy.writeFile(fixtureFilePath, statuses);
          });
        });
      });
      this.isTestCaseStatusesCached = true;
    }

    return cy.readFile(fixtureFilePath).then((fileContent) => {
      return fileContent;
    });
  }

  //somehow this does not work, the localStorage.testCaseStatuses always undefined after calling this function
  cacheTestCaseStatuses() {
    // save the statuses to cy session, can be access by localStorage.testCaseStatuses
    cy.session(
      ['testCaseStatuses', this.projectKey],
      () => {
        this.addTestCaseStatus('Automated').then(() => {
          this.addTestCaseStatus('Failed').then(() => {
            this.getTestCaseStatuses().then((statuses) => {
              window.localStorage.setItem('testCaseStatuses', JSON.stringify(statuses));
              cy.task('log', 'Cached ' + JSON.parse(localStorage.testCaseStatuses).values[0].name);
            });
          });
        });
      },
      {
        validate() {
          cy.task('log', 'validate ' + JSON.parse(localStorage.testCaseStatuses).values[0].name);
          expect(localStorage.testCaseStatuses).to.not.be.empty;
        },
        cacheAcrossSpecs: true
      }
    );
  }

  getTestCaseStatusId(testStatus, zephyrStatuses) {
    var statusId = zephyrStatuses.find((status) => status.name === 'Failed').id;
    if (testStatus === 'Pass') {
      statusId = zephyrStatuses.find((status) => status.name === 'Automated').id;
    }

    return statusId;
  }

  getTestCaseByTestCaseKey(testCaseKey) {
    const options = {
      method: 'GET',
      url: `${this.baseUrl}/testcases/${testCaseKey}`,
      headers: {
        authorization: `Bearer ${this.apiKey}`
      },
      failOnStatusCode: false
    };

    return cy.request(options).then((response) => {
      return response.body;
    });
  }

  updateTestCaseByTestCaseKey(testCaseKey, testCaseJson) {
    const options = {
      method: 'PUT',
      url: `${this.baseUrl}/testcases/${testCaseKey}`,
      headers: {
        authorization: `Bearer ${this.apiKey}`
      },
      body: testCaseJson,
      failOnStatusCode: false
    };

    return cy.request(options);
  }

  updateBDDScriptByTestCaseKey(testCaseKey, bddScript, testStatus) {
    this.getCachedTestCaseStatuses().then((statuses) => {
      var statusId = this.getTestCaseStatusId(testStatus, statuses.values);

      this.getTestCaseByTestCaseKey(testCaseKey).then((testCase) => {
        testCase.status.id = statusId;
        testCase.customFields = {
          ...testCase.customFields,
          'BDD Script': bddScript
        };

        this.updateTestCaseByTestCaseKey(testCaseKey, testCase);
      });
    });
  }

  addTestExecution(testCaseKey, testStatus, testComment) {
    const options = {
      method: 'POST',
      url: `${this.baseUrl}/testexecutions`,
      headers: {
        authorization: `Bearer ${this.apiKey}`
      },
      body: {
        projectKey: this.projectKey,
        testCaseKey: testCaseKey,
        testCycleKey: this.testCycleKey,
        statusName: testStatus,
        executedById: this.accountId,
        assignedToId: this.accountId,
        comment: testComment
      },
      failOnStatusCode: false
    };

    return cy.request(options);
  }
}
