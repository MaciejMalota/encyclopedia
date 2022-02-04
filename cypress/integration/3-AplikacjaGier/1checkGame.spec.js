it('should check game',{defaultCommandTimeout: 10000}, ()=>{
    cy.visit('http://localhost:8080/Encyclopedia')
 
    cy.get('a[id="btn2"]').first().click({force: true})
    })