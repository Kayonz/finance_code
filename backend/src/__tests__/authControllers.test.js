import request from 'supertest';
import app from '../app.js';
import pool from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock do pool de conexão com o banco de dados
jest.mock('../config/database.js', () => ({
  __esModule: true, // Isso é importante para mockar exports padrão
  default: {
    query: jest.fn(),
  },
}));

// Mock do bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

// Mock do jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('Controladores de Autenticação (authControllers)', () => {
  beforeEach(() => {
    // Limpa os mocks antes de cada teste para garantir isolamento
    pool.default.query.mockClear();
    bcrypt.hash.mockClear();
    bcrypt.compare.mockClear();
    jwt.sign.mockClear();
  });

  describe('Registro de Usuário (registerUser)', () => {
    it('Deve registrar um novo usuário e retornar um token de autenticação', async () => {
      const newUser = { nome: 'Usuário de Teste', email: 'teste@exemplo.com', senha: 'senha123' };
      const hashedPassword = 'senhaHashGerada';
      const userId = 'idDoUsuario123';
      const token = 'tokenMockadoDeAutenticacao';

      // Simula que o email não existe no banco de dados
      pool.default.query.mockResolvedValueOnce({ rows: [] });
      // Simula o hash da senha
      bcrypt.hash.mockResolvedValueOnce(hashedPassword);
      // Simula a inserção do novo usuário no banco de dados
      pool.default.query.mockResolvedValueOnce({ rows: [{ id: userId, nome: newUser.nome, email: newUser.email, foto_url: null }] });
      // Simula a criação de categorias padrão para o novo usuário
      pool.default.query.mockResolvedValue({ rows: [] });
      // Simula a geração do token JWT
      jwt.sign.mockReturnValue(token);

      const res = await request(app).post('/api/auth/register').send(newUser);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token', token);
      expect(res.body.user).toHaveProperty('id', userId);
      expect(pool.default.query).toHaveBeenCalledWith('SELECT id FROM users WHERE email = $1', [newUser.email]);
      expect(bcrypt.hash).toHaveBeenCalledWith(newUser.senha, 10);
      expect(pool.default.query).toHaveBeenCalledWith(
        'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email, foto_url',
        [newUser.nome, newUser.email, hashedPassword]
      );
      expect(jwt.sign).toHaveBeenCalledWith({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    });

    it('Deve retornar status 400 se o email já estiver cadastrado', async () => {
      const existingUser = { nome: 'Usuário Existente', email: 'existente@exemplo.com', senha: 'senha123' };

      // Simula que o email já existe no banco de dados
      pool.default.query.mockResolvedValueOnce({ rows: [{ id: 'idDoUsuarioExistente' }] });

      const res = await request(app).post('/api/auth/register').send(existingUser);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Email já cadastrado');
      expect(pool.default.query).toHaveBeenCalledWith('SELECT id FROM users WHERE email = $1', [existingUser.email]);
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('Deve retornar status 500 em caso de erro interno do servidor durante o registro', async () => {
      const newUser = { nome: 'Usuário com Erro', email: 'erro@exemplo.com', senha: 'senha123' };

      // Simula um erro no banco de dados
      pool.default.query.mockRejectedValueOnce(new Error('Erro no banco de dados'));

      const res = await request(app).post('/api/auth/register').send(newUser);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('message', 'Erro no servidor');
    });
  });

  describe('Login de Usuário (loginUser)', () => {
    it('Deve permitir o login de um usuário e retornar um token de autenticação', async () => {
      const userCredentials = { email: 'teste@exemplo.com', senha: 'senha123' };
      const userInDb = { id: 'idDoUsuario123', nome: 'Usuário de Teste', email: 'teste@exemplo.com', senha: 'senhaHashGerada', foto_url: null };
      const token = 'tokenMockadoDeAutenticacao';

      // Simula que o usuário é encontrado no banco de dados
      pool.default.query.mockResolvedValueOnce({ rows: [userInDb] });
      // Simula que a senha está correta
      bcrypt.compare.mockResolvedValueOnce(true);
      // Simula a geração do token JWT
      jwt.sign.mockReturnValue(token);

      const res = await request(app).post('/api/auth/login').send(userCredentials);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token', token);
      expect(res.body.user).toHaveProperty('id', userInDb.id);
      expect(pool.default.query).toHaveBeenCalledWith('SELECT * FROM users WHERE email = $1', [userCredentials.email]);
      expect(bcrypt.compare).toHaveBeenCalledWith(userCredentials.senha, userInDb.senha);
      expect(jwt.sign).toHaveBeenCalledWith({ id: userInDb.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    });

    it('Deve retornar status 401 se o usuário não for encontrado', async () => {
      const userCredentials = { email: 'naoexiste@exemplo.com', senha: 'senha123' };

      // Simula que o usuário não é encontrado no banco de dados
      pool.default.query.mockResolvedValueOnce({ rows: [] });

      const res = await request(app).post('/api/auth/login').send(userCredentials);

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Usuário não encontrado');
      expect(pool.default.query).toHaveBeenCalledWith('SELECT * FROM users WHERE email = $1', [userCredentials.email]);
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('Deve retornar status 401 se a senha estiver incorreta', async () => {
      const userCredentials = { email: 'teste@exemplo.com', senha: 'senhaIncorreta' };
      const userInDb = { id: 'idDoUsuario123', nome: 'Usuário de Teste', email: 'teste@exemplo.com', senha: 'senhaHashGerada', foto_url: null };

      // Simula que o usuário é encontrado, mas a senha está incorreta
      pool.default.query.mockResolvedValueOnce({ rows: [userInDb] });
      bcrypt.compare.mockResolvedValueOnce(false);

      const res = await request(app).post('/api/auth/login').send(userCredentials);

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Senha incorreta');
      expect(pool.default.query).toHaveBeenCalledWith('SELECT * FROM users WHERE email = $1', [userCredentials.email]);
      expect(bcrypt.compare).toHaveBeenCalledWith(userCredentials.senha, userInDb.senha);
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('Deve retornar status 500 em caso de erro interno do servidor durante o login', async () => {
      const userCredentials = { email: 'erro@exemplo.com', senha: 'senha123' };

      // Simula um erro no banco de dados
      pool.default.query.mockRejectedValueOnce(new Error('Erro no banco de dados'));

      const res = await request(app).post('/api/auth/login').send(userCredentials);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('message', 'Erro no servidor');
    });
  });
});
