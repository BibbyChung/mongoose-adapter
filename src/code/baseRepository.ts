/// <reference path="./../../typings/index.d.ts" />

import * as mongoose from "mongoose";
import {IUnitOfWork} from "./IUnitOfWork";

export abstract class BaseRepository<T extends mongoose.Document> {

	abstract getDocumentName(): string;

	abstract getSchema(): mongoose.Schema;

	constructor(public unitOfWork: IUnitOfWork) { }

	createNewEntity(): T {
		return new (this.getAll())(null);
	}

	getAll(): mongoose.Model<T> {

		let documentName = this.getDocumentName();
		let schema = this.getSchema();
		try {
			return mongoose.model<T>(documentName, schema, documentName);
		} catch (ex) {
			return mongoose.model<T>(documentName, null, documentName);
		}

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

}
