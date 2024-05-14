describe('template spec', () => {
  beforeEach(() => {
   cy.viewport(1280, 920)
    cy.visit('http://localhost:5173')
    cy.get('#inputID').type('04');
    cy.wait(500);
    cy.get('.tn').click();
    cy.wait(500);
  })

  it('Should enter the Dashboard', () => {
    // Test scenario 1
    cy.get('#inputID').type('04');
    cy.wait(500);
    cy.get('.tn').click();
    cy.wait(500);
    
    cy.get('[data-testid="Dashboard-test"]').should('exist');
  })

  it('Should fail when ID is invalid', () => {
    // Test scenario 1
    cy.get('#inputID').type('220000001144');
    cy.wait(500);
    cy.get('.tn').click();
    cy.wait(500);
    
    cy.get('[data-testid="Dashboard-test"]').should('not.exist');
  })

  
  it('Should able to borrow and display it on the table', () => {
    // Test scenario 2
    cy.get('#inputID').type('04');
    cy.wait(500);
    cy.get('.tn').click();
    cy.wait(500);
    cy.get('[data-testid="Dashboard-test"]').should('exist')
    cy.get('.sidebuttons > :nth-child(2)').click();
    cy.wait(500)
    cy.get('.p-multiselect-trigger').click();
    cy.wait(500)
    cy.get('.itemlist').should('exist');
    cy.get('.p-multiselect-items > :nth-child(1)').should('exist').click();
    cy.wait(500);
    cy.get('.p-multiselect-trigger').click();
    cy.wait(500);
    cy.get('.p-inputnumber-button-up').click();
    cy.wait(500);
    cy.get('[data-testid="Borrow-test"]').click();
    cy.get('#inputID').type('02');
    cy.wait(500);
    cy.get('.p-button-label').click();
    cy.wait(500);
    cy.get(':nth-child(10) > :nth-child(3)').should('contain', '02'); 
    cy.get(':nth-child(10) > :nth-child(2)').should('contain', '3'); 
    cy.get(':nth-child(10) > :nth-child(5)').should('contain', 'Borrowing'); 
  })

  it('Should able to borrow and display it on the table', () => {
    // Test scenario 2
    cy.get('#inputID').type('04');
    cy.wait(500);
    cy.get('.tn').click();
    cy.wait(500);
    cy.get('[data-testid="Dashboard-test"]').should('exist')
    cy.get('.sidebuttons > :nth-child(2)').click();
    cy.wait(500)
    cy.get('.p-multiselect-trigger').click();
    cy.wait(500)
    cy.get('.itemlist').should('exist');
    cy.get('.p-multiselect-items > :nth-child(1)').should('exist').click();
    cy.wait(500);
    cy.get('.p-multiselect-trigger').click();
    cy.wait(500);
    cy.get('.p-inputnumber-button-up').click();
    cy.wait(500);
    cy.get('[data-testid="Borrow-test"]').click();
    cy.get('#inputID').type('05');
    cy.wait(500);
    cy.get('.p-button-label').click();
    cy.wait(500);
    cy.get('[data-testid="Dashboard-test"]').should('not.exist');
  })

  it('Should able to return and display it on the table', () => {
    // Test scenario 2
    cy.get('#inputID').type('04');
    cy.wait(500);
    cy.get('.tn').click();
    cy.wait(500);
    cy.get('[data-testid="Dashboard-test"]').should('exist')
    cy.wait(500)
    cy.get('.sidebuttons > :nth-child(3)').click();
    cy.wait(500)
    cy.get('#inputID').type('05');
    cy.wait(500)
    cy.get('.p-button-label').click();
    cy.wait(500)
    cy.get('.itemlist').click();
    cy.wait(500)
    cy.get('.p-dropdown-items .p-dropdown-item').first().click();
    cy.get('.p-button-label').click();
    cy.get(':nth-child(7) > :nth-child(5)').should('contain', 'Returned'); 
  })

  it('Should able to return and display it on the table', () => {
    // Test scenario 2
    cy.get('#inputID').type('04');
    cy.wait(500);
    cy.get('.tn').click();
    cy.wait(500);
    cy.get('[data-testid="Dashboard-test"]').should('exist')
    cy.wait(500)
    cy.get('.sidebuttons > :nth-child(3)').click();
    cy.wait(500)
    cy.get('#inputID').type('220000001551');
    cy.wait(500)
    cy.get('.p-button-label').click();
    cy.get('.itemlist').should('not.exist');
  })



  
  it('Should able to add and delete an item', () => {
    // Test scenario 2
    cy.get('#inputID').type('04');
    cy.wait(500);
    cy.get('.tn').click();
    cy.wait(500);
    cy.get('[data-testid="Dashboard-test"]').should('exist')
    cy.wait(500)
    cy.get('.sidebuttons > :nth-child(4)').click();
    cy.wait(500)
    cy.get('[data-testid="UItem-test"]').should('exist');
    cy.get('[placeholder="Name"]').type('cypress testing');
    cy.get('[placeholder="From Lab"]').type('cypress testing');
    cy.get('[placeholder="Description"]').type('cypress testing');
    cy.get('[placeholder="Quantity"]').type('1');
    cy.get('[placeholder="Total Quantity"]').type('1');
    cy.wait(500)
    cy.get('.p-button-label').click();
    cy.reload();
    cy.get(':nth-child(13) > :nth-child(1)').should('exist');

    cy.wait(500)
    cy.get('tbody > :nth-child(13) > :nth-child(1)').click();
    cy.wait(500)
    cy.get('[aria-label="Delete"] > .p-button-label').click();
    cy.wait(500)
    cy.get(':nth-child(13) > :nth-child(1)').should('not.exist');

})


  it('Should able to edit an item', () => {
    // Test scenario 2
    cy.get('#inputID').type('04');
    cy.wait(500);
    cy.get('.tn').click();
    cy.wait(500);
    cy.get('[data-testid="Dashboard-test"]').should('exist')
    cy.wait(500)
    cy.get('.sidebuttons > :nth-child(4)').click();
    cy.wait(500)
    cy.get('[data-testid="UItem-test"]').should('exist');
    cy.get('[placeholder="Name"]').type('cypress testing');
    cy.get('[placeholder="From Lab"]').type('cypress testing');
    cy.get('[placeholder="Description"]').type('cypress testing');
    cy.get('[placeholder="Quantity"]').type('1');
    cy.get('[placeholder="Total Quantity"]').type('1');
    cy.wait(500)
    cy.get('.p-button-label').click();
    cy.wait(500)
    cy.reload();
    cy.get(':nth-child(13) > :nth-child(1)').should('exist');
    cy.wait(500)
    cy.get('tbody > :nth-child(13) > :nth-child(1)').click();
    cy.wait(500)
    cy.get('.detail-section > :nth-child(1) > :nth-child(2)').clear().type('cypress testing2');
    cy.get('.detail-section > :nth-child(1) > :nth-child(3)').clear().type('cypress testing2');
    cy.get(':nth-child(1) > [value="cypress testing"]').clear().type('cypress testing2');
    cy.get(':nth-child(1) > [value="1"]').clear().type('2');
    cy.wait(500)
    cy.get('[aria-label="Save"] > .p-button-label').click();
    cy.wait(500)
    cy.get(':nth-child(13) > :nth-child(1)').should('contain', 'cypress testing2');
  })




})

