import { v4 as uuidv4 } from 'uuid';
import { generateRandomLicenseNumber } from '../../../../lib/stringHelper';
import customerData4W from '../../../../fixtures/los/conven/payload/customerData4W.json';
import customerPayload from '../../../../fixtures/los/conven/payload/customerPayload.json';
import customerFollowUp from '../../../../fixtures/los/conven/payload/customerFollowUp.json';
import myAssignmentPage from '../../../../pom/los/conven/surveyor-platform/myAssignmentPage';

const BASE_API_URL = Cypress.env('los').conven.apiBaseUrl;
const API_SECRET = Cypress.env('los').conven.apiSecret;
export class TestData {
  constructor() {
    this.leadGroupId = '';
    this.leadGroupNumber = '';
    this.leadId = [];
    this.licenseNumber = [];
    this.customerName = '';
    this.assignmentId = '';
    this.assignmentType = '';
    this.generateData = '';
    this.riskType = '';
    this.martialStatus = '';
  }

  generateLeadGroupNumber() {
    const randomNumber = Math.floor(Math.random() * 1000);
    this.leadGroupNumber = `000004${randomNumber}`;
  }

  generateGroupId() {
    this.leadGroupId = uuidv4();
  }

  setAssignmentType(type) {
    this.assignmentType = type;
  }

  setGenerateData(generateData) {
    this.generateData = generateData;
  }

  setAssignmentId(id) {
    const query = this.generateData ? this.customerName : id;
    return new Cypress.Promise((resolve) => {
      cy.intercept(
        `${BASE_API_URL}/v1/surveyor-assignment/surveyor/filter?page=1&limit=10&searchField=*&applicationStatusList=WIP,OPEN,CONFIRMED,UNCONFIRMED,FOLLOW_UP_OPEN,UW_RETURNED&sortBy=created_at.desc`
      ).as('assignmentList');

      myAssignmentPage.searchField().type(query, { delay: 500 });
      myAssignmentPage.searchButton().click();

      cy.wait('@assignmentList').then(({ response }) => {
        if (this.generateData) {
          if (this.assignmentType === '4W') {
            const assignmentId = response.body.find((obj) => obj.lead_group_id === this.leadGroupId);
            this.assignmentId = assignmentId.assignment_id;
          } else {
            const assignmentId = response.body.find((obj) => obj.lead_id === this.leadId);
            this.assignmentId = assignmentId.assignment_id;
          }
        } else {
          this.assignmentId = id;
        }
        resolve();
      });
    });
  }

  generateLeadReserve(applicationNumber, risk) {
    return new Cypress.Promise((resolve) => {
      this.generateGroupId();
      this.customerName = customerData4W[risk].full_name;
      const promises = [];

      for (let i = 0; i < applicationNumber; i++) {
        this.licenseNumber[i] = generateRandomLicenseNumber();
        this.leadId[i] = uuidv4();
        const payload = {
          lead_group_id: this.leadGroupId,
          lead_id: this.leadId[i],
          customer_id: 'YYY001',
          customer_name: customerData4W[risk].full_name,
          id_type: 'KTP',
          id_number: customerData4W[risk].identity_number,
          license_number: this.licenseNumber[i],
          branch_id: 401,
          product_id: 1,
          active_agreement: [
            {
              agreement_number: 'test',
              product_id: 1,
              branch_id: 401,
              attached: true
            }
          ]
        };

        const option = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-secret': API_SECRET
          },
          url: `${BASE_API_URL}/v2/lead-reserve`,
          body: payload
        };

        promises.push(
          cy.request(option).then((res) => {
            expect(res.status).to.eq(201);
          })
        );
      }

      Cypress.Promise.all(promises).then(() => {
        resolve(true);
      });
    });
  }

  generateFollowUpPayload(applicationNumber, risk) {
    return new Cypress.Promise((resolve) => {
      this.generateLeadGroupNumber();
      const payload = {
        lead_group_id: this.leadGroupId,
        lead_group_number: this.leadGroupNumber,
        applications: []
      };
      const promises = [];

      for (let i = 0; i < applicationNumber; i++) {
        payload.applications[i] = JSON.parse(JSON.stringify(customerFollowUp.applications[0]));
        payload.applications[i].customer.full_name = customerData4W[risk].full_name;
        payload.applications[i].lead.lead_id = this.leadId[i];
        console.log(this.licenseNumber[i]);
        payload.applications[i].asset.license_number = this.licenseNumber[i];
      }

      const option = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-secret': API_SECRET
        },
        url: `${BASE_API_URL}/v2/application/follow-up`,
        body: payload
      };

      promises.push(
        cy.request(option).then((res) => {
          expect(res.status).to.eq(201);
        })
      );

      Cypress.Promise.all(promises).then(() => {
        resolve(true);
      });
    });
  }

  generateApplicationPayload(applicationNumber, risk) {
    return new Cypress.Promise((resolve) => {
      const payload = {
        lead_group_id: this.leadGroupId,
        lead_group_number: this.leadGroupNumber,
        applications: []
      };
      const promises = [];

      for (let i = 0; i < applicationNumber; i++) {
        payload.applications[i] = JSON.parse(JSON.stringify(customerPayload.applications[0]));
        payload.applications[i].customer.full_name = customerData4W[risk].full_name;
        payload.applications[i].customer.identity_number = customerData4W[risk].identity_number;
        payload.applications[i].customer.gender = customerData4W[risk].gender;
        payload.applications[i].customer.marital_status = customerData4W[risk].marital_status;
        payload.applications[i].customer.date_of_birth = customerData4W[risk].date_of_birth;
        payload.applications[i].customer.place_of_birth = customerData4W[risk].place_of_birth;
        payload.applications[i].lead.lead_id = this.leadId[i];
        payload.applications[i].asset.license_number = this.licenseNumber[i];
      }

      const option = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-secret': API_SECRET
        },
        url: `${BASE_API_URL}/v2/application`,
        body: payload
      };

      promises.push(
        cy.request(option).then((res) => {
          expect(res.status).to.eq(201);
        })
      );

      Cypress.Promise.all(promises).then(() => {
        resolve(true);
      });
    });
  }
}
export const testData = new TestData();
