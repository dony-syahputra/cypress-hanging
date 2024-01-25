export default class AssetValidationPage {
  static assetItemListCard() {
    return cy.get('[data-testid^="assetListItem"][data-testid$="StatusNotDone"]');
  }

  static assetItemNotDoneCard(index) {
    return cy.get(`[data-testid="assetListItem${index}StatusNotDone"]`);
  }

  static detailAssetField() {
    return cy.get('[data-testid="inputCustomerAssetDetails"]').find('textarea');
  }

  static licenseNumberField() {
    return cy.get('[data-testid="inputLicenseNumber"]').find('input');
  }

  static licenseNumberEditButton() {
    return cy.get('[data-testid="inputLicenseNumberRightButton"]');
  }

  static editLicenseNumberField() {
    return cy.get('[data-testid="inputNewLicenseNumber"], [data-testid="inputLicenseNumber"]').find('input');
  }

  static editLicenseUpdateButton() {
    return cy.get('[data-testid="buttonUpdate"], .ReactModal__Content button[class^="bfi-bsc-primary"]').find('input');
  }

  static unitAtWorkshopField() {
    return cy.get('[data-testid="selectAtWorkshop"]');
  }

  static unitAtWorkshopSelect() {
    return cy.get('[data-testid="selectOptionAtWorkshop"]');
  }

  static unitOnCustomerPossessionField() {
    return cy.get('[data-testid="selectUnitCustomerPossession"]');
  }

  static unitOnCustomerPossessionSelect() {
    return cy.get('[data-testid="selectOptionUnitCustomerPossession"]');
  }

  static unitInteriorConditionField() {
    return cy.get('[data-testid="selectUnitInteriorCondition"]');
  }

  static unitInteriorConditionSelect() {
    return cy.get('[data-testid="selectOptionUnitInteriorCondition"]');
  }

  static unitDentCoditionField() {
    return cy.get('[data-testid="selectVehicleDentCondition"]');
  }

  static unitDentCoditionSelect() {
    return cy.get('[data-testid="selectOptionVehicleDentCondition"]');
  }

  static unitAbleTurnOnField() {
    return cy.get('[data-testid="selectUnitAbleTurnOn"]');
  }

  static unitAbleTurnOnSelect() {
    return cy.get('[data-testid="selectOptionUnitAbleTurnOn"]');
  }

  static assetEngineAndChassisNumberField() {
    return cy.get('[data-testid="selectVehicleEngineAndChassisNumberWithDocumentAppropriate"]');
  }

  static assetEngineAndChassisNumberSelect() {
    return cy.get('[data-testid="selectOptionVehicleEngineAndChassisNumberWithDocumentAppropriate"]');
  }

  static assetLoanValueField() {
    return cy.get('[data-testid="inputNtfAmount"]').find('input');
  }

  static ltvAmountField() {
    return cy.get('[data-testid="inputLtv"]').find('input');
  }

  static taxDateField() {
    return cy.get('[data-testid="inputTaxDate"]');
  }

  static taxBasedPaymentField() {
    return cy.get('[data-testid="inputTaxBaseNominalPerYear"]').find('input');
  }

  static taxNoticesFileUpload() {
    return cy.get('[data-testid="fileTaxNotices"]').find('input').first();
  }

  static taxNoticesThumbnailImage() {
    return cy.get('[data-testid="fileTaxNoticesPhotoThumb1"]');
  }

  static takeOverSwitch() {
    return cy.get('[data-testid="switchTakeOver"]').find('.react-switch');
  }

  static takeOverFinanceCompanyField() {
    return cy.get('[data-testid="selectTakeOverFinanceCompanyId"]');
  }

  static takeOverFinanceCompanySelect() {
    return cy.get('[data-testid="selectOptionTakeOverFinanceCompanyId"]');
  }

  static takeOverContractNumberField() {
    return cy.get('[data-testid="inputTakeOverContractNumber"]').find('input');
  }

  static takeOverContractOnBehalfField() {
    return cy.get('[data-testid="selectTakeOverContractOnBehalf"]');
  }

  static takeOverContractOnBehalfSelect() {
    return cy.get('[data-testid="selectOptionTakeOverContractOnBehalf"]');
  }

  static takeOverContractNameField() {
    return cy.get('[data-testid="inputTakeOverContractName"]').find('input');
  }

  static takeOverInstallmentAmountField() {
    return cy.get('[data-testid="inputInstallmentAmount"]').find('input');
  }

  static takeOverCurrentPastDueDayField() {
    return cy.get('[data-testid="inputCurrentPastDueDay"]').find('input');
  }

  static takeOverOngoingInstallmentField() {
    return cy.get('[data-testid="inputTakeOverOngoingInstallment"]').find('input');
  }

  static takeOverPrepaymentField() {
    return cy.get('[data-testid="inputTakeOverPrepaymentValue"]').find('input');
  }

  static takeOverAmortizationFileUpload() {
    return cy.get('[data-testid="fileTakeOverAmortization"]').find('input').first();
  }

  static takeOverAmortizationThumbnailImage() {
    return cy.get('[data-testid="fileTakeOverAmortizationPhotoThumb1"]');
  }

  static takeOverRelationshipField() {
    return cy.get('[data-testid="selectTakeOverRelationshipCode"]');
  }

  static takeOverRelationshipSelect() {
    return cy.get('[data-testid="selectOptionTakeOverRelationshipCode"]');
  }

  static editLicenseLanjutkanButton() {
    return cy.get('button').contains(new RegExp('Lanjutkan'));
  }
}
