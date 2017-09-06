import * as mongoose from 'mongoose';
import { RepositoryBase } from './repositoryBase';
import { Mockgoose } from 'mockgoose';

const mockgoose = new Mockgoose(mongoose);

export abstract class UnitOfWorkBase {

  isInMemory = false;

  private addArr: mongoose.Document[] = [];
  private removeArr: mongoose.Document[] = [];
  private updateArr: mongoose.Document[] = [];

  add<T extends mongoose.Document>(entity: T) {
    this.addArr.push(entity);
  }

  remove<T extends mongoose.Document>(entity: T) {
    this.removeArr.push(entity);
  }

  update<T extends mongoose.Document>(entity: T) {
    this.updateArr.push(entity);
  }

  saveChange() {
    const promiseArr: Promise<void>[] = [];
    this.addArr.forEach((a: any) => {
      const p = new Promise<void>((resolve, reject) => {

        a.save((err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });

      });

      promiseArr.push(p);
    });

    this.removeArr.forEach((a: any) => {
      const p = new Promise<void>((resolve, reject) => {

        a.remove((err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });

      });

      promiseArr.push(p);
    });

    this.updateArr.forEach((a: any) => {
      const p = new Promise<void>((resolve, reject) => {

        a.save((err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });

      });

      promiseArr.push(p);
    });

    const p = new Promise<void>(async (resolve, reject) => {

      try {
        for (const item of promiseArr) {
          await item;
        }
        resolve();
      } catch (err) {
        reject(err);
      }

    });

    return p;
  }

  async connect(connectionString: string) {
    (mongoose as any).Promise = global.Promise;
    let conString = connectionString;
    const options = {
      useMongoClient: true,
      poolSize: 5,
      promiseLibrary: global.Promise,
    };

    if (this.isInMemory) {
      conString = 'xxx';
      await mockgoose.prepareStorage();
    }

    await new Promise<void>((resolve, reject) => {
      mongoose.connect(conString, options, (err) => {
        if (err) {
          reject(err);
          return;
        }
        // console.log("success to connect the db..")
        resolve();
      });
    });
  }

  async close() {

    if (this.isInMemory)
      await mockgoose.helper.reset();

    await new Promise<void>((resolve, reject) => {

      mongoose.disconnect((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });

    });

  }

  async reset() {

    if (!this.isInMemory)
      throw new Error('please set the property "isInMemory" to true');

    await mockgoose.helper.reset();

  }

}
