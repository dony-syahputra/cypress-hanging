export default class HomePage {
  static userInfoCard() {
    return cy.get('[data-testid="cardUserInfo"]');
  }
  static myAssignmentCard() {
    return cy.get('a[href*="/assignment"]');
  }
  static cancelapprovalCard() {
    return cy.get('a[href*="/cancel-assignment"]');
  }
  static reassignApprovalCard() {
    return cy.get('a[href*="/reassign-assignment"]');
  }
  static takeApprovalCard() {
    return cy.get('a[href*="/take-assignment"]');
  }
  static bcpAprovalCard() {
    return cy.get('a[href*="/bcp-assignment"]');
  }
  static teamAssignmentCard() {
    return cy.get('a[href*="/assignments"]');
  }
  static documentSubmissionCard() {
    return cy.get('a[href*="/application"]');
  }
  static assignmentHistoryCard() {
    return cy.get('a[href="/surveyor/history"]');
  }
  static searchTakeAssignmentCard() {
    return cy.get('a[href*="/search-take-assignment"]');
  }
  static historyRequestTakeCard() {
    return cy.get('a[href*="/history-request-take"]');
  }
  static performanceAssesmentCard() {
    return cy.get('a[href*="/performance-assessment"]');
  }
}
