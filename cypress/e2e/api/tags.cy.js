describe('Modificacion de Tags' , () => {
    it('Fist test', () => {
        cy.intercept('GET','https://conduit-api.bondaracademy.com/api/tags', {fixture: 'tags.json'})
        cy.visit('https://conduit.bondaracademy.com/')
    })
})