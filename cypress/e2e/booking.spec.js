import HomePage from "../support/pages/homePage";
import SignInPage, { assertionData } from "../../pages/signIn";
import PasswordPage from "../../pages/passwordPage";

it('positive registration', () => {

    HomePage.openPage();
    HomePage.clickOnSignin();
    cy.url().should('include', 'sign-in');
    SignInPage.typeEmail(SignInPage.testData.borderEmail1);
    SignInPage.clickOnSubmitBtn();
    cy.url().should('include', 'password');
    PasswordPage.enterSamePasswords(PasswordPage.testData.validPassword1);
    PasswordPage.clickOnSubmitButton();
    cy.get('.error-block').should('be.visible');
    PasswordPage.elements.errorMessage().should('be.visible');
    PasswordPage.elements.errorMessage().should('contain.text', PasswordPage.assertionData.tooManyAttemptsMessage);
    }
);

it('negative registration wrong email B-002', () => {

    HomePage.openPage();
    HomePage.clickOnSignin();
    cy.url().should('include', 'sign-in');
    SignInPage.typeEmail(SignInPage.testData.invalidEmail1);
    SignInPage.clickOnSubmitBtn();
    SignInPage.elements.errorNote().should('be.visible');
    SignInPage.elements.errorNote().should('contain.text', SignInPage.assertionData.incorrectEmailMessage);
    }
);

it('negative registration empty email B-003', () => {
    HomePage.openPage();
    HomePage.clickOnSignin();
    cy.url().should('include', 'sign-in');
    SignInPage.clickOnSubmitBtn();
    SignInPage.elements.errorNote().should('be.visible');
    SignInPage.elements.errorNote().should('contain.text', SignInPage.assertionData.emptyEmailMessage);
    }
);
it('negative registration different passwords.', () => {
    SignInPage.openPage();
    SignInPage.typeEmail(SignInPage.testData.validEmail1);
    SignInPage.clickOnSubmitBtn();
    PasswordPage.enterDifferentPasswords(PasswordPage.testData.validPassword1, PasswordPage.testData.validPassword2);
    PasswordPage.clickOnSubmitButton();
    PasswordPage.elements.confirmPasswordWarning().should('be.visible');
    PasswordPage.elements.confirmationNote().should('contain.text',PasswordPage.assertionData.notSameMessage);
    }
);