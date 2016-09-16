/// <reference path="./../../typings/index.d.ts" />

import * as mongoose from "mongoose";
import {IUnitOfWork} from "./../code/IUnitOfWork";
import {BaseRepository} from "./../code/baseRepository";

export class PeopleRepository extends BaseRepository<IPeople> {

	constructor(unitOfWork: IUnitOfWork) {
		super();
		this.unitOfWork = unitOfWork;
	}

	getDocumentName() {
		return "People";
	}

	getSchema(): mongoose.Schema {

		let userSchema = {
			_id: { type: String, index: { unique: true } },
			name: { type: String },
			age: { type: Number },
			birthday: { type: Date }
		};
		let s = new mongoose.Schema(userSchema);
		return s;

	}

}

export interface IPeople extends mongoose.Document {
	_id: string;
	name: string,
	age: number,
	birthday: Date
}