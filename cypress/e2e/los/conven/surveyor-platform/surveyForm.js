/// <reference types="Cypress" />
import { Then } from '@badeball/cypress-cucumber-preprocessor';
import personalDataPage from '@pom/los/conven/surveyor-platform/personalDataPage';
import { searchAddress, selectBottomsheet } from '@e2e/los/conven/commonAction';
import commonObjects from '@pom/los/conven/surveyor-platform/commonObjects';
import residenceAddressPage from '@pom/los/conven/surveyor-platform/residenceAddressPage';
import { testData } from '@e2e/los/conven/test-data/testData';
import jobDetailsPage from '@pom/los/conven/surveyor-platform/jobDetailsPage';
import emergencyContactPage from '@pom/los/conven/surveyor-platform/emergencyContactPage';
import assetVerificationPage from '@pom/los/conven/surveyor-platform/assetVerificationPage';
import moment from 'moment';
import documentSigningPage from '@pom/los/conven/surveyor-platform/documentSigningPage';

const testImage = '../fixtures/images/ktp.jpeg';
const baseApiURL = Cypress.env('los').conven.apiBaseUrl;
const todayDate = moment().format('DD');
Then('Surveyor Fill in Personal Data with Martial Status is {string}', (martialStatus) => {
  testData.martialStatus = martialStatus;
  personalDataPage.customerNameField().should('not.have.value', '');
  personalDataPage.customerIndentityNumberField().should('not.have.value', '');
  personalDataPage.customerIndentityCardPhoto().should('be.visible');
  selectBottomsheet(personalDataPage.customerReligionField(), personalDataPage.customerReligionSelect(), 'KT');
  selectBottomsheet(personalDataPage.customerNPWPTypeField(), personalDataPage.customerNPWPTypeSelect(), 'NPWP');
  personalDataPage.customerNPWPNumberField().clear().type('486510449951000');
  personalDataPage.customerNPWPFileUpload().attachFile(testImage);
  personalDataPage.customerNPWPThumbImage().should('be.visible');
  selectBottomsheet(personalDataPage.customerMartialStatusField(), personalDataPage.customerMartialStatusSelect(), martialStatus);
  if (martialStatus === 'M') {
    personalDataPage.customerMarriageCertificateFileUpload().attachFile(testImage);
    personalDataPage.customerMarriageCertificateThumbnailImage().should('be.visible');
    personalDataPage.spouseNameField().should('not.have.value', '');
    personalDataPage.spouseKTPNumberField().should('not.have.value', '');
    personalDataPage.spouseKTPFileUpload().attachFile(testImage);
    personalDataPage.spouseKTPThumbnailImage().should('be.visible');
    personalDataPage.spouseBirthPlaceField().should('not.have.value', '');
    personalDataPage.spouseDOBField().should('not.have.value', '');
    personalDataPage.spousePhoneNumberField().type('82231118989');
    selectBottomsheet(personalDataPage.spouseOcupationField(), personalDataPage.spouseOcupationSelect(), 'KRYMKTSTAF');
  }
  personalDataPage.customerFamilyCardFileUpload().attachFile(testImage);
  personalDataPage.customerFamilyCardThumbnail().should('be.visible');
  personalDataPage.customerMotherMaidenNameField().type('Automation');
  selectBottomsheet(personalDataPage.numberOfDependencyChildField(), personalDataPage.numberOfDependencyChildSelect(), '1');
  selectBottomsheet(personalDataPage.numberOfDependencyOtherField(), personalDataPage.numberOfDependencyOtherSelect(), '0');
  commonObjects.nextButton().click();
});

