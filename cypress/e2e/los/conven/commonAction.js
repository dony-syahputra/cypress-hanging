import moment from 'moment';
import assignmentDetailPage from '../../../pom/los/conven/surveyor-platform/assignmentDetailPage';
import creditCheckingPage from '../../../pom/los/conven/surveyor-platform/creditCheckingPage';
import assetValidationPage from '../../../pom/los/conven/surveyor-platform/assetValidationPage';
import { generateRandomLicenseNumber } from '../../../lib/stringHelper';
import scoringResultJson from '../../../fixtures/los/conven/scoring-result/scoringResult.json';
import commonObjects from '../../../pom/los/conven/surveyor-platform/commonObjects';
import addressSearchPage from '../../../pom/los/conven/surveyor-platform/addressSearchPage';
import { testData } from './test-data/testData';

const testImage = '../fixtures/images/ktp.jpeg';
const todayDate = moment().format('DD');
const currentHour = moment().hour();

export function selectBottomsheet(fieldElement, fieldSelection, option) {
  fieldElement.as('fieldElement');
  fieldSelection.as('fieldSelection');
  cy.get('@fieldElement').click();
  cy.get(`[data-testid="${option}"]`).click({ waitForAnimations: true });
  cy.get('@fieldSelection').should('have.value', option);
  cy.get('[data-testid^="bottomSheetSelect"]').should('not.exist');
}

export function updateCallResult() {
  cy.wait('@assignmentDetail');
  assignmentDetailPage.updateCallResultButton().click({ scrollBehavior: false });
  selectBottomsheet(assignmentDetailPage.callStatusField(), assignmentDetailPage.callStatusSelect(), 'CONFIRMED');
  assignmentDetailPage.appointmentDateField().click();
  commonObjects.datePickerDayButton(todayDate).click();
  if (Cypress.env('los').conven['useNewUpdateCallResult']) {
    assignmentDetailPage.appointmentTimeField().click();
    assignmentDetailPage.appointmentTimeHour(currentHour - 1).click();
    assignmentDetailPage.appointmentTimeMinute(30).click();
    commonObjects.updateButton().last().click();
  } else {
    selectBottomsheet(assignmentDetailPage.appointmentTimeField(), assignmentDetailPage.appointmentTimeSelect(), '21');
  }
  assignmentDetailPage.surveyorNotesTextarea().type('Automation Testing');
  assignmentDetailPage.updateButton().click().should('not.exist');
}

