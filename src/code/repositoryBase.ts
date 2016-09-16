/// <reference path="./../../typings/index.d.ts" />

import * as mongoose from "mongoose";
import {UnitOfWorkBase} from "./unitOfWorkBase";

export abstract class RepositoryBase<T extends mongoose.Document> {

	abstract getDocumentName(): string;

	abstract getSchema(): mongoose.Schema;

	private _schema;

	constructor(private unitOfWork: UnitOfWorkBase) {

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

}