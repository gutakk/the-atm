describe('Login page', () => {
  context('given valid PIN code', () => {
    it('redirects to ATM page', () => {
      cy.intercept('POST', '**/api/pin', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            "currentBalance": 220
          }
        });
      });

      cy.visit('/');
      cy.findByTestId('pinInput').type('1111');

      cy.url().should('include', '/atm');
    });
  });

  context('given invalid PIN code', () => {
    it('does not redirect and display error', () => {
      cy.intercept('POST', '**/api/pin', (req) => {
        req.reply({
          statusCode: 403,
          body: {
            "error": "Incorrect or missing PIN."
          }
        });
      });

      cy.visit('/');
      cy.findByTestId('pinInput').type('1112');

      cy.url().should('include', '/');
      cy.findByTestId('alert').should('be.visible');
      cy.findByTestId('alert').contains('Invalid PIN');
    });
  });
});
