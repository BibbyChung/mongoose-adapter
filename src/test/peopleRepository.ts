/// <reference path="./../../typings/index.d.ts" />

import * as mongoose from "mongoose";
import {BaseRepository, IUnitOfWork} from "./../main";

export class PeopleRepository extends BaseRepository<IPeople> {

	constructor(unitOfWork: IUnitOfWork) {
		super(unitOfWork);
	}

	getDocumentName() {
		return "People";
	}

	getSchema() {

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