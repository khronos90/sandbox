import { DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';

interface ITutorial {
  id: string;
  title: string;
  videoUrl?: string;
  description?: string;
  published: boolean;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ITutorialInput extends Optional<ITutorial, 'id'> {}

export interface ITutorialOutput extends Required<ITutorial> {}

class Tutorial extends Model<ITutorial, ITutorialInput> implements ITutorial {
  declare id: string;
  declare title: string;
  declare videoUrl?: string;
  declare description?: string;
  declare published: boolean;
  declare deleted?: boolean;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare deletedAt?: Date;
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
    sequelize: sequelize,
    modelName: 'Tutorial',
    paranoid: true,
    timestamps: true,
  },
);

export default Tutorial;
