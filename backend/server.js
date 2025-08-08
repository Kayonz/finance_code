// backend/src/server.js

import app from './app.js'; // Importa o app configurado
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente

const PORT = process.env.PORT || 5000;

// Apenas este arquivo deve ter o app.listen()
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});
// Comentário de testes para pull-request