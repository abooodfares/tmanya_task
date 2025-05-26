import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import podcastRouter from './routing/podcastroute';
import { connectDB } from './config/database';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());

// Routes
app.use('/podcast', podcastRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Express + TypeScript API' });
});

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});










