describe("Joining and Hosting tests", () => {
  it("Visits the Cawhoot page and enter no room id", () => {
    cy.visit("/");

    cy.contains("Join Room").click();
    cy.contains("ENTER A VALID ROOM ID");
  });

  it("Visits the Cawhoot page and try to join an invalid room", () => {
    cy.visit("/");

    cy.get('[data-test="join-field"]').type("invalid id");
    cy.contains("Join Room").click();
    cy.contains("ENTER A VALID ROOM ID");
  });

  it("Visits the Cawhoot page, hosts a game, and types into chat, and leaves to close room", () => {
    cy.visit("/");

    cy.contains("Host Game").click();
    cy.get('[data-test="deck-button"]').first().click();
    cy.get('[data-test="play-button"]').click();
    // enters hello into chat and confirms message in chat
    cy.get('[data-test="input-chatbox"]').type("hello{enter}");
    cy.get("[id=chatbox]").contains("hello");

    cy.visit("/");
    // confirm with server db that room is indeed closed
  });
});
