describe('ATM page', () => {
  const currentBalance = 220;

  context('given redirect from login page', () => {
    it('displays correct current balance', () => {
      cy.intercept('POST', '**/api/pin', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            "currentBalance": currentBalance
          }
        });
      });

      cy.visit('/');
      cy.findByTestId('pinInput').type('1111');

      cy.findByTestId('currentBalance').contains(currentBalance);
    });
  });

  context('given withdraw amount does not exceeds balance', () => {
    it('display withdraw success modal with bank notes and update current balance', () => {
      const withdrawAmount = 50;

      cy.intercept('POST', '**/api/pin', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            "currentBalance": currentBalance
          }
        });
      });

      cy.visit('/');
      cy.findByTestId('pinInput').type('1111');
      cy.findByTestId('withdrawInput').type(withdrawAmount.toString());
      cy.findByTestId('withdrawButton').click();

      cy.findByTestId('modal').should('be.visible');
      cy.findByTestId('modal').contains(`Withdraw £${withdrawAmount} successfully`);
      cy.findByTestId('modal').contains(`£20x1, £10x2, £5x2`);

      cy.findByTestId('modalCloseButton').click();

      cy.findByTestId('currentBalance').contains(currentBalance - withdrawAmount);
    });
  });

  context('given withdraw amount exceeds balance', () => {
    it('display warning modal', () => {
      const withdrawAmount = 900;

      cy.intercept('POST', '**/api/pin', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            "currentBalance": currentBalance
          }
        });
      });

      cy.visit('/');
      cy.findByTestId('pinInput').type('1111');
      cy.findByTestId('withdrawInput').type(withdrawAmount.toString());
      cy.findByTestId('withdrawButton').click();

      cy.findByTestId('alert').should('be.visible');
      cy.findByTestId('alert').contains('Withdraw amount exceeds balance and overdraft');
    });
  });
});
