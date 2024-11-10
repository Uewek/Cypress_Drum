class SignInPage {

    url = 'https://account.booking.com/sign-in';

    elements = {
        emailInput : () => cy.get('#username'),
        submitBtn : () => cy.get('div:nth-child(2) > button'),
        errorNote : () => cy.get('#username-note'),
    }

    testData = {
        validEmail1  : 'validMail@test.com',
        borderEmail1  : 'bor@tt.co',
        invalidEmail1  : '@test.com',
    }

    openPage() {
        cy.visit(this.url);
    }

    typeEmail(mail) {
        this.elements.emailInput().type(mail);
    }

    clickOnSubmitBtn() {
        this.elements.submitBtn().click();
    }
}

module.exports = new SignInPage();
