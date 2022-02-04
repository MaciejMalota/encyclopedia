it('should register user',{defaultCommandTimeout: 10000}, ()=>{
    cy.visit('http://localhost:8080/register')
    cy.get('input[id="username"]').type('testtesttttt',{force: true})
    cy.get('input[id="password" ]').type('admin')
    cy.get('input[id="confirm_password" ]').type('admin')
    cy.get('input[type="email" ]').type('adminnnm@op.pl')
    cy.get('input[id="ageAge" ]').type('15')
    cy.get('input[type="checkbox" ]').click()

    cy.get('button[name=createAcc]').click({force: true})
    
    })