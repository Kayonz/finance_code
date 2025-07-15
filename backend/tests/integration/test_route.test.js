import request from 'supertest';
import app from '../../src/app.js';

describe('Testes de Integração para a Rota Raiz', () => {
  it('deve retornar status 200 e uma mensagem de boas-vindas para a rota GET /', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Bem-vindo à API de Gerenciamento Financeiro!');
  });
});