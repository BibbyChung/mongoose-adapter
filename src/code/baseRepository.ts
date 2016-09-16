/// <reference path="./../../typings/index.d.ts" />

import * as mongoose from "mongoose";
import {IUnitOfWork} from "./IUnitOfWork";

export abstract class BaseRepository<T extends mongoose.Document> {

	abstract getDocumentName(): string;

	abstract getSchema(): mongoose.Schema;

	private _schema;

	private _unitOfWork: IUnitOfWork;
	set unitOfWork(value) {
		this._unitOfWork = value;
	}
	get unitOfWork() {
		return this._unitOfWork;
	}

	constructor() {

		this.initSchemaDefinition();

	}

	private initSchemaDefinition() {

		this._schema = this.getSchema();

	}

	createNewEntity(): T {

		return new (this.getAll())(null);

	}

	getAll(): mongoose.Model<T> {

		let documentName = this.getDocumentName();
		try {
			return mongoose.model<T>(documentName, this._schema, documentName);
		} catch (ex) {
			return mongoose.model<T>(documentName, null, documentName);
		}

	}

	add<T extends mongoose.Document>(entity: T) {

		this._unitOfWork.add(entity);

	}

	remove<T extends mongoose.Document>(entity: T) {

		this._unitOfWork.remove(entity);

	}

	update<T extends mongoose.Document>(entity: T) {

		this._unitOfWork.update(entity);

	}

}
