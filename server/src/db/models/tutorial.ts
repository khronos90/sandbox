import { DataTypes, Model } from 'sequelize';
import { db } from '..';

class Tutorial extends Model {
  declare id: string;
  declare title: string;
  declare videoUrl?: string;
  declare description?: string;
  declare published: boolean;
  declare deleted?: boolean;
}

Tutorial.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    videoUrl: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize: db.sequelize,
    modelName: 'Tutorial',
  },
);

export default Tutorial;

// the defined model is the class itself
console.log(Tutorial === db.sequelize.models.User); // true
