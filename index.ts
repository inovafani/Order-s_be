import express from 'express';
import tableRoutes from './routes/table.js';
import { table } from 'console';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/table', tableRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
