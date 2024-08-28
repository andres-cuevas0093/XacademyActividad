describe('Enviar mensaje', () =>{

    beforeEach('ingreso a la pagina', () => {
        cy.visit('https://automationintesting.online/')
    })

   it('validar la informacion del hotel sea la correcta', () => {
     cy.get('[class="col-sm-5"] > p').then(mensajes => {
        cy.wrap(mensajes).each(messageList => {
            const messageText = messageList.text()
            cy.wrap(mensajes).should('contain', messageText)

        })
     })
    })

    it.only('Validar envío de form vacío', () => {
        cy.get('#submitContact').click()
        cy.get('.alert').should('be.visible')
        cy.get('[class="alert alert-danger"] > p').each(alertMessage => {
            const alert = alertMessage.text()
            cy.wrap(alertMessage).should('contain', alert)
            
        })
        
    })

    it('Validar que las imagenes en la pagina sean visibles', () => {
        cy.log('Imagenes')
        cy.get('div > .container-fluid ')
        cy.get('.hotel-logoUrl').should('be.visible')
        cy.get('.img-responsive').should('be.visible')
    })

    it(' Validar que el texto de la descripción del hotel sea el esperado.', () => {
        cy.log('Descripcion del hotel')
        cy.wait(1000)
        cy.get('[class="row hotel-description"]').find('.col-sm-10').then(texto => {
            const textDescription = texto.text()
            cy.wrap(texto).should('contain',textDescription)
        })
    })

    it('Validar envío de form con data incorrecta',()=>{
        cy.log('Set de datos incorrectos...')
        cy.Form('Andres','123','351351','asdasd')
        cy.get('[data-testid="ContactDescription"]').type('asdasd')
        cy.get('#submitContact').click()
        cy.get('.alert').should('be.visible')
        cy.get('[class="alert alert-danger"]').find('p').each((errorMessage) => {
            const text = errorMessage.text()
        })
            
    })

    it('Validar envío de form con data correcta',()=>{
        cy.log('Set de datos correctos...')
        cy.Form('Andres','adres@andres','+543517733343','Todo listo')
        cy.get('[data-testid="ContactDescription"]').type('loremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestlo') 
        cy.get('#submitContact').click()
        cy.wait(1000)
        cy.get('[class="col-sm-5"]').find('div h2').should('contain', 'Thanks for getting in touch ')

    })

})

describe('Interaccion con API', () => {

    beforeEach('ingreso a la pagina', () => {
        cy.visit('https://automationintesting.online/')
    })
    
    it('Envio de mensaje exitoso', () => {
        cy.intercept('POST','https://automationintesting.online/message/' ).as('mensaje')
        cy.get('[class="col-sm-5"]').then(completarFormulario => {
            cy.wrap(completarFormulario).Form('Andres','test@test', '+54351232323', 'Reserva')
            cy.get('[data-testid="ContactDescription"]').type('loremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestlo')  
        })
        cy.get('#submitContact').click()
        cy.wait(1000) 
        cy.wait('@mensaje').then(interception => {
            expect(interception.response.statusCode).to.equal(201)
            cy.log('Felicidades has enviado el mensaje')
        }) 
    })


    it('Reserva erronea', () => {
        cy.intercept('POST','https://automationintesting.online/booking/').as('error')
        cy.contains('Book this room').click()
        cy.get('[class="col-sm-4"]').then(valores => {
            cy.wrap(valores).Reserva('Andres', 'Cuevas', 'test@test','+54351232323' )
        })
        cy.get('button').contains('Book').click()
        cy.wait(1000)
        cy.wait('@error').then(interception => {
            expect(interception.response.statusCode).to.equal(400)
            cy.log('error')
        })

    })
})