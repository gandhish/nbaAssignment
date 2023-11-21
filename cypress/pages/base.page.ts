export class BasePage{

    visit(page: string){
        cy.readFile('cypress/fixtures/pagesData.json').then($data => {
            cy.visit($data.pages[page]);
        })
    }

    

    dismissAcceptDialog(){
        cy.wait(5000);
        cy.get('body').then((body) => {
            if (body.find("#onetrust-accept-btn-handler").length > 0) {
                cy.get("#onetrust-accept-btn-handler").then($btn => {
                    if ($btn.is(":visible")) {
                        cy.wrap($btn).click({ force: true });
                    }
                });
            }
        });
    }
}