/// <reference types="Cypress" />

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '@pom/los/conven/surveyor-platform/loginPage';
import homePage from '@pom/los/conven/surveyor-platform/homePage';
import myAssignmentPage from '@pom/los/conven/surveyor-platform/myAssignmentPage';
import { testData } from '@e2e/los/conven/test-data/testData';
import { fillInCreditChecking, fillInScoringForm, selectBottomsheet, updateCallResult } from '@e2e/los/conven/commonAction';
import assignmentDetailPage from '@pom/los/conven/surveyor-platform/assignmentDetailPage';
import commonObjects from '@pom/los/conven/surveyor-platform/commonObjects';
import documentSubmissionPage from '@pom/los/conven/surveyor-platform/documentSubmissionPage';
import scoringResultPage from '@pom/los/conven/surveyor-platform/scoringResultPage';
import scoringResultJson from '@fixtures/los/conven/scoring-result/scoringResult.json';
import assignmentHistoryPage from '@pom/los/conven/surveyor-platform/assignmentHistoryPage';
import simpleSurveyPage from '@pom/los/conven/surveyor-platform/simpleSurveyPage';

const baseURL = Cypress.env('los').conven.baseUrl;
const baseApiURL = Cypress.env('los').conven.apiBaseUrl;
const testImage = '../fixtures/images/ktp.jpeg';
let surveyorType;

Given(`Surveyor visit surveyor platform`, () => {
  cy.viewport('iphone-xr');
  cy.visit(baseURL);
});

When('Surveyor login with {string} credentials', (type) => {
  surveyorType = type;
  const username = Cypress.env('los').conven[`username${surveyorType}`];
  const password = Cypress.env('los').conven[`password${surveyorType}`];
  loginPage.usernameField().type(username).should('have.value', username);
  loginPage.passwordFiled().type(password).should('have.value', password);
  loginPage.loginButton().click();
});

Then('Surveyor should be able to see home page', () => {
  homePage.userInfoCard().should('be.visible');
  homePage.myAssignmentCard().should('be.visible');
  if (surveyorType === 'Head') {
    homePage.cancelapprovalCard().should('be.visible');
    homePage.reassignApprovalCard().should('be.visible');
    homePage.takeApprovalCard().should('be.visible');
    homePage.bcpAprovalCard().should('be.visible');
    homePage.teamAssignmentCard().should('be.visible');
  }
  homePage.documentSubmissionCard().should('be.visible');
  homePage.assignmentHistoryCard().should('be.visible');
  homePage.searchTakeAssignmentCard().should('be.visible');
  homePage.historyRequestTakeCard().should('be.visible');
  homePage.performanceAssesmentCard().should('be.visible');
});

Then('Surveyor open Assignment Saya page', () => {
  homePage.myAssignmentCard().last().click();
  myAssignmentPage.searchButton().should('be.visible');
  myAssignmentPage.searchField().should('be.visible');
  myAssignmentPage.filterAssignmentButton().should('be.visible');
  myAssignmentPage.sortAssignmentButton().should('be.visible');
  myAssignmentPage.assignmentCard().should('be.visible');
});

Then('Surveyor fill in Follow Up Assignment {string} Call Result', (assignmentId) => {
  testData.setAssignmentId(assignmentId).then(() => {
    cy.intercept({ url: new RegExp(`${baseApiURL}/v1/surveyor-assignment/\\d+`), times: 1 }).as('assignmentDetail');
    myAssignmentPage.assignmentCard(testData.assignmentId).click();
    updateCallResult();
    assignmentDetailPage.arrowBackButton().click();
  });
});

Then('Surveyor fill in Assignment {string} Call Result and start survey', (assignmentId) => {
  testData.setAssignmentId(assignmentId).then(() => {
    cy.intercept({ url: new RegExp(`${baseApiURL}/v1/surveyor-assignment/\\d+`), times: 1 }).as('assignmentDetail');
    myAssignmentPage.assignmentCard(testData.assignmentId).click();
    updateCallResult();
    assignmentDetailPage.mulaiSurveyButton().click();
  });
});

Then('Create Follow Up Data for {string} with risk is {string} and have {string} asset', (type, risk, assetNumber) => {
  const assetNumberInt = parseInt(assetNumber);
  if (assetNumberInt === 0) {
    testData.setGenerateData(false);
  } else {
    testData.setGenerateData(true);
    testData.setAssignmentType(type);
    if (type === '4W') {
      cy.wrap(null).then(() => {
        return testData.generateLeadReserve(assetNumberInt, risk).then(() => {
          //need wait for waiting the bpm procces
          cy.wait(1000); // eslint-disable-line
          return testData.generateFollowUpPayload(assetNumberInt, risk).then(() => {});
        });
      });
    } else {
      testData.generateLeadReserve2W(risk).then(() => {
        //need wait for waiting the bpm procces
        cy.wait(1000); // eslint-disable-line
        testData.generateFollowUpPayload2W(risk);
      });
    }
  }
});