Then('Surveyor Fill in Residence Address Data with Same Domicile is {string}', (bool) => {
  const isSameDomicile = JSON.parse(bool);
  residenceAddressPage.domicileCompleteAddressField().clear().type('silalas');
  residenceAddressPage.domicileAddressField().click();
  searchAddress('list', 'silalas');
  residenceAddressPage.domicileRtField().type('001');
  residenceAddressPage.domicileRwField().type('001');
  residenceAddressPage.domicilePhoneNumberField().should('not.have.value', '');
  residenceAddressPage.domicilePinpointLocationField().find('button').click();
  searchAddress('pinpoint', 'silalas');
  if (testData.riskType === 'medium_risk') {
    selectBottomsheet(residenceAddressPage.blacklistedAdressField(), residenceAddressPage.blacklistedAdressSelect(), 'NO');
  }
  residenceAddressPage.domicileHouseFileUpload().attachFile(testImage);
  residenceAddressPage.domicileHouseThumbnailImage().should('be.visible');
  if (!isSameDomicile) {
    residenceAddressPage.legalCompleteAddressField().clear().type('silalas');
    residenceAddressPage.legalAddressField().click();
    searchAddress('list', 'silalas');
    residenceAddressPage.legalRtField().type('001');
    residenceAddressPage.legalRwField().type('001');
    residenceAddressPage.legalPhoneNumberField().should('not.have.value', '');
    residenceAddressPage.legalPinpointLocationField().find('button').click();
    searchAddress('pinpoint', 'silalas');
  } else {
    residenceAddressPage.sameWithDomicileSwitch().click();
  }
  selectBottomsheet(residenceAddressPage.houseOwnershipField(), residenceAddressPage.houseOwnershipSelect(), 'SD');
  cy.intercept('*/v1/master/general/group?groupName=HOUSE_OWNERSHIP_EVIDENCE').as('houseEvidence');
  residenceAddressPage.houseOwnershipEvidenceField().click();
  cy.wait('@houseEvidence');
  selectBottomsheet(residenceAddressPage.documentTypeField(), residenceAddressPage.documentTypeSelect(), '73');
  residenceAddressPage.houseOwnershipEvidenceFileUpload().attachFile(testImage);
  residenceAddressPage.houseOwnershipEvidenceThumbnailImage().should('be.visible');
  commonObjects.evidenceSaveButton().click();
  commonObjects.confrimationYesButton().click();
  residenceAddressPage.houseOwnershipNameField().type('Automation');
  commonObjects.nextButton().click();
});

Then('Surveyor Fill in Job Details Form', () => {
  cy.intercept('*/v1/general?parent_code=ECONOMY_SECTOR').as('masterData');
  cy.wait('@masterData');
  selectBottomsheet(jobDetailsPage.economySectorField(), jobDetailsPage.economySectorSelect(), '09');
  selectBottomsheet(jobDetailsPage.industryTypeField(), jobDetailsPage.industryTypeSelect(), '452120-1');
  if (testData.riskType === 'medium_risk') {
    selectBottomsheet(jobDetailsPage.occupationTypeField(), jobDetailsPage.occupationTypeSelect(), 'M');
  }
  selectBottomsheet(jobDetailsPage.occupationField(), jobDetailsPage.occupationSelect(), 'KRYENGSTAF');
  jobDetailsPage.companyNameField().type('BFI');
  jobDetailsPage.companyAddressField().click();
  searchAddress('list', 'silalas');
  jobDetailsPage.companyCompleteAddressField().type('silalas');
  jobDetailsPage.companyPhoneNumberField().type('82231118989');
  cy.intercept('*/v1/master/general/group?groupName=PROOF_OF_INCOME').as('proofIncome');
  jobDetailsPage.proofOfIncomeField().click();
  cy.wait('@proofIncome');
  selectBottomsheet(jobDetailsPage.documentTypeField(), jobDetailsPage.documentTypeSelect(), '79');
  jobDetailsPage.proofOfIncomeFileUpload().attachFile(testImage);
  jobDetailsPage.proofOfIncomeThumbnailImage().should('be.visible');
  commonObjects.evidenceSaveButton().click();
  commonObjects.confrimationYesButton().click();
  jobDetailsPage.businessFileUpload().attachFile(testImage);
  jobDetailsPage.businessThumbnailImage().should('be.visible');
  commonObjects.nextButton().click();
});

Then('Surveyor Fill in Emergency Contact Form', () => {
  emergencyContactPage.emergencyContactNameField().type('Automation');
  selectBottomsheet(
    emergencyContactPage.emergencyContactRelationshipField(),
    emergencyContactPage.emergencyContactRelationshipSelect(),
    'FM'
  );
  emergencyContactPage.emergencyContactPhoneNumberField().type('82231118989');
  emergencyContactPage.emergencyContactAddressField().click();
  searchAddress('list', 'silalas');
  emergencyContactPage.emergencyContactRtField().type('001');
  emergencyContactPage.emergencyContactRwField().type('001');
  emergencyContactPage.emergencyContactCompleteAddressField().type('silalas');
  commonObjects.nextButton().click();
  if (testData.riskType === 'low_risk') {
    cy.intercept(`${baseApiURL}/v2/surveyor-assignment-asset-validation/fetch-score/*`).as('scoringResult');
  } else {
    cy.intercept(`${baseApiURL}/v2/surveyor-assignment-simple-survey/fetch-score/*`).as('scoringResult');
  }
});

