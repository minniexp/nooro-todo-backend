import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import taskRoutes from './routes/api/tasks';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Test database connection
prisma
  .$connect()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error: any) => {
    console.error('Database connection failed:', error);
  });

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  console.log('Health check endpoint hit');
  res.json({ status: 'API is running smoothly' });
});

// Routes
app.use('/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
