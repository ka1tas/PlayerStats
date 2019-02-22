import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class FavouritePage {

    navigateToFavouritePage() {
        return browser.get('/favourite');
    }

    getTitle() {
        return element(by.id('title'));
    }

    getLogoutButton() {
        return element(by.id('logoutButton'));
    }

    getRemoveButton(){
        return element(by.id('removeFavButton'));
    }

    getFavCard(){
        return element(by.id('favCard'));
    }
}
