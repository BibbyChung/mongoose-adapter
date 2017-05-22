
import * as mongoose from 'mongoose';
import { UnitOfWorkBase } from './unitOfWorkBase';

export abstract class RepositoryBase<T extends mongoose.Document> {

  abstract getCollectionName(): string;

  abstract getSchema(): mongoose.Schema;

  private model: mongoose.Model<T>;

  constructor(private unitOfWork: UnitOfWorkBase) { }

  private initSchemaDefinition() {

    const collectionName = this.getCollectionName();
    try {
      this.model = mongoose.model<T>(collectionName, this.getSchema(), collectionName);
    } catch (ex) {
      this.model = mongoose.model<T>(collectionName, null, collectionName);
    }

  }

  createNewEntity(): T {

    return new (this.getAll())(null);

  }

  getAll(): mongoose.Model<T> {

    if (this.model === undefined)
      this.initSchemaDefinition();

    return this.model;

  }

}

