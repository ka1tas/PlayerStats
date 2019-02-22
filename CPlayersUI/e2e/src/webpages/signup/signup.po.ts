 import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class SignupPage {

    navigateToSignUpPage() {
        return browser.get('/signup');
    }

    sendNameForSignUp() {
        return element(by.id('signupname'));
    }
   
    sendEmailForSignUp() {
        return element(by.id('signupemail'));
    }

    sendPasswordForSignup() {
        return element(by.id('signuppassword'));
    }
    getSignUpButton() {
        return element(by.id('signupbutton'));
    }

    getErrorMessage() {
        return element(by.id('signupError'));
    }

    getSucsessMessage() {
        return element(by.id('signupSuccess'));
    }

} 