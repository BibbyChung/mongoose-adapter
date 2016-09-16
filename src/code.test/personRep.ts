/// <reference path="./../../typings/index.d.ts" />

import * as mongoose from "mongoose";
import {UnitOfWorkBase} from "./../code/unitOfWorkBase";
import {BaseRepository} from "./../code/baseRepository";

export class PersonRep extends BaseRepository<IPerson> {

	constructor(unitOfWork: UnitOfWorkBase) {
		super(unitOfWork);
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

export interface IPerson extends mongoose.Document {
	_id: string;
	name: string,
	age: number,
	birthday: Date
}