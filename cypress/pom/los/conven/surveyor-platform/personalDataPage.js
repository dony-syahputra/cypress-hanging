export default class PersonalDataPage {
  static customerNameField() {
    return cy.get('[data-testid="inputCustomerName"]').find('input');
  }

  static customerIndentityNumberField() {
    return cy.get('[data-testid="inputCustomerIdentityNumber"]').find('input');
  }

  static customerIndentityCardPhoto() {
    return cy.get('img[alt="customer_identity_card_photo"]');
  }

  static customerReligionField() {
    return cy.get('[data-testid="selectCustomerReligionCode"]');
  }

  static customerReligionSelect() {
    return cy.get('[data-testid="selectOptionCustomerReligionCode"]');
  }

  static customerNPWPTypeField() {
    return cy.get('[data-testid="selectCustomerNpwpCardType"]');
  }

  static customerNPWPTypeSelect() {
    return cy.get('[data-testid="selectOptionCustomerNpwpCardType"]');
  }

  static customerNPWPNumberField() {
    return cy.get('[data-testid="inputCustomerNpwpCardNumber"]').find('input');
  }

  static customerNPWPFileUpload() {
    return cy.get('[data-testid="fileCustomerNpwpCardPhoto"]').find('input');
  }

  static customerNPWPThumbImage() {
    return cy.get('img[alt="customer_npwp_card_photo"]');
  }

  static customerGenderField() {
    return cy.get('[data-testid="inputGender"]').find('input');
  }

  static customerMediumGenderSelect() {
    return cy.get('select[name="selectOptionCustomerGender"]');
  }

  static customerDOBField() {
    return cy.get('[data-testid="inputDateOfBirth"],[data-testid="inputCustomerDob"]').find('input');
  }

  static customerBirthPlaceField() {
    return cy.get('[data-testid="inputPlaceOfBirth"],[data-testid="inputCustomerPob"]').find('input');
  }

  static customerEducationField() {
    return cy.get('[data-testid="selectCustomerEducationCode"]');
  }

  static customerEducationSelect() {
    return cy.get('[data-testid="selectOptionCustomerEducationCode"]');
  }

  static customerMartialStatusField() {
    return cy.get('[data-testid="selectCustomerMaritalStatusCode"]');
  }

  static customerMartialStatusSelect() {
    return cy.get('[data-testid="selectOptionCustomerMaritalStatusCode"]');
  }

  static customerMarriageCertificateFileUpload() {
    return cy.get('[data-testid="fileCustomerMarriageCertificatePhotos"]').find('input');
  }

  static customerMarriageCertificateThumbnailImage() {
    return cy.get('[data-testid="fileCustomerMarriageCertificatePhotosPhotoThumb1"]');
  }

  static spouseNameField() {
    return cy.get('[data-testid="inputCustomerSpouseName"]').find('input');
  }

  static spouseKTPNumberField() {
    return cy.get('[data-testid="inputCustomerSpouseIdentityNumber"]').find('input');
  }

  static spouseKTPFileUpload() {
    return cy.get('[data-testid="fileCustomerSpouseIdentityCardPhoto"]').find('input');
  }

  static spouseKTPThumbnailImage() {
    return cy.get('img[alt="customer_spouse_identity_card_photo"]');
  }

  static spouseBirthPlaceField() {
    return cy.get('[data-testid="inputCustomerSpousePob"]').find('input');
  }

  static spouseDOBField() {
    return cy.get('[data-testid="inputCustomerSpouseDob"]').find('input');
  }

  static spousePhoneNumberField() {
    return cy.get('[data-testid="inputCustomerSpousePhoneNumber"]').find('input');
  }

  static spouseOcupationField() {
    return cy.get('[data-testid="selectCustomerSpouseOccupationCode"]');
  }

  static spouseOcupationSelect() {
    return cy.get('[data-testid="selectOptionCustomerSpouseOccupationCode"]');
  }

  static customerMotherMaidenNameField() {
    return cy.get('[data-testid="inputCustomerMotherMaidenName"]').find('input');
  }

  static customerFamilyCardFileUpload() {
    return cy.get('[data-testid="fileCustomerFamilyCardPhotos"]').find('input');
  }

  static customerFamilyCardThumbnail() {
    return cy.get('[data-testid="fileCustomerFamilyCardPhotosPhotoThumb1"]');
  }

  static numberOfDependencyChildField() {
    return cy.get('[data-testid="selectNoOfDependencyChild"]');
  }

  static numberOfDependencyChildSelect() {
    return cy.get('[data-testid="selectOptionNoOfDependencyChild"]');
  }

  static numberOfDependencyOtherField() {
    return cy.get('[data-testid="selectNoOfDependencyOther"]');
  }

  static numberOfDependencyOtherSelect() {
    return cy.get('[data-testid="selectOptionNoOfDependencyOther"]');
  }
}
