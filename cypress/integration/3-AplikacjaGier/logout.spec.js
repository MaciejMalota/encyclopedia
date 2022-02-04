it('should log out user',{defaultCommandTimeout: 10000}, ()=>{
    cy.visit('http://localhost:8080/login')
    cy.get('input[name=username]').type('admin')
    cy.get('input[type="password" ]').type('admin')
    cy.get('button[name="loginBtn"]').click()
    cy.get('a[name="LogoutUser"]').click()
    })