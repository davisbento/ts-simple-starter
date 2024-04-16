import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { buildUserController } from './controllers/user';
import { prismaClient } from './libs/prisma';
import { errorMiddleware } from './middlewares/error-middleware';

dotenv.config();

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Add your routes and middleware here
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/user', buildUserController(router));

app.use(errorMiddleware);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    prismaClient.$connect();
    console.log('Database connected');
  } catch (e) {
    console.log('Database connection failed due to: ', e);
  }
});
