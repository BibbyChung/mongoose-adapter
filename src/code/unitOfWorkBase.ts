/// <reference path="./../../typings/index.d.ts" />

import * as mongoose from "mongoose";
import {RepositoryBase} from "./repositoryBase";

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

		let promiseArr: Promise<void>[] = [];

		this.addArr.forEach((a: any) => {

			let p = new Promise<void>((resolve, reject) => {

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

			let p = new Promise<void>((resolve, reject) => {

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

			let p = new Promise<void>((resolve, reject) => {

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

		let p = new Promise<void>(async (resolve, reject) => {

			try {

				for (let item of promiseArr) {
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

        let p = new Promise<void>((resolve, reject) => {

            mongoose.connect(connectionString, {
                server: {
                    poolSize: 5
                }
            }, (err) => {

                if (err) {
                    reject(err);
                    return;
                }
                //console.log("success to connect the db..")
                resolve();

            });

        });
        return p;

    }

    closeAsync() {

		let p = new Promise<void>((resolve, reject) => {
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