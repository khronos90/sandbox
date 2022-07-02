import express from 'express';
import { TutorialController } from '../../controllers';

const router = express.Router();

router.get('/', TutorialController.getTutorials);

router.get('/:id', TutorialController.getTutorial);

router.post('/', TutorialController.createTutorial);

router.put('/:id', TutorialController.updateTutorial);

router.delete('/mass_delete/', TutorialController.deleteAllTutorials);

router.delete('/:id', TutorialController.deleteTutorial);

export default router;
