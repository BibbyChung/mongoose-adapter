/// <reference path="./../../typings/index.d.ts" />

import * as mongoose from "mongoose";
import { UnitOfWorkBase } from "./unitOfWorkBase";

export abstract class RepositoryBase<T extends mongoose.Document> {

	abstract getCollectionName(): string;

	abstract getSchema(): mongoose.Schema;

	private _model: mongoose.Model<T>;

	constructor(private unitOfWork: UnitOfWorkBase) { }

	private initSchemaDefinition() {

		let collectionName = this.getCollectionName();
		try {
			this._model = mongoose.model<T>(collectionName, this.getSchema(), collectionName);
		} catch (ex) {
			this._model = mongoose.model<T>(collectionName, null, collectionName);
		}

	}

	createNewEntity(): T {

		return new (this.getAll())(null);

	}

	getAll(): mongoose.Model<T> {

		if (this._model == undefined)
			this.initSchemaDefinition();

		return this._model;

	}

}

