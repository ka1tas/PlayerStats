import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class HomepagePage {

    navigateToHomePage() {
        return browser.get('/home');
    }

    getTitle() {
        return element(by.id('titllle'));
    }

    sendNameForSearch() {
        return element(by.id('playerNameSerach'));
    }

    getSearchButton() {
        return element(by.id('searchbutton'));
    }

    getDetailsButton() {
        return element(by.id('showStasButton'));
    }

    getAddFavButton() {
        return element(by.id('addFavButton'));
    }

    getremoveFavButton() {
        return element(by.id('remoeFavButton'));
    }

    getPlayerName() {
        return element(by.id('playerName'));
    }


    getStatsModal() {
        return element(by.id('playerStats'));
    }

    getMessegeModal() {
        return element(by.id('showMsg'));
    }


    getDetails() {
        return element(by.id('bornDetails'));
    }

    getsuccessmessege() {
        return element(by.id('successmessege'));
    }

    getFavouriteButton() {
        return element(by.id('favouriteButton'));
    }

    getcloseModalButton() {
        return element(by.id('closeModalButton'));
    }

    


}
