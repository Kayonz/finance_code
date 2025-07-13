import request from 'supertest';
import app from '../app.js';
import pool from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock do pool de conexão com o banco de dados
jest.mock('../config/database.js', () => ({
  query: jest.fn(),
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

describe('authControllers', () => {
  beforeEach(() => {
    // Limpa os mocks antes de cada teste
    pool.query.mockClear();
    bcrypt.hash.mockClear();
    bcrypt.compare.mockClear();
    jwt.sign.mockClear();
  });

  describe('registerUser', () => {
    it('should register a new user and return a token', async () => {
      const newUser = { nome: 'Test User', email: 'test@example.com', senha: 'password123' };
      const hashedPassword = 'hashedPassword123';
      const userId = '123';
      const token = 'mockedToken';

      pool.query.mockResolvedValueOnce({ rows: [] }); // Email não existe
      bcrypt.hash.mockResolvedValueOnce(hashedPassword);
      pool.query.mockResolvedValueOnce({ rows: [{ id: userId, nome: newUser.nome, email: newUser.email, foto_url: null }] }); // Usuário inserido
      pool.query.mockResolvedValue({ rows: [] }); // Para as categorias padrão
      jwt.sign.mockReturnValue(token);

      const res = await request(app).post('/api/auth/register').send(newUser);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token', token);
      expect(res.body.user).toHaveProperty('id', userId);
      expect(pool.query).toHaveBeenCalledWith('SELECT id FROM users WHERE email = $1', [newUser.email]);
      expect(bcrypt.hash).toHaveBeenCalledWith(newUser.senha, 10);
      expect(pool.query).toHaveBeenCalledWith(
        'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email, foto_url',
        [newUser.nome, newUser.email, hashedPassword]
      );
      expect(jwt.sign).toHaveBeenCalledWith({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    });

    it('should return 400 if email already exists', async () => {
      const existingUser = { nome: 'Existing User', email: 'existing@example.com', senha: 'password123' };

      pool.query.mockResolvedValueOnce({ rows: [{ id: '456' }] }); // Email já existe

      const res = await request(app).post('/api/auth/register').send(existingUser);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Email já cadastrado');
      expect(pool.query).toHaveBeenCalledWith('SELECT id FROM users WHERE email = $1', [existingUser.email]);
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('should return 500 if there is a server error during registration', async () => {
      const newUser = { nome: 'Error User', email: 'error@example.com', senha: 'password123' };

      pool.query.mockRejectedValueOnce(new Error('Database error')); // Simula erro no banco

      const res = await request(app).post('/api/auth/register').send(newUser);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('message', 'Erro no servidor');
    });
  });

  describe('loginUser', () => {
    it('should login a user and return a token', async () => {
      const userCredentials = { email: 'test@example.com', senha: 'password123' };
      const userInDb = { id: '123', nome: 'Test User', email: 'test@example.com', senha: 'hashedPassword123', foto_url: null };
      const token = 'mockedToken';

      pool.query.mockResolvedValueOnce({ rows: [userInDb] });
      bcrypt.compare.mockResolvedValueOnce(true);
      jwt.sign.mockReturnValue(token);

      const res = await request(app).post('/api/auth/login').send(userCredentials);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token', token);
      expect(res.body.user).toHaveProperty('id', userInDb.id);
      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM users WHERE email = $1', [userCredentials.email]);
      expect(bcrypt.compare).toHaveBeenCalledWith(userCredentials.senha, userInDb.senha);
      expect(jwt.sign).toHaveBeenCalledWith({ id: userInDb.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    });

    it('should return 401 if user not found', async () => {
      const userCredentials = { email: 'nonexistent@example.com', senha: 'password123' };

      pool.query.mockResolvedValueOnce({ rows: [] });

      const res = await request(app).post('/api/auth/login').send(userCredentials);

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Usuário não encontrado');
      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM users WHERE email = $1', [userCredentials.email]);
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('should return 401 if password is incorrect', async () => {
      const userCredentials = { email: 'test@example.com', senha: 'wrongpassword' };
      const userInDb = { id: '123', nome: 'Test User', email: 'test@example.com', senha: 'hashedPassword123', foto_url: null };

      pool.query.mockResolvedValueOnce({ rows: [userInDb] });
      bcrypt.compare.mockResolvedValueOnce(false);

      const res = await request(app).post('/api/auth/login').send(userCredentials);

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Senha incorreta');
      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM users WHERE email = $1', [userCredentials.email]);
      expect(bcrypt.compare).toHaveBeenCalledWith(userCredentials.senha, userInDb.senha);
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('should return 500 if there is a server error during login', async () => {
      const userCredentials = { email: 'error@example.com', senha: 'password123' };

      pool.query.mockRejectedValueOnce(new Error('Database error'));

      const res = await request(app).post('/api/auth/login').send(userCredentials);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('message', 'Erro no servidor');
    });
  });
});

