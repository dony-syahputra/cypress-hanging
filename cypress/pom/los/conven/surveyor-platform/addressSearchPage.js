export default class AddressSearchPage {
  static searchField() {
    return cy.get('input[name="address"]');
  }

  static addressList() {
    return cy.get('.button-as-div > .MuiTypography-root');
  }

  static mapAddressSearchField() {
    return cy.get('[data-testid="inputAddressSearch"]');
  }

  static locationNameList() {
    return cy.get('.pac-item');
  }

  static locationPinpointImage() {
    return cy.get('img[src^="data:image/png;base64"]');
  }

  static confirmLocationButton() {
    return cy.get('[data-testid="buttonConfirmLocation"]');
  }
}
