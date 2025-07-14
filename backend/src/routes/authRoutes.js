
import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/authControllers.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js'; 

const router = express.Router();

// --- MUDANÇA PRINCIPAL ---
// Envolvemos cada chamada de controller em uma arrow function.
// Isso garante que apenas (req, res, next) sejam passados, forçando
// os controllers a usarem as dependências padrão (pool, bcrypt, jwt).

router.post('/register', (req, res) => registerUser(req, res));

router.post('/login', (req, res) => loginUser(req, res));

router.get('/me', verifyToken, (req, res) => getUserProfile(req, res));

router.patch('/me', verifyToken, upload.single('fotoPerfil'), (req, res) => updateUserProfile(req, res));

export default router;