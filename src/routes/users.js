import { Router } from 'express';
import { prisma } from '../db/db.js';
const router = Router();

router.get('/users', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.json({ message: 'not authenticated...' });
  }

  const users = await prisma.user.findMany();
  res.json({ users });
});

// General route

router.get('/', (req, res) => {
  res.json({ message: 'home page' });
});
export default router;
