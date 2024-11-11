class PasswordPage {

    elements = {
        mainPasswordInput: () => cy.get('#new_password'),
        confirmPasswordField: () => cy.get('#confirmed_password'),
        submitButton: () => cy.get('.nw-register button[type="submit"]'),
        errorMessage: () => cy.get('.error-block'),
        newPasswordNote: () => cy.get('#new_password-note'),
        confirmationNote: () => cy.get('#confirmed_password-note'),
        newPasswordWarning: () => cy.get('[aria-hidden="true"]').eq(2),
        confirmPasswordWarning: () => cy.get('[aria-hidden="true"]').eq(3),

    }

    enterSamePasswords(password) {
        this.elements.mainPasswordInput().type(password);
        this.elements.confirmPasswordField().type(password);
    }

    enterDifferentPasswords(password1, password2) {
        this.elements.mainPasswordInput().type(password1);
        this.elements.confirmPasswordField().type(password2);
    }

    clickOnSubmitButton() {
        this.elements.submitButton().click();
    }

}

module.exports = new PasswordPage();