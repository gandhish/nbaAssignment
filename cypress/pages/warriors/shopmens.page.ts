import { WarriorsHomePage } from "./warriorshome.page";

export type JerseyItem = {
    jerseyPrice: string;
    jerseyTitle: string;
    jerseyTopsellerMessage: string;
}

export class ShopMensPage extends WarriorsHomePage {

    getAllJackets(maxPages: Number) {
        this.getJackets();
        this.handlePagination(maxPages);
    }

    getJackets() {
        let texts: string[] = [];
        cy.get('div.product-card.row').each($el => {
            texts.push(`Jacket Price: ${$el.find('div.price-row').find('span.sr-only').first().text()}`);
            texts.push(`Jacket Description: ${$el.find('div.product-card-title').find('a').text()}`);
            if ($el.find('span.top-seller-vibrancy-message').length > 0) {
                texts.push(`Jacket Top Seller Message: ${$el.find('span.top-seller-vibrancy-message').text()}`)
            }
            cy.writeFile(`cypress/reports/${Cypress.spec.name}/mensShoppingItems.txt`, texts, { flag: 'a+' });
            texts = [];
        })
    }

    handlePagination(maxPages: Number) {
        for (let i = 0; i < maxPages; i++) {
            cy.get('div.pagination-navigation').then($el => {
                this.getJackets();

                //Is the Next icon available?
                if ($el.find('.next-page').length > 0) {
                    $el.find('.next-page > a > i').trigger("click");
                }
            })
        }
    }

    //This method was crashing on Cypress after a few pages
    handlePaginationAll() {
        cy.get('div[class="pagination-navigation"]').then($el => {
            let jerseysOnPage: JerseyItem[] = [];
            this.getJackets();
            // jerseysOnPage = this.getJackets();
            // cy.writeFile('/Users/gandhish/array2.txt', this.getJackets()); 
            // cy.get<JerseyItem[]>('@jerseys').then(jerseyArray => {
            //     console.log(jerseyArray);
            //     cy.writeFile('/Users/gandhish/1.txt', jerseyArray); 
            //     cy.writeFile('/Users/gandhish/array2.txt', jerseyArray); 
            // })
            if ($el.find('.next-page').length > 0) {
                $el.find('.next-page > a > .icon').trigger("click");
                this.handlePaginationAll();
                //     this.clickNext();
                //     //this.getJackets();
            }
            //All pages done, write the jerseys to a file



        })
    }


}