// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';

//This xpath implementaion is still very basic, may not work on all scenario
Cypress.Commands.add(
  'xpath',
  { prevSubject: false },
  (xpath, resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE, timeout = 4000, interval = 1000) => {
    const evaluateXPath = (win, xpath) => {
      const document = win.document;
      const result = document.evaluate(xpath, document, null, resultType, null);
      let elements = [];

      switch (result.resultType) {
        case XPathResult.FIRST_ORDERED_NODE_TYPE:
          var singleNode = result.singleNodeValue;
          if (singleNode) {
            elements.push(singleNode);
          }
          break;

        case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
          var node = result.iterateNext();
          while (node) {
            elements.push(node);
            node = result.iterateNext();
          }
          break;

        default:
          throw new Error(`Unsupported XPathResult type: ${result.resultType}`);
      }

      if (elements.length === 0) {
        throw new Error(`No elements found with XPath: ${xpath}`);
      }
      const elementResult = elements.length === 1 ? elements[0] : elements;
      return cy.wrap(elementResult);
    };

    const retryUntilTimeout = (retryCount) => {
      return cy.window().then((win) => {
        try {
          return evaluateXPath(win, xpath);
        } catch (error) {
          if (retryCount <= timeout / interval) {
            return cy.wait(interval).then(() => retryUntilTimeout(retryCount + 1)); //eslint-disable-line
          } else {
            throw error;
          }
        }
      });
    };

    return retryUntilTimeout(0);
  }
);

// add command for onload event to wait iframe rendering
Cypress.Commands.add('iframeOnload', { prevSubject: 'element' }, ($iframe) => {
  return new Cypress.Promise((resolve) => {
    $iframe.on('load', () => {
      resolve($iframe.contents().find('body'));
    });
  });
});
Cypress.Commands.add('setVariable', (key, value) => {
  Cypress.env[key] = value;
});

Cypress.Commands.add('getVariable', (key) => {
  return Cypress.env[key];
});
