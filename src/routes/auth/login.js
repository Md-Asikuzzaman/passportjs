import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err); // Handle server errors
    }

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Authentication failed', error: info });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err); // Handle login errors
      }
      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
});

export default router;
