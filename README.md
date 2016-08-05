# mongoose-adapter [![Build Status](https://travis-ci.org/BibbyChung/mongoose-adapter.svg?branch=master)](https://travis-ci.org/BibbyChung/mongoose-adapter) [![npm](https://img.shields.io/npm/v/mongoose-adapter.svg?maxAge=2592000)]()

Make the mongoose easy to use. 

## Install

Install the components

```shell
$ npm install mongoose-adapter mockgoose mongoose --save
```

If you're use TypeScirpt, please install the definitions.

```shell
$ typings install dt~mongoose dt~mongoose-promise --global --save
```

> **Note:** You have to install [typings](https://github.com/typings/typings) in your global environment.


## Quick Start

You can use TypeScirpt or JavaScript. Up to you.

### TypeScript

Implement the BaseRepository for your mongoose collections.

```javascript

import {BaseRepository, IUnitOfWork} from "mongoose-adapter";

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
```
Examples for CRUD

```javascript
// ==== create data =====

let unitOfWork = new UnitOfWork();
let rep = new PeopleRepository(unitOfWork);

var entity = rep.createNewEntity();
entity._id = "1qaz2wsx";
entity.name = "Bibby Chung";
entity.age = 18;
entity.birthday = new Date("1990-04-01 13:20:30");
peopleRep.add(entity);

await unitOfWork.saveChangeAsync();


//==== update data ====

let unitOfWork = new UnitOfWork();
let rep = new PeopleRepository(unitOfWork);
let data = await rep.getAll()
    .find({ _id: "1qaz2wsx" })
    .exec();

let entity = data[0];
entity.name = "Bibby Chung 1";
entity.age = 22;
entity.birthday = new Date("1995-08-08 13:20:30");
rep.update(entity);

await unitOfWork.saveChangeAsync();


//==== delete data ====
let unitOfWork = new UnitOfWork();
let rep = new PeopleRepository(unitOfWork);
let data = await rep.getAll()
    .find({ _id: "1qaz2wsx" })
    .exec();

for (let item of data) {
    rep.remove(item);
}

await unitOfWork.saveChangeAsync();


//==== get data ====
let unitOfWork = new UnitOfWork();
let rep = new PeopleRepository(unitOfWork);
let data = await rep.getAll()
    .find({ _id: "1qaz2wsx" })
    .exec();

```

### JavaScript 
(later..)

## Todo