Then('Surveyor Fill in Asset Verification Form', () => {
  cy.wait('@scoringResult').then(({ response }) => {
    let passAssets;
    if (testData.riskType === 'low_risk') {
      passAssets = response.body.surveyor_assignment_asset_validation_scoring_response.filter(
        (asset) => asset.asset_validation_decision === 'PASS'
      );
    } else {
      passAssets = response.body.applications.filter((asset) => asset.status === 'PASS');
    }

    const passedAssetLength = passAssets.length;
    assetVerificationPage.assetListCard().should('have.length', passedAssetLength);
    for (let i = 0; i < passedAssetLength; i++) {
      assetVerificationPage.assetItemStatusNotDone(i + 1).click();
      assetVerificationPage.VehicleColorField().type('Hitam');
      selectBottomsheet(assetVerificationPage.VehicleOwnershipField(), assetVerificationPage.VehicleOwnershipSelect(), 'ME');
      assetVerificationPage.VehicleRegistrationName().type('Automation');
      assetVerificationPage.frontVehicleFileUpload().attachFile(testImage);
      assetVerificationPage.rearVehicleFileUpload().attachFile(testImage);
      assetVerificationPage.dashboardVehicleFileUpload().attachFile(testImage);
      assetVerificationPage.vehicleRegistrationFileUpload().attachFile(testImage);
      assetVerificationPage.vehicleChasisNumberFileUpload().attachFile(testImage);
      assetVerificationPage.vehicleEngineNumberFileUpload().attachFile(testImage);
      assetVerificationPage.rearVehicleThumbnailImage().should('be.visible');
      assetVerificationPage.frontVehicleThumbnailImage().should('be.visible');
      assetVerificationPage.dashboardVehicleThumbnailImage().should('be.visible');
      assetVerificationPage.vehicleRegistrationThumbnailImage().should('be.visible');
      assetVerificationPage.vehicleChasisNumberThumbnailImage().should('be.visible');
      assetVerificationPage.vehicleEngineNumberThumbnailImage().should('be.visible');
      assetVerificationPage.taxDateField().click();
      commonObjects.datePickerDayButton(todayDate).click();
      selectBottomsheet(assetVerificationPage.assetUsageField(), assetVerificationPage.assetUsageSelect(), 'COMMERCIAL');
      assetVerificationPage.vehicleOwnershipDocumentFileUpload().eq(0).attachFile(testImage);
      assetVerificationPage.vehicleOwnershipDocumentThumbnailImage().eq(0).should('be.visible');
      assetVerificationPage.vehicleOwnershipDocumentFileUpload().eq(1).attachFile(testImage);
      assetVerificationPage.vehicleOwnershipDocumentThumbnailImage().eq(1).should('be.visible');
      assetVerificationPage.vehicleOwnershipDocumentFileUpload().eq(2).attachFile(testImage);
      assetVerificationPage.vehicleOwnershipDocumentThumbnailImage().eq(2).should('be.visible');
      assetVerificationPage.vehicleOwnershipDocumentFileUpload().eq(3).attachFile(testImage);
      assetVerificationPage.vehicleOwnershipDocumentThumbnailImage().eq(3).should('be.visible');
      assetVerificationPage.waiverLetterFileUpload().attachFile(testImage);
      assetVerificationPage.waiverLetterImageThumbnail().should('be.visible');
      assetVerificationPage.vehicleOwnershipIdentityCardFileUpload().attachFile(testImage);
      assetVerificationPage.vehicleOwnershipIdentityCardThumbnailImage().should('be.visible');
      assetVerificationPage.additionalVehicleRegistraionFileUpload().attachFile(testImage);
      assetVerificationPage.additionalVehicleRegistraionThumbnailImage().should('be.visible');
      assetVerificationPage.vehicleOwnershipBlankRecieptFileUpload().attachFile(testImage);
      assetVerificationPage.vehicleOwnershipBlankRecieptImageThumbnail().should('be.visible');
      selectBottomsheet(assetVerificationPage.procumentTypeField(), assetVerificationPage.procumentTypeSelect(), '3');
      commonObjects.nextButton().click();
      assetVerificationPage.assetItemStatusDone(i + 1).should('be.visible');
    }
    commonObjects.nextButton().click();
  });
});

Then('Surveyor Fill in Document Signing Form', () => {
  documentSigningPage.checklist2BlankReceiptByCust().click();
  documentSigningPage.blankReceiptByOwnerChecklist().click();
  documentSigningPage.blankPaymentReceiptChecklist().click();
  documentSigningPage.allAgreementDocChceklist().click();
  documentSigningPage.loanContractAgreementChecklist().click();
  documentSigningPage.fppDocumentChecklist().click();
  documentSigningPage.fppDocumentFileUpload().attachFile(testImage);
  documentSigningPage.fppDocumentImageThumb().should('be.visible');
  documentSigningPage.customerSignDocumentFileUpload().attachFile(testImage);
  documentSigningPage.customerSignDocumentThumb().should('be.visible');
  documentSigningPage.surveyorNotesField().type('GOOD');
  commonObjects.nextButton().should('be.enabled').click();
});

Then('Surveyor Click Kembali Keberanda Button', () => {
  documentSigningPage.tutupButton().click();
  documentSigningPage.bottomsheet().should('not.exist');
  documentSigningPage.kembaliKeBerandaButton().click();
});
