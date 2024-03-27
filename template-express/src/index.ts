import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getUserHandler } from './controllers/user';
import { ErrorMiddleware } from './middlewares/ErrorMiddleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Add your routes and middleware here
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/user/', getUserHandler);

app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
