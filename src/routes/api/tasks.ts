import express, { Request, Response, Router, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const router: Router = express.Router();
const prisma = new PrismaClient();

// Status Code Meaning
// 200 - ok
// 201 - created
// 204 - succesful, no Content
// 404 - not found
// 500 - internal server error  

// Get all tasks
router.get('/', async (req: Request, res: Response) => {
  try {
    console.log('GET tasks request received');
  
    const tasks = await prisma.task.findMany({
      orderBy: { updatedAt: 'desc' }, // Tasks received sorted by updatedAt in descending order
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Fetch tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get task by ID
router.get('/edit/:id', (async (
  req,
  res
) => {
  try {
    console.log('GET task by Id request received');

    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    console.error('Get task by ID error:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
}) as RequestHandler); 

// Create task
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, color } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        color: color || 'red', // Default color is red if not provided
        updatedAt: new Date(), // Set updatedAt to the current date and time
      },
    });
    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update task
router.put('/edit/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, color, completed } = req.body;

    const data: any = { title, color, completed };

    // Conditionally add updatedAt if title or color is being updated. UpdatedAt is not updated when completed status is updated.
    if (title !== undefined || color !== undefined) {
      data.updatedAt = new Date();
    }

    const task = await prisma.task.update({
      where: { id: Number(id) },
      data,
    });

    res.status(200).json(task);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete task
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});



export default router; 