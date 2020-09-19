// const casual = require("casual");

describe("Booking Page tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:6969");
  });

  it("navigates through the links", () => {
    cy.contains(/deliveries/i).click();
    cy.url().should("include", "deliveries");
    cy.contains(/book a pick up/i).click();
    cy.url().should("eq", "http://localhost:6969/");
    cy.contains(/deliveries/i).click();
    cy.contains(/book a pick up/i).click();
  });

  it("should show error messages when input are left blank", () => {
    cy.get("#booking-submit-btn").click();
    cy.get(".parsley-error-list").should("have.length", 7);
  });

  it("should fill up the form, create a booking and immediately be added at deliveries table", () => {
    cy.contains(/deliveries/i).click();
    cy.get("#deliveries-table")
      .find("tr")
      .then((list) => {
        const listingCount = Cypress.$(list).length;
        cy.contains(/book a pick up/i).click();

        cy.get("[name=shippersName]").focus().type("Leonardo Dicaprio");
        cy.get("[name=shippersContactNumber]").focus().type("09194890936");
        cy.get("[name=shippersAddress]").focus().type("Batanes, Philippines");
        cy.get("[name=shippersEmailAddress]")
          .focus()
          .type("leonardodicaprio@gmail.com");
        cy.get("[name=receiversName]").focus().type("Amy Adams");
        cy.get("[name=receiversContactNumber]").focus().type("(224) 6236");
        cy.get("[name=receiversAddress]").focus().type("Mexico, Pampanga");
        cy.get("#booking-submit-btn").click();
        const message = cy.get(".swal-text");
        expect(message).to.contain(/successfully added booking/i);

        cy.get(".swal-button--confirm").click();
        cy.contains(/deliveries/i).click();

        cy.get("#deliveries-table")
          .find("tr")
          .then((newList) => {
            expect(newList).to.have.length(listingCount + 1);
          });
      });
  });
});
