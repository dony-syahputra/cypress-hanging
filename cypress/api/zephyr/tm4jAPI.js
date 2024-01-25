// This TM4J (Test Mgt for Jira) API is taken from the web (via inspect network), not yet supported by Zephyr Scale API Doc

export default class Tm4jAPI {
  constructor() {
    this.baseUrl = Cypress.env('tm4j').baseUrl;
    this.jwtToken = Cypress.env('tm4jToken');

    this.zephyrBaseUrl = Cypress.env('zephyr').baseUrl;
    this.apiKey = Cypress.env('zephyr').apiKey;
  }

  getTestCasesByStatus(projectKey, status) {
    const options = {
      method: 'GET',
      url: `${this.baseUrl}/testcase/search?fields=key,name&query=testCase.projectKey+IN+('${projectKey}')+AND+testCase.statusName+IN+('${status}')`,
      headers: {
        authorization: `JWT ${this.jwtToken}`
      },
      failOnStatusCode: false
    };

    return cy.request(options).then((response) => {
      return response.body;
    });
  }

  // returns map of tcDistribution
  // tcDistribution: key => statusName, value => totalTC
  // tcDistribution: { Draft: 0, Approved: 0, Automated: 0, Failed: 0 }
  getTCDistributionByStatus(projectKey) {
    let tcDistribution = { Draft: 0, Approved: 0, Automated: 0, Failed: 0 };

    return this.getTestCasesByStatus(projectKey, 'Draft').then((testcases) => {
      tcDistribution['Draft'] = testcases.total;
      return this.getTestCasesByStatus(projectKey, 'Approved').then((testcases) => {
        tcDistribution['Approved'] = testcases.total;
        return this.getTestCasesByStatus(projectKey, 'Automated').then((testcases) => {
          tcDistribution['Automated'] = testcases.total;
          return this.getTestCasesByStatus(projectKey, 'Failed').then((testcases) => {
            tcDistribution['Failed'] = testcases.total;
            return tcDistribution;
          });
        });
      });
    });
  }

  getProjects() {
    const options = {
      method: 'GET',
      url: `${this.zephyrBaseUrl}/projects?maxResults=100`,
      headers: {
        authorization: `Bearer ${this.apiKey}`
      },
      failOnStatusCode: false
    };

    return cy.request(options).then((response) => {
      return response.body;
    });
  }
}
