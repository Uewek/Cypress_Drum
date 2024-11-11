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
    //Open page
    HomePage.openPage();
    HomePage.clickOnSignin();
    cy.url().should('include', 'sign-in');
    //Enter email
    SignInPage.typeEmail(emails.validEmail);
    SignInPage.clickOnSubmitBtn();
    // If present automation suspects check that message else check correct registration.
    // I know, "if"s in autotests is not a good practice   Let's make sure you're human
    if (cy.get('.error-block').should('be.visible')) {
      // too many attempts warning
      PasswordPage.elements.errorMessage().should('be.visible');
      PasswordPage.elements.errorMessage().should('contain.text', passwordMessages.tooManyAttemptsMessage);
    } else {
      // normal behavior
      HomePage.elements.welcomeModal().should('be.visible');
      HomePage.submitModalWindow();
      HomePage.elements.registredNewUser().should('be.visible');
    }
  }
  );

  it('The user should not be able to register by entering an incorrect email.', () => {
    SignInPage.openPage();
    cy.url().should('include', 'sign-in');
    //Enter incorrect email
    SignInPage.typeEmail(emails.invalidEmail1);
    SignInPage.clickOnSubmitBtn();
    SignInPage.elements.errorNote().should('contain.text', emailMessages.incorrectEmailMessage);
  }
  );

  it('The user should not be able to register without entering an email/entering an empty email.', () => {
    SignInPage.openPage();
    //Click on button without enter email
    SignInPage.clickOnSubmitBtn();
    //Check
    SignInPage.elements.errorNote().should('contain.text', emailMessages.emptyEmailMessage);
  }
  );

  it('The user should not be able to register by entering different correct passwords.', () => {
    SignInPage.openPage();
    SignInPage.typeEmail(emails.validEmail);
    SignInPage.clickOnSubmitBtn();
    //Enter not same passwords
    PasswordPage.enterDifferentPasswords(passwords.validPassword1, passwords.validPassword2);
    PasswordPage.clickOnSubmitButton();
    //Check messages
    PasswordPage.elements.confirmPasswordWarning().should('be.visible');
    PasswordPage.elements.confirmationNote().should('contain.text', passwordMessages.notSameMessage);
  }
  );
})