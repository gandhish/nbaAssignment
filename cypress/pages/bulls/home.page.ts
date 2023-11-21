import { BasePage } from "../base.page";

export class BullsHomePage extends BasePage{

    visit(): BullsHomePage{
        super.visit('bulls');
        return this;
    }

    gotoFooter(){
        cy.get('footer[data-testid="footer"]').scrollIntoView();  
    }

    getAllFooterLinks(){
        let allLinks: string[] = []
        cy.get('[data-testid="footer-list-item"]').each($footerItem => {
            allLinks.push($footerItem.find('a').attr("href"))
            cy.log($footerItem.find('a').attr("href"));
        }).then(() => {
            cy.wrap(allLinks.filter((element, index, arr) => arr.indexOf(element) !== index)).as('duplicateLinksList')
            cy.wrap(allLinks.filter((element, index, arr) => arr.indexOf(element) !== index).length).as('duplicateLinksCount')
        })
    }
}