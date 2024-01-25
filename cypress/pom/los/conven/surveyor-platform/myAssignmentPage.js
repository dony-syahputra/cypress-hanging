export default class MyAssignmentPage {
  static searchField() {
    return cy.get('[data-testid="inputSearchAssignment"]');
  }
  static searchButton() {
    return cy.get('.searchInputIcon');
  }
  static sortAssignmentButton() {
    return cy.get('[data-testid="buttonSortAssignment"]');
  }
  static filterAssignmentButton() {
    return cy.get('[data-testid="buttonFilterAssignment"]');
  }
  static assignmentCard(id) {
    const assignmentId = id ? id : '';
    return cy.get(`[data-testid^="cardAssignment${assignmentId}"]`);
  }
}
