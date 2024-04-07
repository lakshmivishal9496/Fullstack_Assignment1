import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectDB } from './db.js';
import recipeRoutes from './routes/recipeRoutes.js';

// Setup __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectDB();

const app = express();

app.use(express.json());
app.use(express.static('static')); // Serve static files

app.use('/api/recipes', recipeRoutes);

app.get('/home', (req, res) => {
    console.log('Serving recipes.html from:', path.join(__dirname, 'static', 'recipes.html'));
    res.sendFile(path.join(__dirname, 'static', 'recipes.html'));
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
