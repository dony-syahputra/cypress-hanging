export default class CreditCheckingPage {
  static checkingSourceCard(index) {
    const cardIndex = index ? index : '';
    return cy.get(`[data-testid^="sourceItem${cardIndex}"]`);
  }

  static sourceField() {
    return cy.get('[data-testid="selectSource"]');
  }

  static sourceSelect() {
    return cy.get('[data-testid="selectOptionSource"]');
  }

  static picNameField() {
    return cy.get('[data-testid="inputPicName"]').find('input');
  }

  static phoneNumberField() {
    return cy.get('[data-testid="inputPhoneNumber"]').find('input');
  }

  static unitOwnershipField() {
    return cy.get('[data-testid="selectUnitOwnership"]');
  }

  static unitOwnershipSelect() {
    return cy.get('[data-testid="selectOptionUnitOwnership"]');
  }

  static unitOwnershipPeriodField() {
    return cy.get('[data-testid="selectUnitOwnershipPeriod"]');
  }

  static unitOwnershipPeriodSelect() {
    return cy.get('[data-testid="selectOptionUnitOwnershipPeriod"]');
  }

  static houseOwnershipValidityField() {
    return cy.get('[data-testid="selectHouseOwnershipValidity"]');
  }

  static houseOwnershipValiditySelect() {
    return cy.get('[data-testid="selectOptionHouseOwnershipValidity"]');
  }

  static businessValidityField() {
    return cy.get('[data-testid="selectBusinessValidity"]');
  }

  static businessValiditySelect() {
    return cy.get('[data-testid="selectOptionBusinessValidity"]');
  }

  static ocupationField() {
    return cy.get('[data-testid="selectOccupationCode"]');
  }

  static ocupationSelect() {
    return cy.get('[data-testid="selectOptionOccupationCode"]');
  }

  static negativeInfoField() {
    return cy.get('[data-testid="selectNegativeInformationCode"]');
  }

  static negativeInfoSelect() {
    return cy.get('[data-testid="selectOptionNegativeInformationCode"]');
  }

  static otherInformationField() {
    return cy.get('[data-testid="inputOtherInformation"]').find('input');
  }

  static interviewFileUpload() {
    return cy.get('[data-testid="fileInterviewEvidence"]').find('input').first();
  }

  static interviewThumbnailImage() {
    return cy.get('[data-testid="fileInterviewEvidencePhotoThumb1"]');
  }
}
