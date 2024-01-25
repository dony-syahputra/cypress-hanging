export default class LoginPage {
  static usernameField() {
    return cy.get('#username');
  }
  static passwordFiled() {
    return cy.get('#password');
  }
  static loginButton() {
    return cy.get('#kc-login');
  }
}
