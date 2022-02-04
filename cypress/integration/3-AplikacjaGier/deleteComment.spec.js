it('should delete comment',{defaultCommandTimeout: 10000}, ()=>{
    cy.visit('http://localhost:8080/login')
    cy.get('input[name=username]').type('admin')
    cy.get('input[type="password" ]').type('admin')
    cy.get('button[name="loginBtn"]').click()
    cy.get('a[name="encyclopedia"]').click()
    cy.get('a[id="btn2"]').first().click({force: true})
    
    cy.get('button[name="btnDeleteComment"]').first().click({force: true})
    })