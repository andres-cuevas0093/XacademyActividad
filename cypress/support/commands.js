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

Cypress.Commands.add('Form', (Name,Email,Phone,Subject) => { 
    cy.get('input[placeholder="Name"]').type(Name)
        cy.get('input[placeholder="Email"]').type(Email)
        cy.get('input[placeholder="Phone"]').type(Phone)
        cy.get('input[placeholder="Subject"]').type(Subject)
})

Cypress.Commands.add('Reserva', (Name, Lastname, Email,Phone,) => { 

        cy.get('[class="col-sm-4"]')
        cy.get('[placeholder="Firstname"]').type(Name)
        cy.get('[placeholder="Lastname"]').type(Lastname)
        cy.get('[class="form-control room-email"]').type(Email)
        cy.get('[class="form-control room-phone"]').type(Phone)
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