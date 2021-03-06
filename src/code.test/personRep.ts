import * as mongoose from 'mongoose';
import { UnitOfWorkBase } from './../code/unitOfWorkBase';
import { RepositoryBase } from './../code/repositoryBase';

export class PersonRep extends RepositoryBase<IPerson> {

  constructor(unitOfWork: UnitOfWorkBase) {
    super(unitOfWork);
  }

  getCollectionName() {
    return 'Person';
  }

  getSchema(): mongoose.Schema {

    const userSchema = {
      _id: { type: String, index: { unique: true } },
      name: { type: String },
      age: { type: Number },
      birthday: { type: Date },
    };
    const s = new mongoose.Schema(userSchema);
    return s;

  }

}

export interface IPerson extends mongoose.Document {
  _id: string;
  name: string;
  age: number;
  birthday: Date;
}
