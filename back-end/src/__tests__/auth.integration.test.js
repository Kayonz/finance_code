// src/__tests__/authControllers.test.js

import { jest } from '@jest/globals';
// Importamos as funções reais que queremos testar.
import { registerUser, loginUser } from '../controllers/authControllers.js';

describe('Testes de Unidade: authControllers', () => {
  let mockRequest;
  let mockResponse;
  // Criamos nossos mocks como objetos simples.
  let mockDb, mockBcrypt, mockJwt;

  beforeEach(() => {
    // Limpamos os mocks antes de cada teste para garantir um estado limpo.
    mockRequest = { body: {} };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    // Nossos mocks são objetos com funções jest.fn().
    mockDb = { query: jest.fn() };
    mockBcrypt = { hash: jest.fn(), compare: jest.fn() };
    mockJwt = { sign: jest.fn() };
  });

  describe('registerUser', () => {
    it('deve registrar um usuário, chamar o hash da senha e retornar 201', async () => {
      // 1. Cenário
      mockRequest.body = { nome: 'Teste', email: 'teste@exemplo.com', senha: '123' };
      
      // 2. Configuração do comportamento dos mocks para este cenário
      //    - Checagem de email: retorna vazio (email livre).
      mockDb.query.mockResolvedValueOnce({ rows: [] });
      //    - Hash da senha.
      mockBcrypt.hash.mockResolvedValue('hashed_password');
      //    - Inserção no banco: retorna o novo usuário.
      mockDb.query.mockResolvedValueOnce({ rows: [{ id: 'user1', nome: 'Teste', email: 'teste@exemplo.com' }] });
      //    - Criação de categorias (não precisamos de um retorno específico, o mock padrão serve).
      mockDb.query.mockResolvedValue({ rows: [] });
      //    - Geração do token.
      mockJwt.sign.mockReturnValue('fake_token');

      // 3. Execução: Chamamos a função real, mas injetamos nossos mocks como argumentos.
      await registerUser(mockRequest, mockResponse, mockDb, mockBcrypt, mockJwt);

      // 4. Verificação: O teste agora verifica os NOSSOS objetos mock.
      expect(mockBcrypt.hash).toHaveBeenCalledWith('123', 10);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({ token: 'fake_token' }));
    });

    it('deve retornar 400 se o email já existir', async () => {
        // 1. Cenário
        mockRequest.body = { nome: 'Existente', email: 'existente@exemplo.com', senha: '123' };

        // 2. Configuração do mock: a primeira query ao banco retorna um usuário.
        mockDb.query.mockResolvedValueOnce({ rows: [{ id: 'user-existente' }] });

        // 3. Execução
        await registerUser(mockRequest, mockResponse, mockDb, mockBcrypt, mockJwt);

        // 4. Verificação
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Email já cadastrado' });
        // Garante que o resto do processo não continuou
        expect(mockBcrypt.hash).not.toHaveBeenCalled();
    });
  });

  describe('loginUser', () => {
    it('deve fazer o login com sucesso para um usuário válido', async () => {
        // 1. Cenário
        mockRequest.body = { email: 'teste@exemplo.com', senha: '123' };
        const userInDb = { id: 'user1', senha: 'hashed_password' };

        // 2. Configuração dos mocks
        mockDb.query.mockResolvedValue({ rows: [userInDb] });
        mockBcrypt.compare.mockResolvedValue(true); // Senha corresponde
        mockJwt.sign.mockReturnValue('fake_token');

        // 3. Execução com injeção de mocks
        await loginUser(mockRequest, mockResponse, mockDb, mockBcrypt, mockJwt);

        // 4. Verificação
        expect(mockBcrypt.compare).toHaveBeenCalledWith('123', 'hashed_password');
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({ token: 'fake_token' }));
    });
  });
});
