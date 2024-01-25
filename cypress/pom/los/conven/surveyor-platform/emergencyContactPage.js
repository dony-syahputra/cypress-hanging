export default class EmergencyContactPage {
  static emergencyContactNameField() {
    return cy.get('[data-testid="inputName"]').find('input');
  }

  static emergencyContactRelationshipField() {
    return cy.get('[data-testid="selectCustomerRelationshipCode"]');
  }

  static emergencyContactRelationshipSelect() {
    return cy.get('[data-testid="selectOptionCustomerRelationshipCode"]');
  }

  static emergencyContactPhoneNumberField() {
    return cy.get('[data-testid="inputPhoneNumbers0"]').find('input');
  }

  static emergencyContactAddressField() {
    return cy.get('[data-testid="inputEmergencyAddress"]');
  }

  static emergencyContactRtField() {
    return cy.get('[data-testid="inputRt"]').find('input');
  }

  static emergencyContactRwField() {
    return cy.get('[data-testid="inputRw"]').find('input');
  }

  static emergencyContactCompleteAddressField() {
    return cy.get('[data-testid="inputAddress"]').find('textarea');
  }

  static addNewEmergencyContactButton() {
    return cy.get('[data-testid="addNewEmergencyContactButton"]');
  }
}
