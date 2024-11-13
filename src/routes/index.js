import { Router } from 'express';
import userRouter from './../routes/users.js';
import loginRouter from "./../routes/auth/login.js";
import logoutRouter from "./../routes/auth/logout.js";

const router = Router();

router.use('/api/v1', userRouter);
router.use('/api/v1', loginRouter);
router.use('/api/v1', logoutRouter);

export default router;
