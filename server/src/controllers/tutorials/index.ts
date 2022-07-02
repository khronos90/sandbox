import Tutorial, { ITutorialInput, ITutorialOutput } from '../../db/models/tutorial';

export class TutorialController {
  static async getTutorials(): Promise<Tutorial[]> {
    const tutorials = await Tutorial.findAll();
    return tutorials;
  }

  static async getTutorial(id: string): Promise<Tutorial | null> {
    const tutorial = await Tutorial.findByPk(id);
    return tutorial;
  }

  static async createTutorial(tutorial: ITutorialInput): Promise<Tutorial> {
    const newTutorial = await Tutorial.create(tutorial);
    return newTutorial;
  }

  static async deleteTutorial(id: string): Promise<void> {
    const tutorial = await Tutorial.findByPk(id);
    return tutorial?.destroy();
  }

  static async updateTutorial(id: string, tutorial: ITutorialInput): Promise<Tutorial | null> {
    const tutorialToUpdate = await Tutorial.findByPk(id);
    tutorialToUpdate?.update(tutorial);
    return tutorialToUpdate;
  }

  static deleteAllTutorials() {
    Tutorial.destroy({
      where: {},
      truncate: true,
    });
  }
}
