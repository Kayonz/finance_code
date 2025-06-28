  import pool from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registro
export const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    console.log('Iniciando registro de usuário para:', email);

    const exist = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (exist.rows.length > 0) {
      console.log('Email já cadastrado:', email);
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const hashedSenha = await bcrypt.hash(senha, 10);
    console.log('Senha hash gerada.');

    const result = await pool.query(
      'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email, foto_url',
      [nome, email, hashedSenha]
    );

    const user = result.rows[0];
    console.log('Usuário registrado com ID:', user.id);

    // Criação de categorias padrão para o novo usuário
    const defaultCategories = [
      { nome: 'Alimentação', limite: 0 },
      { nome: 'Transporte', limite: 0 },
      { nome: 'Lazer', limite: 0 },
      { nome: 'Mercado', limite: 0 },
      { nome: 'Saúde', limite: 0 },
      { nome: 'Produtos Online', limite: 0 },
      { nome: 'Pix para pessoas', limite: 0 },
      { nome: 'Academia', limite: 0 },
    ];

    console.log('Iniciando criação de categorias padrão para o usuário:', user.id);
    for (const category of defaultCategories) {
      try {
        await pool.query(
          'INSERT INTO categorias (usuario_id, nome, limite) VALUES ($1, $2, $3)',
          [user.id, category.nome, category.limite]
        );
        console.log(`Categoria '${category.nome}' criada para o usuário ${user.id}`);
      } catch (catError) {
        console.error(`Erro ao criar categoria '${category.nome}' para o usuário ${user.id}:`, catError);
      }
    }
    console.log('Finalizada tentativa de criação de categorias padrão.');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log('Token JWT gerado para o usuário:', user.id);

    res.status(201).json({ token, user });
  } catch (error) {
    console.error('Erro geral no registro de usuário:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token, user: { id: user.id, nome: user.nome, email: user.email, foto_url: user.foto_url } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Pega perfil do usuário logado
export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await pool.query(
      'SELECT id, nome, email, foto_url FROM users WHERE id = $1',
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Atualiza perfil do usuário logado
export const updateUserProfile = async (req, res) => {
  const userId = req.userId;
  const { nome, email, senha } = req.body;
  const fotoPerfil = req.file; // multer armazena arquivo aqui

  try {
    let hashedSenha = null;
    if (senha) {
      hashedSenha = await bcrypt.hash(senha, 10);
    }

    let query = 'UPDATE users SET nome = $1, email = $2';
    const params = [nome, email];
    let idx = 3;

    if (hashedSenha) {
      query += `, senha = $${idx}`;
      params.push(hashedSenha);
      idx++;
    }

    if (fotoPerfil) {
      query += `, foto_url = $${idx}`;
      params.push(fotoPerfil.filename); 
      idx++;
    }

    query += ` WHERE id = $${idx} RETURNING id, nome, email, foto_url`;
    params.push(userId);

    const result = await pool.query(query, params);

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

