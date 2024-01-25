export default class SimpleSurveyPage {
  static houseOwnershipField() {
    return cy.get('[data-testid="selectHouseOwnershipStatusCode"]');
  }

  static houseOwnershipSelect() {
    return cy.get('[data-testid="selectOptionHouseOwnershipStatusCode"]');
  }

  static customerMonthlyInstallmentField() {
    return cy.get('[data-testid="inputCustomerMonthlyInstallment"]').find('input');
  }

  static repaymentDelayField() {
    return cy.get('[data-testid="selectReasonForRepaymentDelayCode"]');
  }

  static repaymentDelaySelect() {
    return cy.get('[data-testid="selectOptionReasonForRepaymentDelayCode"]');
  }

  static montlyIncomeField() {
    return cy.get('[data-testid="inputCustomerMonthlyIncome"]').find('input');
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

  static proofOfIncomeFileUpload() {
    return cy.get('[data-testid="fileProofOfIncomes"]').find('input');
  }

  static proofOfIncomeThumbnailImage() {
    return cy.get('[data-testid="fileProofOfIncomesPhotoThumb1"]');
  }
}
