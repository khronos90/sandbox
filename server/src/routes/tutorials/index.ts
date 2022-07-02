import express from 'express';
import { TutorialController } from '../../controllers';
import { ITutorialInput } from '../../db/models/tutorial';
import { TypedRequestBody } from '../../types/types';

const router = express.Router();

router.get('/', async (req, res) => {
  const tutorials = await TutorialController.getTutorials();
  res.send(tutorials);
});

router.get('/:id', async (req, res) => {
  const tutorial = await TutorialController.getTutorial(req.params.id);
  res.send(tutorial);
});

router.post('/', async (req, res) => {
  const tutorial: ITutorialInput = req.body;
  const newTutorial = await TutorialController.createTutorial(tutorial);
  res.send(newTutorial);
});

router.put('/:id', async (req: TypedRequestBody<ITutorialInput>, res) => {
  const tutorial: ITutorialInput = req.body;
  const newTutorial = await TutorialController.updateTutorial(req.params.id, tutorial);
  res.send(newTutorial);
});

router.delete('/mass_delete/', async (req, res) => {
  await TutorialController.deleteAllTutorials();
  res.send('bye all');
});

router.delete('/:id', async (req, res) => {
  await TutorialController.deleteTutorial(req.params.id);
  res.send('deleted');
});

export default router;
