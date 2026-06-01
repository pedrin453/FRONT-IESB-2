import { Router } from 'express';
import { prisma } from '../lib/prisma';

const settingsRoutes = Router();

settingsRoutes.get('/', async (req, res) => {
  let settings = await prisma.settings.findFirst();

  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        id: 1,
        workTime: 25,
        shortBreakTime: 5,
        longBreakTime: 15
      }
    });
  }

  return res.json(settings);
});

settingsRoutes.put('/', async (req, res) => {
  const { workTime, shortBreakTime, longBreakTime } = req.body;

  const settings = await prisma.settings.update({
    where: {
      id: 1
    },
    data: {
      workTime,
      shortBreakTime,
      longBreakTime
    }
  });

  return res.json(settings);
});

export { settingsRoutes };