/// <reference path="./../../typings/index.d.ts" />

import * as mongoose from "mongoose";
import {UnitOfWorkBase} from "./unitOfWorkBase";

export abstract class RepositoryBase<T extends mongoose.Document> {

	abstract getDocumentName(): string;

	abstract getSchema(): mongoose.Schema;

	private _model: mongoose.Model<T>;

	constructor(private unitOfWork: UnitOfWorkBase) {

		this.initSchemaDefinition();

	}

	private initSchemaDefinition() {

		let documentName = this.getDocumentName();
		try {
			this._model = mongoose.model<T>(documentName, this.getSchema(), documentName);
		} catch (ex) {
			this._model = mongoose.model<T>(documentName, null, documentName);
		}

	}

	createNewEntity(): T {

		return new (this.getAll())(null);

	}

	getAll(): mongoose.Model<T> {

		return this._model;

	}

}

