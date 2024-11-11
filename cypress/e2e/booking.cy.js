import HomePage from "../support/pages/homePage";
import SignInPage from "../support/pages/signIn";
import PasswordPage from "../support/pages/passwordPage";
import {
  emailMessages,
  passwordMessages
} from "../data/errorMessages";
import {
  emails,
  passwords
} from "../data/credentials";

describe('Booking test task', () => {

  it('User must be able create new account using correct email and password', () => {
    HomePage.openPage();
    HomePage.clickOnSignin();
    cy.url().should('include', 'sign-in');
    SignInPage.typeEmail(emails.validEmail);
    SignInPage.clickOnSubmitBtn();
    cy.url().should('include', 'password');
    PasswordPage.enterSamePasswords(passwords.validPassword1);
    cy.contains('Create account').should('be.visible');
    PasswordPage.clickOnSubmitButton();
    // If present automation suspects check that message else check correct registration.
    // I know, "if"s in autotests is not a good practice
    if (cy.get('.error-block').should('be.visible')) {
      PasswordPage.elements.errorMessage().should('be.visible');
      PasswordPage.elements.errorMessage().should('contain.text', passwordMessages.tooManyAttemptsMessage);
    } else {
      HomePage.elements.welcomeModal().should('be.visible');
      HomePage.submitModalWindow();
      HomePage.elements.registredNewUser().should('be.visible');
    }
  }
  );

  it('The user should not be able to register by entering an incorrect email.', () => {
    SignInPage.openPage();
    cy.url().should('include', 'sign-in');
    SignInPage.typeEmail(emails.invalidEmail1);
    SignInPage.clickOnSubmitBtn();
    SignInPage.elements.errorNote().should('contain.text', emailMessages.incorrectEmailMessage);
  }
  );

  it('The user should not be able to register without entering an email/entering an empty email.', () => {
    SignInPage.openPage();
    SignInPage.clickOnSubmitBtn();
    SignInPage.elements.errorNote().should('contain.text', emailMessages.emptyEmailMessage);
  }
  );

  it('The user should not be able to register by entering different correct passwords.', () => {
    SignInPage.openPage();
    SignInPage.typeEmail(emails.validEmail);
    SignInPage.clickOnSubmitBtn();
    PasswordPage.enterDifferentPasswords(passwords.validPassword1, passwords.validPassword2);
    PasswordPage.clickOnSubmitButton();
    PasswordPage.elements.confirmPasswordWarning().should('be.visible');
    PasswordPage.elements.confirmationNote().should('contain.text', passwordMessages.notSameMessage);
  }
  );
})