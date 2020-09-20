// const casual = require("casual");

describe("Booking Page tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:6969");
  });

  xit("navigates through the links", () => {
    cy.get("#book-a-pick-up").click();
    cy.url().should("eq", "http://localhost:6969/customers");
    cy.get("#booking-list").click();
    cy.url().should("eq", "http://localhost:6969/customers/deliveries");
    cy.get("#drivers-main").click();
  });

  xit("should show error messages when input are left blank", () => {
    cy.get("#booking-submit-btn").click();
    cy.get(".parsley-error-list").should("have.length", 6);
  });

  it("should fill up the form, create a booking and immediately be added at deliveries table", () => {
    cy.get("#booking-list").click();
    cy.get("#deliveries-table")
      .find("tr")
      .then((list) => {
        const listingCount = Cypress.$(list).length;
        cy.contains(/book a pick up/i).click();
        cy.contains(/fill up randomly/i).click();

        cy.get("#booking-submit-btn").click();
        const message = cy.get(".swal-text");
        expect(message).to.contain(/successfully added booking/i);

        cy.get(".swal-button--confirm").click();
        cy.get("#booking-list").click();

        cy.get("#deliveries-table")
          .find("tr")
          .then((newList) => {
            expect(newList).to.have.length(listingCount + 1);
          });
      });
  });
});
