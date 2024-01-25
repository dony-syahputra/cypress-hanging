export default class AssignmentHistoryPage {
  static searchField() {
    return cy.get('input[type="text"]');
  }

  static searchButton() {
    return cy.get('span[class="searchInputIcon"]');
  }

  static assignmentCard(id) {
    const assignmentId = id ? id : '';
    return cy.get(`[data-testid^="cardAssignment${assignmentId}"]`);
  }
}
