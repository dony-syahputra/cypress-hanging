export default class ResidenceAddressPage {
  static domicileCompleteAddressField() {
    return cy.get('[data-testid="inputCustomerDomicileAddress"]').find('textarea');
  }

  static domicileAddressField() {
    return cy.get('[data-testid="inputCustomerDomicile"]');
  }

  static domicileRtField() {
    return cy.get('[data-testid="inputCustomerDomicileRt"]').find('input');
  }

  static domicileRwField() {
    return cy.get('[data-testid="inputCustomerDomicileRw"]').find('input');
  }

  static domicilePhoneNumberField() {
    return cy.get('[data-testid="inputCustomerDomicilePhoneNumber"]').find('input');
  }

  static domicilePinpointLocationField() {
    return cy.get('[data-testid="inputCustomerDomicileLocation"]');
  }

  static blacklistedAdressField() {
    return cy.get('[data-testid="selectBlacklistedAddress"]');
  }

  static blacklistedAdressSelect() {
    return cy.get('[data-testid="selectOptionBlacklistedAddress"]');
  }

  static domicileHouseFileUpload() {
    return cy.get('[data-testid="fileCustomerHousePhotos"]').find('input');
  }

  static domicileHouseThumbnailImage() {
    return cy.get('[data-testid="fileCustomerHousePhotosPhotoThumb1"]');
  }

  static houseOwnershipField() {
    return cy.get('[data-testid="selectCustomerHouseOwnershipCode"]');
  }

  static houseOwnershipSelect() {
    return cy.get('[data-testid="selectOptionCustomerHouseOwnershipCode"]');
  }

  static houseOwnershipEvidenceField() {
    return cy.get('span:contains("Not Done")').first();
  }

  static documentTypeField() {
    return cy.get('[data-testid="selectDocumentTypeId"]');
  }

  static documentTypeSelect() {
    return cy.get('[data-testid="selectOptionDocumentTypeId"]');
  }

  static houseOwnershipEvidenceFileUpload() {
    return cy.get('[data-testid="fileCustomerHouseOwnershipEvidences"]').find('input');
  }

  static houseOwnershipEvidenceThumbnailImage() {
    return cy.get('[data-testid="fileCustomerHouseOwnershipEvidencesPhotoThumb1"]');
  }

  static houseOwnershipNameField() {
    return cy.get('[data-testid="inputCustomerHouseOwnershipLetterName"]').find('input');
  }

  static sameWithDomicileSwitch() {
    return cy.get('[data-testid="switchSameWithDomicile"]').find('.react-switch');
  }

  static legalCompleteAddressField() {
    return cy.get('[data-testid="inputCustomerLegalAddress"]').find('textarea');
  }

  static legalAddressField() {
    return cy.get('[data-testid="inputCustomerLegal"]');
  }

  static legalRtField() {
    return cy.get('[data-testid="inputCustomerLegalRt"]').find('input');
  }

  static legalRwField() {
    return cy.get('[data-testid="inputCustomerLegalRw"]').find('input');
  }

  static legalPhoneNumberField() {
    return cy.get('[data-testid="inputCustomerPhoneNumber"]').find('input');
  }

  static legalPinpointLocationField() {
    return cy.get('[data-testid="inputCustomerLegalHouseLocation"]');
  }
}
