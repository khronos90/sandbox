import express from 'express';
import tutorialRouter from './tutorials';

const router = express.Router();

router.use('/tutorials', tutorialRouter);

export default router;
