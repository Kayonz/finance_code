/* eslint-env jest */
import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../app.js';
import pool from '../config/database.js';

describe('GET /', () => {
  it('deve retornar "API Finance funcionando!"', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('API Finance funcionando!');
  });
});

describe('GET /usuarios', () => {
  let consoleErrorSpy;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should return a 500 error if there is a database error', async () => {
    // MOCK para simular erro no banco
    jest.spyOn(pool, 'query').mockRejectedValue(new Error('DB error'));

    const res = await request(app).get('/usuarios');
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error', 'Erro ao buscar usuários');

    // Limpa o mock para não impactar outros testes
    pool.query.mockRestore();
  });
});

