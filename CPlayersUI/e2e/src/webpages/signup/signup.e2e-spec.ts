import { SignupPage } from "./signup.po";
import { protractor, browser } from "protractor";


describe('Signup page', () => {
    let page: SignupPage;
    const EC = protractor.ExpectedConditions;
    
    beforeEach(() => {
        page = new SignupPage();
        page.navigateToSignUpPage();
    });
    it('sucessfull Signup', () => {
        page.sendNameForSignUp().sendKeys('Saikat');
        page.sendEmailForSignUp().sendKeys('saikat@daikat.com');
        page.sendPasswordForSignup().sendKeys('123456');
        page.getSignUpButton().click();
        browser.wait(EC.visibilityOf(page.getSucsessMessage()));
        expect(page.getSucsessMessage().getText()).toBe('User added successfully! click HERE Here to login!');
    });

    it('Existing Email so Failed Signup', () => {
        page.sendNameForSignUp().sendKeys('Saikat');
        page.sendEmailForSignUp().sendKeys('saikat@daikat.com');
        page.sendPasswordForSignup().sendKeys('12345');
        page.getSignUpButton().click();
        browser.wait(EC.visibilityOf(page.getErrorMessage()));
        expect(page.getErrorMessage().getText()).toBe('Email Already Exists!');
    });

});