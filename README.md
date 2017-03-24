# mongoose-adapter [![Build Status](https://travis-ci.org/BibbyChung/mongoose-adapter.svg?branch=master)](https://travis-ci.org/BibbyChung/mongoose-adapter) [![npm](https://img.shields.io/npm/v/mongoose-adapter.svg?maxAge=2592000)]()

Make the mongoose easy to use. 

## Install

Install the components

```shell
$ npm install mongoose-adapter mockgoose mongoose --save
```

## Quick Start

You can use TypeScirpt or JavaScript. Up to you.

### TypeScript

Implement the BaseRepository for your mongoose collections.

```javascript

//myUnitOfWork.ts
import { UnitOfWorkBase } from "mongoose-adapter";
import { PersonRep } from "./personRep";

export class MyUnitOfWork extends UnitOfWorkBase {

    constructor() {
        super();
    }

    reps = {
        personRep: new PersonRep(this)
    };

}

//personRep.ts
import * as mongoose from "mongoose";
import { UnitOfWorkBase, RepositoryBase } from "mongoose-adapter";

export class PersonRep extends RepositoryBase<IPerson> {

	constructor(unitOfWork: UnitOfWorkBase) {
		super(unitOfWork);
	}

	getCollectionName() {
		return "Person";
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


```
Examples for CRUD

```javascript

// ==== create data =====
let myDb = new UnitOfWork();

var entity = myDb.reps.personRep.createNewEntity();
entity._id = "1qaz2wsx";
entity.name = "Bibby Chung";
entity.age = 18;
entity.birthday = new Date("1990-04-01 13:20:30");
myDb.add(entity);

await myDb.saveChangeAsync();


//==== update data ====
let myDb = new UnitOfWork();

let data = await myDb.reps.personRep.getAll()
    .find({ _id: "1qaz2wsx" })
    .exec();

let entity = data[0];
entity.name = "Bibby Chung 1";
entity.age = 22;
entity.birthday = new Date("1995-08-08 13:20:30");
myDb.update(entity);

await myDb.saveChangeAsync();


//==== delete data ====
let myDb = new UnitOfWork();

let data = await myDb.reps.personRep.getAll()
    .find({ _id: "1qaz2wsx" })
    .exec();

for (let item of data) {
    myDb.remove(item);
}

await myDb.saveChangeAsync();


//==== get data ====
let myDb = new UnitOfWork();

let data = await myDb.reps.personRep.getAll()
    .find({ _id: "1qaz2wsx" })
    .exec();

```

### JavaScript 
(later..)

## Todo
