export default class AssetVerificationPage {
  static assetListCard() {
    return cy.get('[data-testid^="assetListItem"][data-testid$="StatusNotDone"]');
  }

  static assetItemStatusNotDone(index) {
    return cy.get(`[data-testid="assetListItem${index}StatusNotDone"]`);
  }

  static assetItemStatusDone(index) {
    return cy.get(`[data-testid="assetListItem${index}StatusDone"]`);
  }

  static detailAssetField() {
    return cy.get('[data-testid="inputCustomerAssetDetails"]').find('textarea');
  }

  static VehicleColorField() {
    return cy.get('[data-testid="inputVehicleColor"]').find('input');
  }

  static VehicleLicenseNumberField() {
    return cy.get('[data-testid="inputLicenseNumber"]').find('input');
  }

  static VehicleOwnershipField() {
    return cy.get('[data-testid="selectVehicleOwnershipTypeCode"]');
  }

  static VehicleOwnershipSelect() {
    return cy.get('[data-testid="selectOptionVehicleOwnershipTypeCode"]');
  }

  static VehicleRegistrationName() {
    return cy.get('[data-testid="inputVehicleCustomerRegistrationName"]').find('input');
  }

  static rearVehicleFileUpload() {
    return cy.get('[data-testid="fileVehicleLeftSidePhoto"]').find('input');
  }

  static rearVehicleThumbnailImage() {
    return cy.get('img[alt="vehicle_left_side_photo"]');
  }

  static frontVehicleFileUpload() {
    return cy.get('[data-testid="fileVehicleRightSidePhoto"]').find('input');
  }

  static frontVehicleThumbnailImage() {
    return cy.get('img[alt="vehicle_right_side_photo"]');
  }

  static additionalVehicleOneFileUpload() {
    return cy.get('[data-testid="fileVehicleFrontSidePhoto"]').find('input');
  }

  static additionalVehicleOneThumbnailImage() {
    return cy.get('img[alt="vehicle_front_side_photo"]');
  }

  static additionalVehicleTwoFileUpload() {
    return cy.get('[data-testid="fileVehicleBackSidePhoto"]').find('input');
  }

  static additionalVehicleTwoThumbnailImage() {
    return cy.get('img[alt="vehicle_back_side_photo"]');
  }

  static dashboardVehicleFileUpload() {
    return cy.get('[data-testid="fileVehicleDashboardSidePhoto"]').find('input');
  }

  static dashboardVehicleThumbnailImage() {
    return cy.get('img[alt="vehicle_dashboard_side_photo"]');
  }

  static vehicleRegistrationFileUpload() {
    return cy.get('[data-testid="fileVehicleRegistrationPhoto"]').find('input');
  }

  static vehicleRegistrationThumbnailImage() {
    return cy.get('img[alt="vehicle_registration_photo"]');
  }

  static vehicleChasisNumberFileUpload() {
    return cy.get('[data-testid="fileVehicleChassisNumberPhoto"]').find('input');
  }

  static vehicleChasisNumberThumbnailImage() {
    return cy.get('img[alt="vehicle_chassis_number_photo"]');
  }

  static vehicleEngineNumberFileUpload() {
    return cy.get('[data-testid="fileVehicleEngineNumberPhoto"]').find('input');
  }

  static vehicleEngineNumberThumbnailImage() {
    return cy.get('img[alt="vehicle_engine_number_photo"]');
  }

  static taxDateField() {
    return cy.get('[data-testid="inputTaxDate"]');
  }

  static assetUsageField() {
    return cy.get('[data-testid="selectAssetUsage"]');
  }

  static assetUsageSelect() {
    return cy.get('[data-testid="selectOptionAssetUsage"]');
  }

  static vehicleOwnershipDocumentFileUpload() {
    return cy.get('[data-testid^="fileVehicleOwnerPhoto"]').find('input');
  }

  static vehicleOwnershipDocumentThumbnailImage() {
    return cy.get('img[alt^="vehicle_owner_photo"]');
  }

  static waiverLetterFileUpload() {
    return cy.get('[data-testid="fileWaiverLetter"]').find('input');
  }

  static waiverLetterImageThumbnail() {
    return cy.get('[data-testid="fileWaiverLetterPhotoThumb1"]');
  }

  static vehicleOwnershipIdentityCardFileUpload() {
    return cy.get('[data-testid="fileVehicleOwnershipIdentityCardPhoto"]').find('input');
  }

  static vehicleOwnershipIdentityCardThumbnailImage() {
    return cy.get('img[alt="vehicle_ownership_identity_card_photo"]');
  }

  static additionalVehicleRegistraionFileUpload() {
    return cy.get('[data-testid="fileAdditionalAssetRegistrationPhoto"]').find('input');
  }

  static additionalVehicleRegistraionThumbnailImage() {
    return cy.get('img[alt="additional_asset_registration_photo"]');
  }

  static vehicleOwnershipBlankRecieptFileUpload() {
    return cy.get('[data-testid="fileVehicleOwnershipBlankReceiptPhotos"]').find('input');
  }

  static vehicleOwnershipBlankRecieptImageThumbnail() {
    return cy.get('[data-testid="fileVehicleOwnershipBlankReceiptPhotosPhotoThumb1"]');
  }

  static procumentTypeField() {
    return cy.get('[data-testid="selectProcurementTypeCode"]');
  }

  static procumentTypeSelect() {
    return cy.get('[data-testid="selectOptionProcurementTypeCode"]');
  }
}
