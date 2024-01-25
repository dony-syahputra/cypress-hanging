export default class CommonObjects {
  static nextButton() {
    return cy.get('[data-testid="buttonNext"]');
  }

  static confrimationYesButton() {
    return cy.get('[data-testid="confirmationYes"]');
  }

  static datePickerDayButton(date) {
    if (parseInt(date) > 15) {
      return cy.get(`.react-datepicker__day--0${date}`).last();
    } else {
      return cy.get(`.react-datepicker__day--0${date}`).first();
    }
  }

  static updateButton() {
    return cy.xpath('//button[contains(text(),"Update")]');
  }

  static evidenceSaveButton() {
    return cy.get('button').contains(new RegExp('Simpan'));
  }
}
