describe("Home Page", () => {
  it("should visit the home page", () => {
    cy.visit("/");
    cy.contains("Bem-vindo"); // Supondo que a página inicial tenha um texto de boas-vindas
  });
});