export function fillInScoringForm(risk, takeover, scoringResult) {
  const scoringAnswer = scoringResultJson[risk][scoringResult];
  const isTakeOver = takeover === 'takeover' ? true : false;
  cy.wait('@applicationDetail').then(({ response }) => {
    const assetInformationList = response.body.surveyor_assignment_collateral_information_response_list;
    const length = assetInformationList.length;
    for (let i = 0; i < length; i++) {
      let newLicenseNumber = generateRandomLicenseNumber();
      commonObjects.nextButton().should('be.disabled');
      assetValidationPage.assetItemListCard().should('have.length', length);
      assetValidationPage.assetItemNotDoneCard(i + 1).click();
      assetValidationPage.detailAssetField().should('not.have.value', '');
      assetValidationPage.licenseNumberField().should('not.have.value', '');
      if (isTakeOver) {
        assetValidationPage.licenseNumberEditButton().click();
        assetValidationPage.editLicenseNumberField().last().clear().type(newLicenseNumber);
        commonObjects.updateButton().click();
        assetValidationPage.editLicenseLanjutkanButton().click();
        assetValidationPage.licenseNumberField().should('have.value', newLicenseNumber);
      }
      selectBottomsheet(assetValidationPage.unitAtWorkshopField(), assetValidationPage.unitAtWorkshopSelect(), scoringAnswer.atWorkshop);
      selectBottomsheet(
        assetValidationPage.unitOnCustomerPossessionField(),
        assetValidationPage.unitOnCustomerPossessionSelect(),
        scoringAnswer.inPossession
      );
      selectBottomsheet(
        assetValidationPage.unitInteriorConditionField(),
        assetValidationPage.unitInteriorConditionSelect(),
        scoringAnswer.interiorCondition
      );
      selectBottomsheet(
        assetValidationPage.unitDentCoditionField(),
        assetValidationPage.unitDentCoditionSelect(),
        scoringAnswer.dentCondition
      );
      if (scoringResult === 'partial' && assetInformationList[i].assignment_id != testData.assignmentId) {
        selectBottomsheet(assetValidationPage.unitAbleTurnOnField(), assetValidationPage.unitAbleTurnOnSelect(), 'false');
      } else {
        selectBottomsheet(
          assetValidationPage.unitAbleTurnOnField(),
          assetValidationPage.unitAbleTurnOnSelect(),
          scoringAnswer.ableToTurnOn
        );
      }

      selectBottomsheet(
        assetValidationPage.assetEngineAndChassisNumberField(),
        assetValidationPage.assetEngineAndChassisNumberSelect(),
        'APPROPRIATE'
      );
      if (isTakeOver) {
        assetValidationPage.takeOverSwitch().click();
        selectBottomsheet(assetValidationPage.takeOverFinanceCompanyField(), assetValidationPage.takeOverFinanceCompanySelect(), 'BCA');
        assetValidationPage.takeOverContractNumberField().type(`${i}423`);
        selectBottomsheet(
          assetValidationPage.takeOverContractOnBehalfField(),
          assetValidationPage.takeOverContractOnBehalfSelect(),
          'CUSTOMER'
        );
        assetValidationPage.takeOverContractNameField().type('Automation');
        assetValidationPage.takeOverInstallmentAmountField().type('100000');
        assetValidationPage.takeOverCurrentPastDueDayField().click('topRight').type('1');
        assetValidationPage.takeOverOngoingInstallmentField().type('3000000');
        assetValidationPage.takeOverPrepaymentField().type('3000000');
        assetValidationPage.takeOverAmortizationFileUpload().attachFile(testImage);
        assetValidationPage.takeOverAmortizationThumbnailImage().should('be.visible');
        selectBottomsheet(assetValidationPage.takeOverRelationshipField(), assetValidationPage.takeOverRelationshipSelect(), 'PA');
      }
      if (risk === 'medium_risk') {
        assetValidationPage.taxDateField().click();
        commonObjects.datePickerDayButton(todayDate).click();
        assetValidationPage.taxBasedPaymentField().type('3000000');
        assetValidationPage.taxNoticesFileUpload().attachFile(testImage);
        assetValidationPage.taxNoticesThumbnailImage().should('be.visible');
      }
      commonObjects.nextButton().click();
      commonObjects.confrimationYesButton().click();
    }
    assetValidationPage.assetItemListCard().should('not.exist');
    commonObjects.nextButton().click();
    commonObjects.confrimationYesButton().click();
  });
}

export function fillInCreditChecking() {
  creditCheckingPage.checkingSourceCard().should('have.length', 2);
  for (let i = 0; i < 2; i++) {
    creditCheckingPage.checkingSourceCard(i + 1).click();
    selectBottomsheet(creditCheckingPage.sourceField(), creditCheckingPage.sourceSelect(), 'TETANGGA');
    creditCheckingPage.picNameField().type('Auto');
    creditCheckingPage.phoneNumberField().type('87860005050');
    selectBottomsheet(creditCheckingPage.unitOwnershipField(), creditCheckingPage.unitOwnershipSelect(), 'Debitur');
    selectBottomsheet(creditCheckingPage.unitOwnershipPeriodField(), creditCheckingPage.unitOwnershipPeriodSelect(), '6 Bulan - 1 Tahun');
    selectBottomsheet(
      creditCheckingPage.houseOwnershipValidityField(),
      creditCheckingPage.houseOwnershipValiditySelect(),
      'Sendiri / Pasangan'
    );
    selectBottomsheet(creditCheckingPage.businessValidityField(), creditCheckingPage.businessValiditySelect(), 'Sesuai');
    selectBottomsheet(creditCheckingPage.ocupationField(), creditCheckingPage.ocupationSelect(), 'EMPLOYEE');
    selectBottomsheet(creditCheckingPage.negativeInfoField(), creditCheckingPage.negativeInfoSelect(), 'NO_NEGATIVE_INFO');
    creditCheckingPage.otherInformationField().type('VALID');
    creditCheckingPage.interviewFileUpload().attachFile(testImage);
    creditCheckingPage.interviewThumbnailImage().should('be.visible');
    commonObjects.nextButton().first().click();
  }
  creditCheckingPage.checkingSourceCard().should('be.visible');
  commonObjects.nextButton().first().click();
}

export function searchAddress(type, address) {
  switch (type) {
    case 'pinpoint':
      addressSearchPage.confirmLocationButton().should('be.visible');
      addressSearchPage.mapAddressSearchField().type(address, { delay: 300 });
      addressSearchPage.locationNameList().first().click();
      addressSearchPage.locationPinpointImage().should('be.visible');
      addressSearchPage.confirmLocationButton().should('be.visible').click();
      break;
    case 'list':
      addressSearchPage.searchField().type(address, { delay: 300 });
      addressSearchPage.addressList().first().click();
      break;
  }
}
