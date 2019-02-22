import { browser, by, element } from 'protractor';

export class LoginPage {

    navigateToLoginPage() {
        return browser.get('/login');
    }

    sendEmailForLogin() {
        return element(by.id('loginemail'));
    }

    sendPasswordForLogin() {
        return element(by.id('loginpassword'));
    }
    getLoginButton() {
        return element(by.id('loginbutton'));
    }

    getErrorMessage() {
        return element(by.id('errorwrong'));
    }

    getTitle() {
        return element(by.id('title'));
    }
}
