
import { UnitOfWorkBase } from './unitOfWorkBase';
import * as mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';

const mockgoose = new Mockgoose(mongoose);

export class UnitOfWorkInMemory {

  constructor(private unitOfWork: UnitOfWorkBase) { }

  static async  initPrepareStorageAsync() {
    await mockgoose.prepareStorage();
  }

  add<T extends mongoose.Document>(entity: T) {
    this.unitOfWork.add(entity);
  }

  remove<T extends mongoose.Document>(entity: T) {
    this.unitOfWork.remove(entity);
  }

  update<T extends mongoose.Document>(entity: T) {
    this.unitOfWork.update(entity);
  }

  saveChangeAsync() {
    return this.unitOfWork.saveChangeAsync();
  }

  async connectAsync() {
    await mockgoose.prepareStorage();
    await this.unitOfWork.connectAsync('xxx');
  }

  async	closeAsync() {
    await mockgoose.helper.reset();
    await this.unitOfWork.closeAsync();
  }

  async resetAsync() {
    await mockgoose.helper.reset();
  }

}
