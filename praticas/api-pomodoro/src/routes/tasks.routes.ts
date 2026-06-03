import { Router } from 'express';
import { prisma } from '../lib/prisma';

const tasksRoutes = Router();

tasksRoutes.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany({
    orderBy: {
      startDate: 'desc'
    }
  });

  const formattedTasks = tasks.map(task => ({
    ...task,
    startDate: task.startDate.toString(),
    completeDate: task.completeDate?.toString() || null,
    interruptDate: task.interruptDate?.toString() || null
  }));

  return res.json(formattedTasks);
});

tasksRoutes.post('/', async (req, res) => {
  const task = await prisma.task.create({
    data: req.body
  });

  return res.json({
    ...task,
    startDate: task.startDate.toString(),
    completeDate: task.completeDate?.toString() || null,
    interruptDate: task.interruptDate?.toString() || null
  });
});

tasksRoutes.patch('/:id/complete', async (req, res) => {
  const { id } = req.params;
  const { completeDate } = req.body;

  const task = await prisma.task.update({
    where: {
      id
    },
    data: {
      completeDate
    }
  });

  return res.json({
    ...task,
    startDate: task.startDate.toString(),
    completeDate: task.completeDate?.toString() || null,
    interruptDate: task.interruptDate?.toString() || null
  });
});

tasksRoutes.patch('/:id/interrupt', async (req, res) => {
  const { id } = req.params;
  const { interruptDate } = req.body;

  const task = await prisma.task.update({
    where: {
      id
    },
    data: {
      interruptDate
    }
  });

  return res.json({
    ...task,
    startDate: task.startDate.toString(),
    completeDate: task.completeDate?.toString() || null,
    interruptDate: task.interruptDate?.toString() || null
  });
});

tasksRoutes.delete('/', async (req, res) => {
  await prisma.task.deleteMany();

  return res.json({
    message: 'Tasks removidas'
  });
});

export { tasksRoutes };