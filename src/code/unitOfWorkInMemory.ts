
import { UnitOfWorkBase } from "./unitOfWorkBase";
import * as mongoose from "mongoose";
let mockgoose = require("mockgoose");

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

	saveChangeAsync() {

		return this.unitOfWork.saveChangeAsync();

	}

	connectAsync() {

		let p = new Promise<void>((resolve, reject) => {

			mockgoose(mongoose).then(async () => {
				await this.unitOfWork.connectAsync("xxx");
				resolve();
			});

		});
		return p;

	}

	closeAsync() {

		let p = new Promise<void>((resolve, reject) => {

			mockgoose.reset(async () => {
				await this.unitOfWork.closeAsync();
				resolve();
			});

		});
		return p;

	}

	resetAsync() {

		let p = new Promise<void>((resolve, reject) => {
			mockgoose.reset(() => {
				resolve();
			});
		});
		return p;

	}

}