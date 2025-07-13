import request from 'supertest';
import app from '../app.js';

describe('GET /', () => {
  it('should return "API Finance funcionando!"', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('API Finance funcionando!');
  });
});

describe('GET /usuarios', () => {
  it('should return a 500 error if there is a database error', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error', 'Erro ao buscar usuários');
  });
});

