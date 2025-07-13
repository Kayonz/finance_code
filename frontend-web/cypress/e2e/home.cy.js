describe('Dashboard Page', () => {
  it('Deve visitar a DashboardPage', () => {
    cy.visit('/');
    cy.contains('Bem-vindo'); // Supondo que a página inicial tenha um texto de boas-vindas
  });
});
describe('Dashboard Page', () => {
  beforeEach(() => {
    // Mock da API de login para simular um usuário logado
    cy.intercept('POST', 'http://localhost:5000/api/auth/login', {
      statusCode: 200,
      body: { token: 'fake-token' },
    }).as('loginAPI');

    // Mock da API de informações do usuário
    cy.intercept('GET', 'http://localhost:5000/api/auth/me', {
      statusCode: 200,
      body: { user: { nome: 'Usuário Teste', foto_url: null } },
    }).as('userInfoAPI');

    // Mock da API de orçamento
    cy.intercept('GET', 'http://localhost:5000/api/orcamento', {
      statusCode: 200,
      body: { orcamento: 1000 },
    }).as('orcamentoAPI');

    // Mock da API de gastos por categoria
    cy.intercept('GET', 'http://localhost:5000/api/gastos-por-categoria', {
      statusCode: 200,
      body: [
        { categoria: 'Alimentação', valor: 300 },
        { categoria: 'Transporte', valor: 150 },
        { categoria: 'Lazer', valor: 50 },
      ],
    }).as('gastosAPI');

    // Visita a página de login e simula o login
    cy.visit('/login');
    cy.get('input[type="email"]').type('teste@teste.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button').contains('Entrar').click();
    cy.wait('@loginAPI');
    cy.url().should('include', '/'); // Redireciona para a dashboard após o login
  });

  it('Deve exibir os elementos básicos da DashboardPage', () => {
    cy.contains('Dashboard Financeiro').should('be.visible');
    cy.contains('Bem-vindo de volta,').should('be.visible');
    cy.contains('Usuário Teste').should('be.visible');
    cy.contains('Sair').should('be.visible');

    // Verificar cards de resumo
    cy.contains('Saldo Disponível').should('be.visible');
    cy.contains('Gastos do Mês').should('be.visible');
    cy.contains('Orçamento Total').should('be.visible');
    cy.contains('Status do Orçamento').should('be.visible');

    // Verificar botões de ação
    cy.contains('📷 Ler Cupom Fiscal').should('be.visible');
    cy.contains('🎯 Definir Orçamento').should('be.visible');
    cy.contains('🗑️ Zerar Orçamento').should('be.visible');
    cy.contains('📊 Ver Métricas').should('be.visible');

    // Verificar gráficos
    cy.contains('Distribuição por Categoria').should('be.visible');
    cy.contains('Histórico de Gastos').should('be.visible');
  });

  it('Deve exibir os valores corretos nos cards de resumo', () => {
    cy.contains('Saldo Disponível').next('p').should('contain', 'R$ 500,00'); // 1000 - (300+150+50) = 500
    cy.contains('Gastos do Mês').next('p').should('contain', 'R$ 500,00'); // 300+150+50 = 500
    cy.contains('Orçamento Total').next('p').should('contain', 'R$ 1.000,00');
    cy.contains('Status do Orçamento').next('p').should('contain', '50.00%'); // (500/1000)*100 = 50
  });

  it('Deve navegar para a página de Cupom Fiscal ao clicar no botão', () => {
    cy.contains('📷 Ler Cupom Fiscal').click();
    cy.url().should('include', '/cupom');
  });

  it('Deve navegar para a página de Métricas ao clicar no botão', () => {
    cy.contains('📊 Ver Métricas').click();
    cy.url().should('include', '/metricas');
  });

  it('Deve abrir e fechar o modal de Definir Orçamento', () => {
    cy.contains('🎯 Definir Orçamento').click();
    cy.contains('Definir Orçamento Mensal').should('be.visible');
    cy.get('input[placeholder="Digite o valor em R$"]').should('be.visible');
    cy.contains('Cancelar').click();
    cy.contains('Definir Orçamento Mensal').should('not.exist');
  });

  it('Deve definir um novo orçamento através do modal', () => {
    cy.intercept('POST', 'http://localhost:5000/api/orcamento', {
      statusCode: 200,
      body: { message: 'Orçamento atualizado com sucesso!' },
    }).as('setOrcamentoAPI');

    cy.intercept('GET', 'http://localhost:5000/api/orcamento', {
      statusCode: 200,
      body: { orcamento: 2000 }, 
    }).as('updatedOrcamentoAPI');

    cy.contains('🎯 Definir Orçamento').click();
    cy.get('input[placeholder="Digite o valor em R$"]').type('2000');
    cy.contains('Salvar').click();
    cy.wait('@setOrcamentoAPI');
    cy.wait('@updatedOrcamentoAPI');
    cy.contains('Definir Orçamento Mensal').should('not.exist');
    cy.contains('Orçamento Total').next('p').should('contain', 'R$ 2.000,00');
  });

  it('Deve abrir e fechar o modal de Confirmar Zerar Orçamento', () => {
    cy.contains('🗑️ Zerar Orçamento').click();
    cy.contains('Confirmar Ação').should('be.visible');
    cy.contains('Tem certeza que deseja zerar o orçamento?').should('be.visible');
    cy.contains('Cancelar').click();
    cy.contains('Confirmar Ação').should('not.exist');
  });

  it('Deve zerar o orçamento através do modal de confirmação', () => {
    cy.intercept('PUT', 'http://localhost:5000/api/orcamento/zerar', {
      statusCode: 200,
      body: { message: 'Orçamento zerado com sucesso!' },
    }).as('zerarOrcamentoAPI');

    cy.contains('🗑️ Zerar Orçamento').click();
    cy.contains('Confirmar').click();
    cy.wait('@zerarOrcamentoAPI');
    cy.contains('Confirmar Ação').should('not.exist');
    cy.contains('Orçamento Total').next('p').should('contain', 'R$ 0,00');
    cy.contains('Saldo Disponível').next('p').should('contain', 'R$ 0,00');
    cy.contains('Status do Orçamento').next('p').should('contain', '0.00%');
  });

  it('Deve fazer logout ao clicar no botão Sair', () => {
    cy.contains('Sair').click();
    cy.url().should('include', '/login');
    cy.window().its('localStorage').invoke('getItem', 'token').should('be.null');
  });
});