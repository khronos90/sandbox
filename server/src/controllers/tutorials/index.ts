import { Request, Response } from 'express';
import Tutorial, { ITutorialInput } from '../../db/models/tutorial';
import { TypedRequestBody } from '../../types/types';

export class TutorialController {
  static async getTutorials(req: Request, res: Response) {
    const tutorials = await Tutorial.findAll();
    res.send(tutorials);
  }

  static async getTutorial(req: Request, res: Response) {
    const tutorial = await Tutorial.findByPk(req.params.id);
    res.send(tutorial);
  }

  static async createTutorial(req: TypedRequestBody<ITutorialInput>, res: Response) {
    const tutorial: ITutorialInput = req.body;
    const newTutorial = await Tutorial.create(tutorial);
    res.send(newTutorial);
  }

  static async deleteTutorial(req: Request, res: Response): Promise<void> {
    const tutorial = await Tutorial.findByPk(req.params.id);
    tutorial?.destroy();
    res.send('deleted');
  }

  static async updateTutorial(req: TypedRequestBody<ITutorialInput>, res: Response) {
    const tutorial: ITutorialInput = req.body;
    const tutorialToUpdate = await Tutorial.findByPk(req.params.id);
    tutorialToUpdate?.update(tutorial);
    res.send(tutorialToUpdate);
  }

  static deleteAllTutorials(req: Request, res: Response) {
    Tutorial.destroy({
      where: {},
      truncate: true,
    });
    res.send('DELETED');
  }
}
