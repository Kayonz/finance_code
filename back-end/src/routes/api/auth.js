import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../../controllers/authControllers.js';
import { verifyToken } from '../middleware/index.js';
import upload from '../../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/register', (req, res) => registerUser(req, res));

router.post('/login', (req, res) => loginUser(req, res));

router.get('/me', verifyToken, (req, res) => getUserProfile(req, res));

router.patch('/me', verifyToken, upload.single('fotoPerfil'), (req, res) => updateUserProfile(req, res));

export default router;