
class HomePage {

    url = 'https://www.booking.com/';

    


    elements = {
        loginBtn : () => cy.get('[data-testid="header-small-sign-in-button"]'),
        rejectAll : () => cy.get('#onetrust-reject-all-handler'),
        closePopUpBtn : () => cy.get('[aria-label="Dismiss sign-in info."]'),
        successRegistrationModal : () => cy.get('[role="dialog"]'),
        closeModalButton : () => cy.get('button[aria-label="Dismiss"]'),
        submitModal : () => cy.contains('Ok, got it!'),
        welcomeModal : () => cy.contains('Welcome to Genius! You just unlocked Level 1'),
        registredNewUser : () => cy.contains('Your account menu Your account Genius Level 1'),
    }

    openPage() {
        cy.visit(this.url);
    }

    closePopUps() {
        this.elements.rejectAll().click();
        this.elements.closePopUpBtn().click();
    }

    clickOnSignin() {
        this.elements.loginBtn().click();
    }

    submitModalWindow() {
        this.elements.submitModal().click();
    }



}


module.exports = new HomePage();

