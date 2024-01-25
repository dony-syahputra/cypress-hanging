export default class DocumentSigningPage {
  static checklist2BlankReceiptByCust() {
    return cy.get('[data-testid="checkBlankReceiptByCustomer"]');
  }

  static blankReceiptByOwnerChecklist() {
    return cy.get('[data-testid="checkBlankReceiptByOwner"]');
  }

  static blankPaymentReceiptChecklist() {
    return cy.get('[data-testid="checkBlankPaymentReceipt"]');
  }

  static allAgreementDocChceklist() {
    return cy.get('[data-testid="checkAllAgreementRequest"]');
  }

  static loanContractAgreementChecklist() {
    return cy.get('[data-testid="checkLoanContractAgreement"]');
  }

  static fppDocumentChecklist() {
    return cy.get('[data-testid="checkFppSigned"]');
  }

  static fppDocumentFileUpload() {
    return cy.get('[data-testid="fileFppDocuments"]').find('input');
  }

  static fppDocumentImageThumb() {
    return cy.get('[data-testid="fileFppDocumentsPhotoThumb1"]');
  }

  static customerSpouseSignDocumentFileUpload() {
    return cy.get('[data-testid="fileDebtorSpouseDocumentSignPhotos"]').find('input').first();
  }

  static customerSignDocumentFileUpload() {
    return cy.get('[data-testid="fileCustomerSignDocument"], [data-testid="fileCustomerSignDocumentPhotos"]').find('input');
  }

  static customerSignDocumentThumb() {
    return cy.get('[data-testid="fileCustomerSignDocumentPhotoThumb1"], [data-testid="fileCustomerSignDocumentPhotosPhotoThumb1"]');
  }

  static surveyorNotesField() {
    return cy.get('[data-testid^="inputSurveyorNote"], [data-testid="inputCatatanSurveyor"]').find('textarea');
  }

  static customerSpouseSignDocumentThumb() {
    return cy.get('[data-testid="fileDebtorSpouseDocumentSignPhotosPhotoThumb1"]');
  }

  static customerBlankReceiptByOwnerDocumentsPhotoUpload() {
    return cy.get('[data-testid="fileBlankReceiptByOwnerDocuments"]').find('input');
  }

  static customerBlankReceiptByOwnerDocumentsPhotoThumb() {
    return cy.get('[data-testid="fileBlankReceiptByOwnerDocumentsPhotoThumb1"]');
  }

  static customerDebtorSpouseDocumentSignPhotosUpload() {
    return cy.get('[data-testid="fileDebtorSpouseDocumentSignPhotos"]').find('input');
  }

  static customerDebtorSpouseDocumentSignPhotosThumb() {
    return cy.get('[data-testid="fileDebtorSpouseDocumentSignPhotosPhotoThumb1"]');
  }

  static financePurpose() {
    return cy.get('[data-testid="selectFinancePurpose"]');
  }

  static financePurposeSelection() {
    return cy.get('select[name="finance_purpose"]');
  }

  static kembaliKeBerandaButton() {
    return cy.xpath('(//button[text()="Kembali ke Beranda"])');
  }

  static tutupButton() {
    return cy.get('[data-testid="buttonYes"]');
  }

  static bottomsheet() {
    return cy.get('div[aria-modal="true"]');
  }
}
