describe('template spec', () => {
  

  it('should able to login if the id is valid and should enter the dashboard page', () =>{

    

    cy.visit('http://localhost:5173/Scan');
    
    //Check if a button to change page to borrow_page exist
    cy.get('[data-testid="startSystem-test"]').should('exist');

    //Check if warning is invisible
    cy.get('[data-testid="startSystemWarn-test"]').should('not.exist');

    //Check if user can input their ID
    cy.get('[data-testid="startSystemInput-test"]').should('exist');

    //Input Id for System Startup
    cy.get('[data-testid="startSystemInput-test"]').type('04');

    //Check if button exist
    cy.get('[data-testid="startSystemButton-test"]').should('exist');

    //Check if button exist
    cy.get('[data-testid="startSystemButton-test"]').click({ 
      // Prevent Cypress from reloading the page
      force: true,
      // Intercept the navigation event and prevent it
      onBeforeLoad: (contentWindow) => {
        return false;
      }
    });

    //cy.wait('@interceptedRequest');

    //Check if user has entered dashboard
    cy.get('[data-testid="Dashboard-test"]').should('exist');


    
  });

    

  
});