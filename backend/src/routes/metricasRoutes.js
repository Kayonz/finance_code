import express from 'express';
import { getMetricasFinanceiras } from '../controllers/metricasController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router( );

router.get(
  '/',
  verifyToken,
  getMetricasFinanceiras
);

export default router;