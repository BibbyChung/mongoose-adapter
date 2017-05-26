
import { UnitOfWorkBase } from './unitOfWorkBase';
import * as mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';

const mockgoose = new Mockgoose(mongoose);

export class UnitOfWorkInMemory {

  constructor(private unitOfWork: UnitOfWorkBase) { }

  add<T extends mongoose.Document>(entity: T) {
    this.unitOfWork.add(entity);
  }

  remove<T extends mongoose.Document>(entity: T) {
    this.unitOfWork.remove(entity);
  }

  update<T extends mongoose.Document>(entity: T) {
    this.unitOfWork.update(entity);
  }

  saveChange() {
    return this.unitOfWork.saveChange();
  }

  async connect() {
    await mockgoose.prepareStorage();
    await this.unitOfWork.connect('xxx');
  }

  async	close() {
    await mockgoose.helper.reset();
    await this.unitOfWork.close();
  }

  async reset() {
    await mockgoose.helper.reset();
  }

}
