import { HomepagePage } from "./homepage.po";
import { protractor } from "protractor";
import { LoginPage } from "../login/login.po";
import { browser } from "protractor";

describe('Home page', () => {

    let loginpage: LoginPage;
    let page: HomepagePage;
    const EC = protractor.ExpectedConditions;

    beforeEach(() => {
        loginpage = new LoginPage();
        page = new HomepagePage();
        loginpage.navigateToLoginPage();
    });


    it('Player Search', async () => {
        loginpage.sendEmailForLogin().sendKeys('s@g.com');
        loginpage.sendPasswordForLogin().sendKeys('12345');
        loginpage.getLoginButton().click();
        page.sendNameForSearch().sendKeys('dhoni');
        page.getSearchButton().click();
        browser.sleep(2000);
        browser.wait(EC.visibilityOf(page.getPlayerName()));
        expect(page.getPlayerName().getText()).toBe('Mahendra Singh Dhoni');
    });


   it('should be able show detail', async () => {
        loginpage.sendEmailForLogin().sendKeys('s@g.com');
        loginpage.sendPasswordForLogin().sendKeys('12345');
        loginpage.getLoginButton().click();
        page.sendNameForSearch().sendKeys('dhoni');
        page.getSearchButton().click();
        browser.sleep(3000);
        page.getDetailsButton().click();
        browser.wait(EC.visibilityOf(page.getStatsModal()));
        expect(page.getDetails().getText()).toBe('July 7, 1981, Ranchi, Bihar (now Jharkhand)');
    }); 

    it('should be able to add to fav', async () => {
        loginpage.sendEmailForLogin().sendKeys('s@g.com');
        loginpage.sendPasswordForLogin().sendKeys('12345');
        loginpage.getLoginButton().click();
        page.sendNameForSearch().sendKeys('dhoni');
        page.getSearchButton().click();
        browser.sleep(5000);
        page.getAddFavButton().click();
        browser.sleep(3000);
        expect(page.getremoveFavButton().toBeTruthy);
    }); 

    it('should be able to remove from fav', async () => {
        loginpage.sendEmailForLogin().sendKeys('s@g.com');
        loginpage.sendPasswordForLogin().sendKeys('12345');
        loginpage.getLoginButton().click();
        page.sendNameForSearch().sendKeys('dhoni');
        page.getSearchButton().click();
        browser.sleep(3000);
        page.getremoveFavButton().click();
        browser.wait(EC.visibilityOf(page.getAddFavButton()));
        expect(page.getAddFavButton()).toBeTruthy();
       
    }); 



});

