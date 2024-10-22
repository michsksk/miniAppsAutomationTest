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
Cypress.Commands.add('starBeforeContentCheck', (num,text)=>{
    cy.get('.star-'+num).click();
        cy.get('[src="emojis/emoji-'+num+'.png"]').should('be.visible');
        cy.get('.text').then($els => {
            const win = $els[0].ownerDocument.defaultView;
            const before = win.getComputedStyle($els[0], 'before');
            const contentValue = before.getPropertyValue('content');
            expect(contentValue).to.eq(text);
        });
})

Cypress.Commands.add("addAndFillBudgetData",($date,$description,$type,$amount)=>{
        cy.get('.btn').click();
        cy.get('.entries').children().last().children().as('LastRowChildrens');
        cy.get('@LastRowChildrens').find('[type="date"]').type($date);
        cy.get('@LastRowChildrens').find('[placeholder="Add a Description (e.g. wages, bills, etc.)"]').type($description)
        cy.get('@LastRowChildrens').find('select').select($type);
        cy.get('@LastRowChildrens').find('[type="number"]').clear().type($amount+'{enter}');
})

Cypress.Commands.add("openRightClickMenuThenClickOnOptionAndAssert",($option,$secondaryOption)=>{
    cy.get('body').rightclick('left');
    cy.get('.menu-content').should('be.visible');
    if($option=="Share"){
        //cy.get('.menu-content').contains($option).trigger('mousemove');
        //cy.get('.share-menu').should('be.visible');
        cy.get('.menu-content').contains($secondaryOption).click({force:true});
        cy.get('#msg').should('have.text','Menu item '+$secondaryOption+' clicked');
    }else{
        cy.get('.menu-content').contains($option).click();
        cy.get('#msg').should('have.text','Menu item '+$option+' clicked');
    }
})
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