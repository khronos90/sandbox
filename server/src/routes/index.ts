import express from 'express';
import tutorialRouter from './tutorials';

const router = express.Router();

router.get('/health', (req, res) => {
  res.sendStatus(200);
});
router.use('/tutorials', tutorialRouter);

export default router;
