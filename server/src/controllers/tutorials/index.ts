import { Request, Response } from 'express';
import Tutorial, { ITutorialInput } from '../../db/models/tutorial';
import { ErrorMessage, TypedRequestBody } from '../../types/types';
import { sanitizeUrl } from '@braintree/sanitize-url';

export class TutorialController {
  static async getTutorials(req: Request, res: Response) {
    let tutorials: Tutorial[];
    try {
      tutorials = await Tutorial.findAll();
      return res.send(tutorials);
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  static async getTutorial({ params }: Request, res: Response) {
    let tutorial: Tutorial | null;
    try {
      tutorial = await Tutorial.findByPk(params.id);
      if (tutorial === null) {
        return res.status(404);
      } else {
        return res.send(tutorial);
      }
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  static async createTutorial({ body }: TypedRequestBody<ITutorialInput>, res: Response) {
    const tutorial: ITutorialInput = body;
    let newTutorial: Tutorial | null;
    const errors = TutorialController.validateBody(tutorial);
    if (errors.length) {
      return res.status(400).send(errors);
    }
    try {
      newTutorial = await Tutorial.create(tutorial);
      return res.status(201).send(newTutorial);
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  static async deleteTutorial({ params }: Request, res: Response) {
    const tutorial = await Tutorial.findByPk(params.id);
    if (!tutorial) {
      return res.status(404).send({ attribute: 'id', message: `No tutorial found with id ${params.id}` });
    }
    try {
      tutorial?.destroy();
      return res.send(`Tutorial ${params.id} deleted`);
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  static async updateTutorial({ params, body }: TypedRequestBody<ITutorialInput>, res: Response) {
    const tutorial: ITutorialInput = body;
    const tutorialToUpdate = await Tutorial.findByPk(params.id);
    if (!tutorialToUpdate) {
      return res.status(404).send({ attribute: 'id', message: `No tutorial found with id ${params.id}` });
    }
    try {
      tutorialToUpdate?.update(tutorial);
      return res.status(201).send(tutorialToUpdate);
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  static deleteAllTutorials(req: Request, res: Response) {
    try {
      Tutorial.destroy({
        where: {},
        truncate: true,
      });
      return res.send('Tutorials deleted');
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  private static validateBody({ published, title, videoUrl }: ITutorialInput): ErrorMessage[] {
    const error: ErrorMessage[] = [];
    if (published === undefined) {
      error.push({ attribute: 'published', message: 'Published attribute is required' });
    }
    if (!title) {
      error.push({ attribute: 'title', message: 'Title attribute is required' });
    }
    if (videoUrl) {
      const sanitizedUrl = sanitizeUrl(videoUrl);
      if (!sanitizedUrl || sanitizedUrl === 'about:blank') {
        error.push({ attribute: 'videoUrl', message: 'Video url is not a valid url' });
      }
    }
    return error;
  }
}
