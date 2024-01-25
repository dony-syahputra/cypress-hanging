export default class JobDetailsPage {
  static economySectorField() {
    return cy.get('[data-testid="selectEconomySectorCode"]');
  }

  static economySectorSelect() {
    return cy.get('[data-testid="selectOptionEconomySectorCode"]');
  }

  static industryTypeField() {
    return cy.get('[data-testid="selectIndustryTypeCode"]');
  }

  static industryTypeSelect() {
    return cy.get('[data-testid="selectOptionIndustryTypeCode"]');
  }

  static occupationTypeField() {
    return cy.get('[data-testid="selectOccupationTypeCode"]');
  }

  static occupationTypeSelect() {
    return cy.get('[data-testid="selectOptionOccupationTypeCode"]');
  }

  static occupationField() {
    return cy.get('[data-testid="selectOccupationCode"]');
  }

  static occupationSelect() {
    return cy.get('[data-testid="selectOptionOccupationCode"]');
  }

  static companyNameField() {
    return cy.get('[data-testid="inputCompanyName"]').find('input');
  }

  static companyAddressField() {
    return cy.get('[data-testid="input"]');
  }

  static companyCompleteAddressField() {
    return cy.get('[data-testid="inputAddress"]').find('textarea');
  }

  static companyPhoneNumberField() {
    return cy.get('[data-testid="inputPhoneNumber"]').find('input');
  }

  static proofOfIncomeField() {
    return cy.get('span:contains("Not Done")').first();
  }

  static documentTypeField() {
    return cy.get('[data-testid="selectDocumentTypeId"]');
  }

  static documentTypeSelect() {
    return cy.get('[data-testid="selectOptionDocumentTypeId"]');
  }

  static proofOfIncomeFileUpload() {
    return cy.get('[data-testid="fileProofOfIncomes"]').find('input');
  }

  static proofOfIncomeThumbnailImage() {
    return cy.get('[data-testid="fileProofOfIncomesPhotoThumb1"]');
  }

  static businessFileUpload() {
    return cy.get('[data-testid="fileBusinessPhotos"]').find('input');
  }

  static businessThumbnailImage() {
    return cy.get('[data-testid="fileBusinessPhotosPhotoThumb1"]');
  }
}
