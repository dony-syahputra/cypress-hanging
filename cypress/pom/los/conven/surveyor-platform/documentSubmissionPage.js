export default class DocumentSubmissionPage {
  static searchField() {
    return cy.get('input[name="searchField"]');
  }

  static searchButton() {
    return cy.get('span[class="searchInputIcon"]');
  }

  static assignmentCard() {
    return cy.get('li[role="presentation"]');
  }

  static spouseSignFileUpload() {
    return cy.get('[name="debtor_spouse_document_sign_photos"]');
  }

  static processingBranchSelect() {
    return cy.get('select[name="document_submission_branch_id"]');
  }

  static documentAssetChecklist() {
    if (Cypress.env('los').conven['useNewDocumentSubmission']) {
      return cy.get('[data-testid="checkDocumentAsset"]');
    }
    return cy.get('label[for="document_asset"]');
  }

  static documentAgreementChecklist() {
    if (Cypress.env('los').conven['useNewDocumentSubmission']) {
      return cy.get('[data-testid="checkDocumentAgreement"]');
    }
    return cy.get('label[for="document_agreement"]');
  }

  static surveyorNoteTextarea() {
    if (Cypress.env('los').conven['useNewDocumentSubmission']) {
      return cy.get('#document_submission_notes');
    }
    return cy.get('#documentSubmissionNotes');
  }

  static nextButton() {
    return cy.get('[data-testid="nextSubmissionFormBtn"]');
  }

  static submitButton() {
    if (Cypress.env('los').conven['useNewDocumentSubmission']) {
      return cy.get('[data-testid="submitBtn"]');
    }
    return cy.get('button').contains(new RegExp('Submit'));
  }

  static selesaiButton() {
    return cy.get('button').contains(new RegExp('Selesai'));
  }

  static backButton() {
    return cy.get('.backToIcon');
  }
}