Then('Create Application Data for {string} with risk is {string} and have {string} asset', (type, risk, assetNumber) => {
  const assetNumberInt = parseInt(assetNumber);
  if (testData.generateData) {
    if (type === '4W') {
      cy.wrap(null).then(() => {
        return testData.generateApplicationPayload(assetNumberInt, risk).then(() => {
          cy.log('success');
        });
      });
    } else {
      testData.generateApplicationPayload2W(risk);
    }
    cy.wait(20000); // eslint-disable-line
  }
});

Then('Surveyor fill in {string} Scoring Form with {string} and scoring result {string}', (risk, takeover, scoringResult) => {
  cy.intercept(`${baseApiURL}/v2/surveyor-assignment-collateral-information/*`).as('applicationDetail');
  testData.riskType = risk;
  switch (risk) {
    case 'low_risk':
      fillInCreditChecking();
      fillInScoringForm(risk, takeover, scoringResult);
      if (scoringResult != 'rejected') {
        commonObjects.nextButton().click();
      }
      break;
    case 'medium_risk':
      fillInScoringForm(risk, takeover, scoringResult);
      if (scoringResult != 'rejected') {
        commonObjects.nextButton().click();
      }
      break;
  }
});

Then('Surveyor Verify Scoring Form Result is {string}', (result) => {
  switch (result) {
    case 'passed':
      commonObjects.confrimationYesButton().click();
      break;
    case 'rejected':
      scoringResultPage.backToMyAssignmentButton().click();
      break;
    default:
      break;
  }
});

Then('Surveyor Do Document Submission with {string} processing branch', (branchId) => {
  homePage.documentSubmissionCard().last().click();
  documentSubmissionPage.assignmentCard().should('be.visible');
  documentSubmissionPage.searchField().type(testData.assignmentId);
  documentSubmissionPage.searchButton().click();
  documentSubmissionPage.assignmentCard().find('p').contains(new RegExp(testData.assignmentId)).should('be.visible').click();
  if (Cypress.env('los').conven['useNewDocumentSubmission']) {
    if (testData.martialStatus === 'M') {
      documentSubmissionPage.spouseSignFileUpload().attachFile(testImage);
    }
    documentSubmissionPage.nextButton().click();
    documentSubmissionPage.processingBranchSelect().select(branchId).should('have.value', branchId);
    documentSubmissionPage.documentAssetChecklist().click();
    documentSubmissionPage.documentAgreementChecklist().click();
    documentSubmissionPage.surveyorNoteTextarea().type('ALL GOOD');
    documentSubmissionPage.submitButton().click();
    documentSubmissionPage.selesaiButton().click();
    documentSubmissionPage.backButton().click();
    documentSubmissionPage.backButton().click();
  } else {
    documentSubmissionPage.processingBranchSelect().select(branchId).should('have.value', branchId);
    documentSubmissionPage.documentAssetChecklist().click();
    documentSubmissionPage.documentAgreementChecklist().click();
    documentSubmissionPage.surveyorNoteTextarea().type('ALL GOOD');
    documentSubmissionPage.submitButton().click();
    documentSubmissionPage.selesaiButton().click();
    documentSubmissionPage.backButton().click();
  }
});

Then('Surveyor Verify Assignment Status is {string} in Assignment History', (status) => {
  homePage.assignmentHistoryCard().last().click();
  assignmentHistoryPage.assignmentCard().should('be.visible');
  assignmentHistoryPage.searchField().type(testData.assignmentId);
  assignmentHistoryPage.searchButton().click();
  assignmentHistoryPage.assignmentCard(testData.assignmentId).click();
  assignmentDetailPage.logTaskButton().click();
  assignmentDetailPage.logStatusChip(status).should('be.visible');
});

Then('Surveyor fill in Simple Survey Form with Scoring Result {string}', (scoringResult) => {
  const scoringAnswer = scoringResultJson['medium_risk'][scoringResult];
  fillInCreditChecking();
  selectBottomsheet(simpleSurveyPage.houseOwnershipField(), simpleSurveyPage.houseOwnershipSelect(), 'SD');
  simpleSurveyPage.customerMonthlyInstallmentField().type(scoringAnswer.monthlyInstalment);
  simpleSurveyPage.montlyIncomeField().type(scoringAnswer.monthlyIncome);
  selectBottomsheet(simpleSurveyPage.numberOfDependencyChildField(), simpleSurveyPage.numberOfDependencyChildSelect(), '1');
  selectBottomsheet(simpleSurveyPage.numberOfDependencyOtherField(), simpleSurveyPage.numberOfDependencyOtherSelect(), '0');
  simpleSurveyPage.proofOfIncomeFileUpload().attachFile(testImage);
  simpleSurveyPage.proofOfIncomeThumbnailImage().should('be.visible');
  commonObjects.nextButton().click();
});
