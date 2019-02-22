import { LoginPage } from './login.po';
import { protractor, browser } from 'protractor';
import { HomepagePage } from '../homepage/homepage.po';
describe('Login page', () => {
    let page: LoginPage;
    let home = new HomepagePage();
    const EC = protractor.ExpectedConditions;

    beforeEach(() => {
        page = new LoginPage();
        page.navigateToLoginPage();
    });


    it('successful login', () => {
        page.sendEmailForLogin().sendKeys('s@g.com');
        page.sendPasswordForLogin().sendKeys('12345');
        page.getLoginButton().click();
        browser.wait(EC.visibilityOf(home.getTitle()));
        expect(home.getTitle().isPresent()).toBeTruthy();
        expect(browser.driver.getCurrentUrl()).toContain('/');
    });

    it('failed login', () => {
        page.sendEmailForLogin().sendKeys('email@gmail.com');
        page.sendPasswordForLogin().sendKeys('12345ds6');
        page.getLoginButton().click();
        browser.wait(EC.visibilityOf(page.getErrorMessage()));
        expect(page.getErrorMessage().getText()).toBe('Email or Password did not matched!');
    });
});

