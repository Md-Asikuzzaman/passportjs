import { Router } from 'express';
const router = Router();

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/api/v1');
  });
});

export default router;
