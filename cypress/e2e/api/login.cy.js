describe('creacion de usuario', () =>{
    it('creacion de usuario ok', () => {
      
        cy.intercept('POST', '/api/users').as('userCreado')
        cy.visit('https://conduit.bondaracademy.com/')
        cy.contains('Sign up').click()
        const numeroRandom = Math.floor(1000 + Math.random () * 9000)
        cy.get('[placeholder="Username"]').type(`test${numeroRandom}`)
        cy.get('[placeholder="Email"]').type(`tes${numeroRandom}`)
        cy.get('[placeholder="Password"]').type('123')
        cy.get('.btn').click()
        cy.wait('@userCreado').then(interception => {
            expect(interception.response.statusCode).to.equal(201)
            cy.log('Felicidades lo has creado')
        })
        // cy.get('button').contains('Sign up').click()
       

    })
})