import app from './app.js';
import db from "./config/database.js";

const PORT = process.env.PORT || 5000;

( async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected successfully!');
    
    app.listen(PORT, () => {
      console.log(`Server listening in port: ${PORT}`);
    });
  } catch (err) {
    console.error('Error conecting database:', err);
    process.exit(1);
  }
} )();