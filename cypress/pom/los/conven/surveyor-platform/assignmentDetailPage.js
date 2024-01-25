export default class AssignmentDetailPage {
  static updateCallResultButton() {
    return cy.get('[data-testid="appointmentScheduleButton"]');
  }

  static callStatusField() {
    return cy.get('[data-testid="selectPhoneStatus"]');
  }

  static callStatusSelect() {
    return cy.get('[data-testid="selectOptionPhoneStatus"]');
  }

  static appointmentDateField() {
    return cy.get('[data-testid="inputSelectedDate"]');
  }

  static appointmentTimeField() {
    return cy.get('[data-testid="selectWaktu"]');
  }

  static appointmentTimeHour(time) {
    return cy.get(`[data-testid="H${time}"]`);
  }

  static appointmentTimeMinute(time) {
    return cy.get(`[data-testid="M${time}"]`);
  }

  static appointmentTimeSelect() {
    return cy.get('[data-testid="selectOptionWaktu"]');
  }

  static surveyorNotesTextarea() {
    return cy.get('[data-testid="input"]').find('textarea');
  }

  static updateButton() {
    return cy.get('button').contains('Update');
  }

  static arrowBackButton() {
    return cy.get('[class^="bfi-bsc-headerLeft-"]');
  }

  static mulaiSurveyButton() {
    return cy.get('[data-testid="startSurveyButton"]');
  }

  static logTaskButton() {
    return cy.xpath('//div[text() = "Log Task"]');
  }

  static logStatusChip(status) {
    return cy.xpath(`//div[text() = "${status}"]`);
  }
}
