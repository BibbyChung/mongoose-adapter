import * as mongoose from 'mongoose';
import { RepositoryBase } from './repositoryBase';

export abstract class UnitOfWorkBase {

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

  saveChangeAsync() {

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

  connectAsync(connectionString: string) {

    (mongoose as any).Promise = global.Promise;

    const p = new Promise<void>((resolve, reject) => {

      mongoose.connect(connectionString, {
        server: {
          poolSize: 5,
        },
      // tslint:disable-next-line:align
      }, (err) => {
        if (err) {
          reject(err);
          return;
        }
        // console.log("success to connect the db..")
        resolve();

      });

    });
    return p;

  }

  closeAsync() {

    const p = new Promise<void>((resolve, reject) => {
      mongoose.disconnect((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
    return p;

  }

}
