import { FavouritePage } from "./favourite.po";
import { protractor } from "protractor";
import { LoginPage } from "../login/login.po";
import { HomepagePage } from '../homepage/homepage.po';
import { browser } from "protractor";

describe('Favourite page', () => {

    let homepage: HomepagePage;
    let loginpage: LoginPage;
    let page: FavouritePage;
    const EC = protractor.ExpectedConditions;

    beforeEach(() => {
        homepage= new HomepagePage();
        loginpage = new LoginPage();
        page = new FavouritePage();
        loginpage.navigateToLoginPage();
    });




    it('Should Goto Favourite Page', async () => {
        loginpage.sendEmailForLogin().sendKeys('s@g.com');
        loginpage.sendPasswordForLogin().sendKeys('12345');
        loginpage.getLoginButton().click();
        homepage.getFavouriteButton().click();
        browser.sleep(2000);
        expect(page.getTitle().isPresent()).toBeTruthy();
        expect(browser.driver.getCurrentUrl()).toContain('/favourite');
    });

    it('Should remove Favourite Page', async () => {
        loginpage.sendEmailForLogin().sendKeys('s@g.com');
        loginpage.sendPasswordForLogin().sendKeys('12345');
        loginpage.getLoginButton().click();
        homepage.sendNameForSearch().sendKeys('dhoni');
        homepage.getSearchButton().click();
        browser.sleep(3000);
        homepage.getAddFavButton().click();
        browser.sleep(5000);
        homepage.getFavouriteButton().click();
        browser.sleep(15000);
        browser.wait(EC.visibilityOf(page.getRemoveButton()));
        page.getRemoveButton().click();
        expect(page.getFavCard().isPresent()).toBeFalsy;
        expect(browser.driver.getCurrentUrl()).toContain('/favourite');
    });


   it('should be able to Logout ', async () => {
        loginpage.sendEmailForLogin().sendKeys('s@g.com');
        loginpage.sendPasswordForLogin().sendKeys('12345');
        loginpage.getLoginButton().click();
        homepage.getFavouriteButton().click();
        page.getLogoutButton().click();
        expect(loginpage.getTitle().isPresent()).toBeTruthy();
        expect(browser.driver.getCurrentUrl()).toContain('/login');
    }); 

    


});

