describe('Service Request Form', function () {
    beforeEach(function () {
        cy.visit('/');
        cy.contains('Add Service Request').click();
    });

    describe('Submit Form', () => {
        it('allows a user to submit a form', () => {
            cy.get('h2').should('contain', 'New Service Request');
            cy.get('#formBasicFirstName').type(
                'Ryan',
            );
            cy.get('#formBasicLastName').type(
                'Balla',
            );
            cy.get('#formBasicEmail').type(
                'ryan@ryanballa.com',
            );
            cy.get('#formBasicServiceDescription').type(
                'I have questions about my benefits',
            );
            cy.get('button.btn-primary').click();
            cy.get('button.btn-primary').should('be.disabled');
            cy.wait(400);
            cy.get('button.btn-primary').should('not.be.disabled');
            /* Becasue the server returns success and errors randomly
           we just test for a response. */
            cy.get('.response')
                .its('length')
                .should('eq', 1);
        });
        it('shows errors if submitted without all data entered', () => {
            cy.get('button.btn-primary').click();
            cy.get("input:invalid").should("have.length", 3);
        });
    });
});