import express from 'express';
import CharactersRouter from './routes/Characters.router.js';
import ItemRouter from './routes/Item.router.js';
import InventoryRouter from './routes/Inventory.router.js';

const app = express();
const PORT = 3017;

app.use(express.json());
app.use('/api', [CharactersRouter, ItemRouter, InventoryRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
