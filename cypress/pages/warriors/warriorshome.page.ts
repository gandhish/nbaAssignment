import { BasePage } from "../base.page";

export class WarriorsHomePage extends BasePage{

    visit(): WarriorsHomePage {
        super.visit("warriors");
        this.closeAd();
        return this;
    }

    closeAd(){
        cy.get('.p-2', {timeout: 8000}).click();
    }

    hamburgerClick(){
        cy.get('div.flex.flex-nowrap', { timeout: 20000 }).should('be.visible');
        cy.get('[data-testid="global-navigation-toggle"]',{ timeout: 20000 }).first().within(()=>{
            cy.get('span', { timeout: 20000 }).first().should('be.visible').click();
        })
    }

    navigateTo(mainMenu:string, subMenu:string){       
        this.hamburgerClick();
        cy.readFile('cypress/fixtures/pagesData.json').then($data => {
            cy.get(`li[data-testid="${$data.menu[mainMenu.toLowerCase().split(" ").join("")]}"]`)
            .within($menuItem =>{
                cy.get('button.menu-item')
                .click({force: true});

                cy.get(`li[data-testid="${$data.menu[subMenu.toLowerCase().replace("\'", "").split(" ").join("")]}"] > a`)
                .invoke('removeAttr','target')
                .click({force: true});
            })

        })
    }
}