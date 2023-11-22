import { WarriorsHomePage } from "./warriorshome.page";

export class NewsPage extends WarriorsHomePage {
    gotoVideosSection() {
        cy.get('[data-testid="heading"] > h3').contains('VIDEOS').scrollIntoView();
    }

    getVideoCount() {
        this.getAllVideos().then($allVideos => {
            cy.wrap($allVideos.length).as('videosCount');
        })
    }

    getOldVideos(howmanydays: Number) {
        let oldVideos = 0;
        return this.getAllVideos().each($video => {
            if (Number($video.parents('li')
                .find('time')
                .find('span')
                .text().slice(0, -1)) >= howmanydays) {
                oldVideos++;
            }
        }).then(() => {
            cy.wrap(oldVideos).as('oldVideosCount');
        });

    }

    getAllVideos() {
        return cy.get('a[href^="/warriors/videos"]').filter('a.TileArticle_tileLink__9vE5P, a.absolute.inset-0.z-10');
    }
}