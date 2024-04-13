import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectDB } from './db.js';
import recipeRoutes from './routes/recipeRoutes.js';
import cors from 'cors';
// Setup __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('static')); 

app.use('/api/recipes', recipeRoutes);

app.get('/home', (req, res) => {
    console.log('Serving index.html from:', path.join(__dirname, 'static', 'index.html'));
    res.sendFile(path.join(__dirname, 'static', 'recipes.html'));
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
