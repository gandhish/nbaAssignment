import { NewsPage } from '../pages/warriors/news.page'
import { BullsHomePage } from '../pages/bulls/home.page'
import { WarriorsHomePage } from '../pages/warriors/warriorshome.page'
import { ShopMensPage } from '../pages/warriors/shopmens.page'



describe('TakeHomeAssignmentSpec', () => {
  const warriorsHomePage = new WarriorsHomePage();
  const shopMensJacketsPage = new ShopMensPage();
  const warriorsNewsPage = new NewsPage();
  const bullsHomePage = new BullsHomePage();

  beforeEach(function () {
    cy.fixture('testData').then((testData) => {
      this.testData = testData;
    });
  });

  it('TC2 - Count Videos and Find Old Videos', function () {
    warriorsHomePage
      .visit()
      .navigateTo("...", "News & Features");

    warriorsNewsPage
      .gotoVideosSection();

    warriorsNewsPage
      .getVideoCount();

    cy
      .get('@videosCount')
      .should('equal', this.testData.videos.totalCount);

    let daysOld = 3;
    warriorsNewsPage
      .getOldVideos(daysOld);

    cy
      .get('@oldVideosCount')
      .should('be.above', this.testData.videos.olderThanThreeDays);

  })

  it('TC4 - Footer and its Links', () => {
    bullsHomePage
      .visit();

    bullsHomePage
      .gotoFooter();

    bullsHomePage
      .getAllFooterLinks();

    cy.get<Number>('@duplicateLinksCount') > 0 ?
      cy.log(`❗ **Following footer links were duplicate: ${cy.get('@duplicateLinksList')}**`)
      :
      cy.log("✅ **No duplicate footer links found!**");
  })


  it('TC1 - Get All Menu Items for Shop - Mens', () => {
    warriorsHomePage
      .visit()
      .navigateTo("Shop", "Men's");

    shopMensJacketsPage
      .getAllJackets(2); //Todo: Parameterised to take in number of pages - because Cypress was crashing. Change it to navigate to all pages

    cy
      .readFile(`cypress/reports/${Cypress.spec.name}/mensShoppingItems.txt`).should('not.be.empty');
      //Todo: Attach the txt file to the report
  })


})
