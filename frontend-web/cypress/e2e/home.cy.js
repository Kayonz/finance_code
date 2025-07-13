describe('Dashboard Page', () => {
  it('Deve visitar a DashboardPage', () => {
    cy.visit('/');
    cy.contains('Bem-vindo'); // Supondo que a página inicial tenha um texto de boas-vindas
  });
});
